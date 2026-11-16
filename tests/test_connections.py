import datetime
import json
import os
import sys
import unittest
from unittest import mock

os.environ.setdefault("AWS_DEFAULT_REGION", "us-east-1")
os.environ.setdefault("DYNAMODB_TABLE_NAME", "test-table")
os.environ.setdefault("DOMAIN_NAMES", "https://dpa.test")
os.environ.setdefault("SMS_SQS_QUEUE_URL", "https://sqs.test/sms")
os.environ.setdefault("SMS_SCHEDULER_ROLE_ARN", "arn:aws:iam::123:role/scheduler")
os.environ.setdefault("ADMIN_PHONE", "+15550000000")

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "lambda", "dumbphoneapps-monolith"))

from dumbphoneapps import connections, utils  # noqa: E402
from dumbphoneapps.utils import dynamo_obj_to_python_obj  # noqa: E402

TODAY = datetime.date(2026, 11, 15)
USER = "2125550001"


class FakeDynamo:
    def __init__(self):
        self.items = {}

    @staticmethod
    def _key(key):
        return (key["key1"]["S"], key["key2"]["S"])

    def get_item(self, TableName, Key):
        item = self.items.get(self._key(Key))
        return {"Item": item} if item is not None else {}

    def put_item(self, TableName, Item):
        self.items[self._key(Item)] = Item

    def get(self, key1, key2):
        item = self.items.get((key1, key2))
        return dynamo_obj_to_python_obj(item) if item is not None else None

    def seed(self, key1, key2):
        self.items[(key1, key2)] = {"key1": {"S": key1}, "key2": {"S": key2}, "puzzle": {"M": {}}}


class FakeResponse:
    def __init__(self, data):
        self.data = data


class FakeHttp:
    """Records requested (type, date) pairs; dates in `missing` return an error"""

    def __init__(self):
        self.requests = []
        self.missing = set()
        self.explode = set()

    def request(self, method=None, url=None, body=None, headers=None, **kwargs):
        if "theathletic" in url:
            date_value = json.loads(body)["variables"]["date"]
            connections_type = "_sports"
        else:
            date_value = url.rsplit("/", 1)[-1].removesuffix(".json")
            connections_type = ""
        self.requests.append((connections_type, date_value))
        if connections_type in self.explode:
            raise RuntimeError("simulated upstream outage")
        if (connections_type, date_value) in self.missing:
            if connections_type == "_sports":
                return FakeResponse(json.dumps({"errors": [{"message": "not found"}]}).encode())
            return FakeResponse(b"<html>Not Found</html>")
        puzzle = {"id": f"{connections_type}{date_value}", "categories": []}
        if connections_type == "_sports":
            return FakeResponse(json.dumps({"data": {"getPuzzleByIdOrDate": puzzle}}).encode())
        return FakeResponse(json.dumps(puzzle).encode())


