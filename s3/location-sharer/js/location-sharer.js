const json = document.getElementById("json");
const button = document.getElementById("share-button");
const linkDiv = document.getElementById("link-div");
const smsLink = document.getElementById("sms-link");
const smsDirectionsLink = document.getElementById("sms-directions-link");
function getCurrentLocation() {
  locationTimeout = undefined;
  json.style.display = "block";
  button.style.display = "none";
  if (navigator.geolocation) {
    json.innerHTML = "Retrieving current location from device...";
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    json.innerHTML = "Geolocation is not supported by this browser.";
  }
}
let locationToken = localStorage.getItem("locationToken");
let locationTimeout = undefined;
let lat = 0;
let long = 0;
function showPosition(position) {
  if (locationTimeout) {
    return;
  }

  lat = position.coords.latitude;
  long = position.coords.longitude;
  json.innerHTML =
    "Sending current location latitude=" +
    lat +
    " and longitude=" +
    long +
    " ...";

  let url = API_DOMAIN + "/one-offs/share-location";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleShare;
  let payload = {
    csrf: csrfToken,
    lat: lat,
    lon: long
  };
  if (locationToken) {
    payload.locationToken = locationToken;
  }
  xmlHttp.send(JSON.stringify(payload));
}
function handleShare(event) {
  if (locationTimeout) {
    return;
  }

  let responseJson = defaultHandlerV1(event);
  locationToken = responseJson.locationToken;

  localStorage.setItem("locationToken", locationToken);

  linkDiv.style.display = "block";

  smsLink.style.display = "block";
  smsLink.href =
    "sms://?&body=" +
    encodeURIComponent(
      "I'm sharing my location: " +
        UI_DOMAIN.substring(8) +
        "/lv/?id=" +
        locationToken
    );
  smsDirectionsLink.style.display = 'block';

  let coordsString = `${lat},${long}`;
  let googleUrl = "https://www.google.com/maps/search/?api=1&query=" + coordsString;
  smsDirectionsLink.href = "sms://?&body=" + encodeURIComponent(googleUrl);

  locationTimeout = setTimeout(getCurrentLocation, 5000);
}
