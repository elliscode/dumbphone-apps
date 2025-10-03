const SECONDS_BETWEEN = 5;
const json = document.getElementById("json");
const wakeLockText = document.getElementById("wakelock");
const locationText = document.getElementById('location-text');
const button = document.getElementById("share-button");
const linkDiv = document.getElementById("link-div");
const smsLink = document.getElementById("sms-link");
const smsDirectionsLink = document.getElementById("sms-directions-link");
let shareInterval = undefined;
let watchPositionHandle = undefined;
let wakeLockSentinel = undefined;
function getCurrentLocation() {
  json.style.display = "block";
  button.style.display = "none";
  if (navigator.geolocation) {
    json.innerText = "Retrieving current location from device...";
    watchPositionHandle = navigator.geolocation.watchPosition(fetchLocation, displayError, {timeout: 120 * 1000});
    shareInterval = setInterval(sendLocation, 5000);
  } else {
    json.innerText = "Geolocation is not supported by this browser.";
  }
}
async function requestWakeLock() {  
  if (navigator.userAgent.includes('KAIOS/')) {
    return;
  }
  try {
    if (wakeLockSentinel && !wakeLockSentinel.released) {
      wakeLockSentinel.release();
    }
    wakeLockSentinel = await navigator.wakeLock.request("screen");
    wakeLockText.innerText = '';
  } catch (err) {
    console.log(`${err.name}, ${err.message}`);
    wakeLockText.innerText = 'Wake Lock not active, please touch anywhere in the whitespace to enable';
  }
}
let locationToken = localStorage.getItem("locationToken");
let lat = undefined;
let long = undefined;
function fetchLocation(pos) {
  lat = pos.coords.latitude;
  long = pos.coords.longitude;
  locationText.innerText = `${lat}, ${long}`;
}
function sendLocation() {
  if (!lat && !long) {
    json.innerText =
      "Waiting until location information is fetched...";
      return;
  }

  if (navigator.wakeLock && (!wakeLockSentinel || wakeLockSentinel.released)) {
    requestWakeLock();
  }

  json.innerText =
    "Sending location...";

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
function displayError(event) {
  clearInterval(shareInterval);
  navigator.geolocation.clearWatch(watchPositionHandle);
  if (wakeLockSentinel) {
    wakeLockSentinel.release();
  }
  json.innerText = "Geolocation failed, ensure you have geolocation enabled, then refresh the page and try again.";
}
function handleShare(event) {
  let result = defaultHandler(event);
  let responseJson = result.responseJson;
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

  for (let i = 0; i < SECONDS_BETWEEN; i++) {
    setTimeout(()=>{
      json.innerText = `Waiting ${SECONDS_BETWEEN - i} seconds...`;
      if (!!navigator.wakeLock && !!wakeLockSentinel && wakeLockSentinel.released) {
        wakeLockText.innerText = 'Wake Lock not active, please touch anywhere in the whitespace to enable';
      } else {
        wakeLockText.innerText = '';
      }
    }, i * 1000);
  }
}
document.addEventListener('click', requestWakeLock);