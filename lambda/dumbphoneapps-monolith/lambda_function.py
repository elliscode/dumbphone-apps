import json
import traceback
from dumbphoneapps.utils import otp_route, login_route, path_equals, format_response
from dumbphoneapps.grocery_list import (
    getlist_route,
    additem_route,
    deleteitem_route,
    deletelist_route,
    setcrossedoff_route,
    setlistorder_route,
    sendsharelist_route,
    acceptsharelist_route,
)

from dumbphoneapps.food_diary import get_day_route, search_route, add_route


def lambda_handler(event, context):
    try:
        print(json.dumps(event))
        result = route(event)
        print(result)
        return result
    except Exception:
        traceback.print_exc()
        return format_response(event=event, http_code=500, body="Internal server error")


# Only using POST because I want to prevent CORS preflight checks, and setting a
# custom header counts as "not a simple request" or whatever, so I need to pass
# in the CSRF token (don't want to pass as a query parameter), so that really
# only leaves POST as an option, as GET has its body removed by AWS somehow
#
# see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests
def route(event):
    if path_equals(event=event, method="POST", path="/otp"):
        return otp_route(event)
    if path_equals(event=event, method="POST", path="/login"):
        return login_route(event)
    if path_equals(event=event, method="POST", path="/getlist"):
        return getlist_route(event)
    if path_equals(event=event, method="POST", path="/additem"):
        return additem_route(event)
    if path_equals(event=event, method="POST", path="/deleteitem"):
        return deleteitem_route(event)
    if path_equals(event=event, method="POST", path="/deletelist"):
        return deletelist_route(event)
    if path_equals(event=event, method="POST", path="/setcrossedoff"):
        return setcrossedoff_route(event)
    if path_equals(event=event, method="POST", path="/setlistorder"):
        return setlistorder_route(event)
    if path_equals(event=event, method="POST", path="/sendsharelist"):
        return sendsharelist_route(event)
    if path_equals(event=event, method="POST", path="/acceptsharelist"):
        return acceptsharelist_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/get-day"):
        return get_day_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/search"):
        return search_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/add"):
        return add_route(event)
    return format_response(event=event, http_code=404, body="No matching route found")