class ConnectionsTestCase(unittest.TestCase):
    def setUp(self):
        self.dynamo = FakeDynamo()
        self.http = FakeHttp()
        self.today = TODAY
        token = {"key2": "token", "csrf": "csrf", "user": USER, "expiration": 2**40}
        patches = [
            mock.patch.object(connections, "dynamo", self.dynamo),
            mock.patch.object(connections, "http", self.http),
            mock.patch.object(connections, "utc_today", lambda: self.today),
            mock.patch.object(connections, "connections_data", {}),
            mock.patch.object(utils, "get_token", lambda t: token if t == "token" else None),
            mock.patch.object(utils, "get_active_tokens", lambda user: {"tokens": {"token": 2**40}}),
            mock.patch.object(utils, "get_user_data", lambda user: {"key1": "user", "key2": user}),
        ]
        for p in patches:
            p.start()
            self.addCleanup(p.stop)

    def cursor(self, connections_type):
        item = self.dynamo.get(f"connections_backfill_cursor{connections_type}", "cursor")
        return item["cursor"] if item else None

    def backfill(self, **payload):
        return connections.run_connections_backfill(payload)

    def test_first_run_fetches_earliest_date_for_each_type(self):
        result = self.backfill()
        self.assertEqual(self.http.requests, [("", "2023-06-12"), ("_sports", "2024-09-18")])
        self.assertEqual(result[""], {"status": "fetched", "date": "2023-06-12", "cursor": "2023-06-13"})
        self.assertEqual(result["_sports"]["date"], "2024-09-18")
        self.assertEqual(self.cursor(""), "2023-06-13")
        self.assertEqual(self.cursor("_sports"), "2024-09-19")
        self.assertIsNotNone(self.dynamo.get("connections", "2023-06-12"))
        # Sports response is unwrapped from the graphql envelope before storing
        self.assertEqual(self.dynamo.get("connections_sports", "2024-09-18")["puzzle"]["id"], "_sports2024-09-18")

    def test_each_run_makes_one_request_per_type(self):
        for _ in range(3):
            self.backfill()
        self.assertEqual(len(self.http.requests), 6)
        self.assertEqual(self.cursor(""), "2023-06-15")
        self.assertEqual(self.cursor("_sports"), "2024-09-21")

    def test_skips_dates_already_in_dynamo_without_requests(self):
        for day in ("2023-06-12", "2023-06-13", "2023-06-14"):
            self.dynamo.seed("connections", day)
        self.backfill(types=[""])
        self.assertEqual(self.http.requests, [("", "2023-06-15")])
        self.assertEqual(self.cursor(""), "2023-06-16")

    def test_caught_up_then_fetches_new_day(self):
        self.today = datetime.date(2023, 6, 13)
        self.backfill(types=[""])
        self.backfill(types=[""])
        result = self.backfill(types=[""])
        self.assertEqual(result[""], {"status": "caught_up", "cursor": "2023-06-14"})
        self.assertEqual(len(self.http.requests), 2)

        self.today = datetime.date(2023, 6, 14)
        result = self.backfill(types=[""])
        self.assertEqual(result[""]["status"], "fetched")
        self.assertEqual(self.http.requests[-1], ("", "2023-06-14"))

    def test_failure_for_today_keeps_cursor(self):
        self.today = datetime.date(2023, 6, 12)
        self.http.missing.add(("", "2023-06-12"))
        result = self.backfill(types=[""])
        self.assertEqual(result[""]["status"], "not_ready")
        self.assertIsNone(self.cursor(""))
        self.http.missing.clear()
        result = self.backfill(types=[""])
        self.assertEqual(result[""]["status"], "fetched")
        self.assertEqual(self.cursor(""), "2023-06-13")

    def test_failure_for_past_date_advances_cursor(self):
        self.http.missing.add(("_sports", "2024-09-18"))
        result = self.backfill(types=["_sports"])
        self.assertEqual(result["_sports"]["status"], "skipped")
        self.assertEqual(result["_sports"]["code"], 404)
        self.assertEqual(self.cursor("_sports"), "2024-09-19")
        self.assertIsNone(self.dynamo.get("connections_sports", "2024-09-18"))

    def test_error_in_one_type_does_not_stop_the_other(self):
        self.http.explode.add("")
        result = self.backfill()
        self.assertEqual(result[""], {"status": "error"})
        self.assertEqual(result["_sports"]["status"], "fetched")
        self.assertIsNone(self.cursor(""))

    def test_invalid_type(self):
        result = self.backfill(types=["_bogus"])
        self.assertEqual(result, {"_bogus": {"status": "invalid_type"}})
        self.assertEqual(self.http.requests, [])

    def call_get(self, route, date_value):
        event = {
            "headers": {"cookie": "dumbphoneapps-auth-token=token", "origin": "https://dpa.test"},
            "body": json.dumps({"csrf": "csrf", "date": date_value}),
        }
        response = route(event)
        return response["statusCode"], json.loads(response["body"])

    def test_get_connections_route_still_fetches_and_caches(self):
        code, body = self.call_get(connections.get_connections_route, "2024-01-01")
        self.assertEqual(code, 200)
        self.assertEqual(body["id"], "2024-01-01")
        code, body = self.call_get(connections.get_connections_route, "2024-01-01")
        self.assertEqual(code, 200)
        self.assertEqual(len(self.http.requests), 1)

    def test_get_connections_route_errors(self):
        code, _ = self.call_get(connections.get_connections_sports_route, "2024-09-17")
        self.assertEqual(code, 400)
        self.http.missing.add(("", "2024-01-02"))
        code, _ = self.call_get(connections.get_connections_route, "2024-01-02")
        self.assertEqual(code, 400)
        self.http.missing.add(("_sports", "2024-10-01"))
        code, body = self.call_get(connections.get_connections_sports_route, "2024-10-01")
        self.assertEqual((code, body), (404, {"message": "Puzzle not found"}))


if __name__ == "__main__":
    unittest.main()
