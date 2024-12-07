checkIfLoggedIn();
if (
  !navigator.userAgent.includes("Chrome") &&
  navigator.userAgent.includes("Safari")
) {
  iosCookieRefresh();
}
const bigButtons = Array.from(document.getElementsByClassName('giant-button-half'));
const json = document.getElementById("json");
const locationText = document.getElementById("location-text");
const timeText = document.getElementById("time-text");
const cityText = document.getElementById("city");
const weatherText = document.getElementById("weather-text");
const currentTempText = document.getElementById("current-temp-text");
const currentHighText = document.getElementById("current-high-text");
const currentLowText = document.getElementById("current-low-text");
const currentImage = document.getElementById("current-image");
let weatherData = undefined;
let city = undefined;
function getCurrentLocation() {
  city = undefined;
  json.style.display = "block";
  for (let button of bigButtons) {
    button.style.display = "none";
  }
  if (weatherData) {
    displayWeather();
    return;
  }
  if (navigator.geolocation) {
    json.innerHTML = "Retrieving current location from device...";
    navigator.geolocation.getCurrentPosition(getWeatherForPosition, displayGeolocationError, {timeout: 30 * 1000});
  } else {
    json.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function getIpAddressLocation() {
  city = undefined;
  json.style.display = "block";
  for (let button of bigButtons) {
    button.style.display = "none";
  }
  if (weatherData) {
    displayWeather();
    return;
  }
  try {
    json.innerHTML = "Retrieving ipgeolocation API key...";
    let url = API_DOMAIN + "/one-offs/get-ip-geo-api-key";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleIpAddressApiToken;
    xmlHttp.send(JSON.stringify({ csrf: csrfToken }));
  } catch (e) {
    json.innerHTML = "Failed to get location from IP Adress";
  }
}
function handleIpAddressApiToken(event) {
  let result = defaultHandler(event);
  try {
    json.innerHTML = "Deriving current location IP Address...";
    let xmlHttp = new XMLHttpRequest();
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${result.responseJson.api_key}`;
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.withCredentials = false;
    xmlHttp.onload = handleIpGeolocationResult;
    xmlHttp.send();
  } catch (e) {
    json.innerHTML = "Failed to get location from IP Adress";
  }
}
function handleIpGeolocationResult(event) {
  let result = defaultHandler(event);
  if (result.responseJson.city) {
    city = result.responseJson.city;
  }
  getWeatherForPosition({coords: {latitude: result.responseJson.latitude, longitude: result.responseJson.longitude}});
}
function displayGeolocationError(event) {
  json.innerHTML = "Geolocation failed, please refresh the page and try again.";
}
function getWeatherForPosition(position) {
  if (weatherData) {
    displayWeather();
    return;
  }
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  json.innerHTML =
    "Sending current location latitude=" +
    lat +
    " and longitude=" +
    long +
    " to weather api...";

  let url = API_DOMAIN + "/weather/get-forecast";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleWeatherGet;
  let currentMidnight = new Date();
  currentMidnight.setHours(23);
  currentMidnight.setMinutes(59);
  currentMidnight.setSeconds(59);
  let eightDaysFromNowMidnight = new Date((new Date()).getTime() + (8 * 24 * 60 * 60 * 1000));
  eightDaysFromNowMidnight.setHours(23);
  eightDaysFromNowMidnight.setMinutes(59);
  eightDaysFromNowMidnight.setSeconds(59);
  let payload = {
    csrf: csrfToken,
    lat: lat,
    lon: long,
    today: currentMidnight.toISOString().substring(0,10),
    eightDaysFromNow: eightDaysFromNowMidnight.toISOString().substring(0,10),
    midnight: currentMidnight.toISOString().substring(11,19)
  };
  xmlHttp.send(JSON.stringify(payload));
}
function handleWeatherGet(event) {
  if (weatherData) {
    displayWeather();
    return;
  }
  let responseJson = defaultHandlerV1(event);
  weatherData = responseJson;
  displayWeather();
}
// data from here https://www.meteomatics.com/en/api/available-parameters/weather-parameter/general-weather-state/
const weatherSymbolsNameMap = {
  0: 'Unknown',
  1: 'Clear sky',
  2: 'Light clouds',
  3: 'Partly cloudy',
  4: 'Cloudy',
  5: 'Rain',
  6: 'Rain and snow / sleet',
  7: 'Snow',
  8: 'Rain shower',
  9: 'Snow shower',
  10: 'Sleet shower',
  11: 'Light Fog',
  12: 'Dense fog',
  13: 'Freezing rain',
  14: 'Thunderstorms',
  15: 'Drizzle',
  16: 'Sandstorm',
};
let dayText = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
function displayWeather() {
  json.style.display = "none";
  json.innerText = "";

  let coordsString = `${weatherData.daily.data[0].coordinates[0].lat},${weatherData.daily.data[0].coordinates[0].lon}`;

  while (locationText.firstChild) {
    locationText.firstChild.remove();
  }
  let directionsLink = document.createElement('a');
  directionsLink.href="https://www.google.com/maps/search/?api=1&query=" + coordsString;
  if (city) {
    directionsLink.innerText = city;
  } else {
    directionsLink.innerText = coordsString;
  }
  locationText.appendChild(directionsLink);

  timeText.innerText = new Date(weatherData.daily.dateGenerated).toDateString();
  let nameIndex = weatherData.daily.data[2].coordinates[0].dates[0].value % 100;
  weatherText.innerText = weatherSymbolsNameMap[nameIndex];
  currentTempText.innerText = Math.round(weatherData.hourly.data[0].coordinates[0].dates[0].value);
  currentHighText.innerText = Math.round(
    weatherData.daily.data[1].coordinates[0].dates[0].value
  );
  currentLowText.innerText = Math.round(
    weatherData.daily.data[0].coordinates[0].dates[0].value
  );
  currentImage.src = "img/" + weatherData.daily.data[2].coordinates[0].dates[0].value + ".png";

  let hour = (new Date()).getHours();
  let hourlyDivs = document.getElementsByClassName("hour");
  for (let i = 0; i < 24; i++) {
    let thisHour = (hour + i) % 24;
    let thisAmOrPm = thisHour >= 12 ? 'pm' : 'am';
    let thisDisplayHour = thisHour % 12;
    if (thisDisplayHour == 0) {
      thisDisplayHour = 12;
    }
    let div = hourlyDivs[i];

    div.getElementsByClassName("time")[0].innerText = thisDisplayHour + ' ' + thisAmOrPm;
    div.getElementsByTagName("img")[0].src = "img/" + weatherData.hourly.data[1].coordinates[0].dates[i].value + ".png";
    div.getElementsByClassName("temp")[0].innerText = Math.round(weatherData.hourly.data[0].coordinates[0].dates[i].value);
  }

  let dayDivs = document.getElementsByClassName("day");
  for (let i = 1; i < 8; i++) {
    let div = dayDivs[i-1];

    div.getElementsByClassName("time")[0].innerText = dayText[(new Date(weatherData.daily.data[2].coordinates[0].dates[i].date)).getDay()];
    div.getElementsByTagName("img")[0].src = "img/" + weatherData.daily.data[2].coordinates[0].dates[i].value + ".png";
    div.getElementsByClassName("temp")[0].innerText = Math.round(weatherData.daily.data[0].coordinates[0].dates[i].value) + '-' + Math.round(weatherData.daily.data[1].coordinates[0].dates[i].value);
  }
}
