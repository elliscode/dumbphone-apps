from .utils import format_response, authenticate


@authenticate
def get_day_route(event, user_data, body):
    return format_response(
        event=event,
        http_code=200,
        body="Not implemented",
    )
