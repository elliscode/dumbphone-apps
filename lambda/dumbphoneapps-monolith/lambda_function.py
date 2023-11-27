import json
import traceback
from dumbphoneapps.utils import (
    otp_route,
    login_route,
    path_equals,
    format_response,
    ios_cookie_refresh_route,
)
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

from dumbphoneapps.food_diary import (
    get_day_route,
    search_route,
    add_route,
    delete_route,
    get_serving_route,
    set_serving_route,
    create_serving_route,
    get_food_route,
    set_food_route,
)

from dumbphoneapps.one_offs import (
    twilio_route,
    share_location_route,
    get_location_route,
    get_maps_key_route,
)
from dumbphoneapps.weather import get_forecast_route


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
    if path_equals(event=event, method="POST", path="/food-diary/delete"):
        return delete_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/get_serving"):
        return get_serving_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/set_serving"):
        return set_serving_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/create_serving"):
        return create_serving_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/get_food"):
        return get_food_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/set_food"):
        return set_food_route(event)
    if path_equals(event=event, method="POST", path="/ios-cookie-refresh"):
        return ios_cookie_refresh_route(event)
    if path_equals(event=event, method="POST", path="/one-offs/twilio"):
        return twilio_route(event)
    if path_equals(event=event, method="POST", path="/one-offs/share-location"):
        return share_location_route(event)
    if path_equals(event=event, method="POST", path="/one-offs/get-location"):
        return get_location_route(event)
    if path_equals(event=event, method="POST", path="/one-offs/get-maps-key"):
        return get_maps_key_route(event)
    if path_equals(event=event, method="POST", path="/weather/get-forecast"):
        return get_forecast_route(event)

    return format_response(event=event, http_code=404, body="No matching route found")
