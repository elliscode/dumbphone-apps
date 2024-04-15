import json
import traceback
from dumbphoneapps.utils import (
    otp_route,
    login_route,
    path_equals,
    format_response,
    ios_cookie_refresh_route,
    path_starts_with,
    clear_all_tokens_route,
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
    cleanuplist_route,
)
from dumbphoneapps.discord import (
    discord_route,
    set_discord_token_route,
    get_dm_channels,
)
from dumbphoneapps.food_diary import (
    get_day_route,
    search_route,
    add_route,
    create_food_route,
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
    generate_presigned_post,
    generate_presigned_get,
    acknowledge_presigned_post_success_route,
    gather_uploaded_items_route,
)
from dumbphoneapps.notes import (
    get_notes_route,
    set_note_route,
)
from dumbphoneapps.weather import get_forecast_route

from dumbphoneapps.quiz_diary import (
    get_questions_route,
    set_questions_route,
    set_answers_route,
    get_answers_route,
    get_report_data_route,
)


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
    if path_equals(event=event, method="POST", path="/logout-all"):
        return clear_all_tokens_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/get-list"):
        return getlist_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/add-item"):
        return additem_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/delete-item"):
        return deleteitem_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/delete-list"):
        return deletelist_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/set-crossed-off"):
        return setcrossedoff_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/set-list-order"):
        return setlistorder_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/send-share-list"):
        return sendsharelist_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/accept-share-list"):
        return acceptsharelist_route(event)
    if path_equals(event=event, method="POST", path="/grocery-list/clean-up-list"):
        return cleanuplist_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/get-day"):
        return get_day_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/search"):
        return search_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/add"):
        return add_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/create-food"):
        return create_food_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/delete"):
        return delete_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/get-serving"):
        return get_serving_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/set-serving"):
        return set_serving_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/create-serving"):
        return create_serving_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/get-food"):
        return get_food_route(event)
    if path_equals(event=event, method="POST", path="/food-diary/set-food"):
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
    if path_equals(
        event=event, method="POST", path="/one-offs/generate-presigned-post"
    ):
        return generate_presigned_post(event)
    if path_equals(event=event, method="POST", path="/one-offs/generate-presigned-get"):
        return generate_presigned_get(event)
    if path_equals(
        event=event, method="POST", path="/one-offs/acknowledge-presigned-post-success"
    ):
        return acknowledge_presigned_post_success_route(event)
    if path_equals(event=event, method="POST", path="/one-offs/get-uploaded-items"):
        return gather_uploaded_items_route(event)
    if path_equals(event=event, method="POST", path="/set-discord-token"):
        return set_discord_token_route(event)
    if path_equals(event=event, method="POST", path="/get-discord-dm-channels"):
        return get_dm_channels(event)
    if path_equals(event=event, method="POST", path="/quiz-diary/get-questions"):
        return get_questions_route(event)
    if path_equals(event=event, method="POST", path="/quiz-diary/set-questions"):
        return set_questions_route(event)
    if path_equals(event=event, method="POST", path="/quiz-diary/get-answers"):
        return get_answers_route(event)
    if path_equals(event=event, method="POST", path="/quiz-diary/set-answers"):
        return set_answers_route(event)
    if path_equals(event=event, method="POST", path="/quiz-diary/get-report-data"):
        return get_report_data_route(event)
    if path_equals(event=event, method="POST", path="/notes/get"):
        return get_notes_route(event)
    if path_equals(event=event, method="POST", path="/notes/set"):
        return set_note_route(event)
    if path_starts_with(event=event, method="POST", path="/discord/"):
        return discord_route(event)

    return format_response(event=event, http_code=404, body="No matching route found")
