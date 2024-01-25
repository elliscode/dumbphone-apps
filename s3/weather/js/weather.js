if (!csrfToken) {
  window.location.replace("../signup.html");
}
if (
  !navigator.userAgent.includes("Chrome") &&
  navigator.userAgent.includes("Safari")
) {
  iosCookieRefresh();
}
const button = document.getElementById("get-weather");
const json = document.getElementById("json");
const locationText = document.getElementById("location-text");
const timeText = document.getElementById("time-text");
const weatherText = document.getElementById("weather-text");
const currentTempText = document.getElementById("current-temp-text");
const currentHighText = document.getElementById("current-high-text");
const currentLowText = document.getElementById("current-low-text");
const currentImage = document.getElementById("current-image");
let weatherData = undefined;
function getCurrentLocation() {
  json.style.display = "block";
  button.style.display = "none";
  if (weatherData) {
    displayWeather();
    return;
  }
  if (navigator.geolocation) {
    json.innerHTML = "Retrieving current location from device...";
    navigator.geolocation.getCurrentPosition(getWeatherForPosition);
  } else {
    json.innerHTML = "Geolocation is not supported by this browser.";
  }
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
  let payload = {
    csrf: csrfToken,
    lat: lat,
    lon: long
  };
  xmlHttp.send(JSON.stringify(payload));
}
function handleWeatherGet(event) {
  if (weatherData) {
    displayWeather();
    return;
  }
  let responseJson = defaultHandler(event);
  console.log(responseJson);
  weatherData = responseJson;
  displayWeather();
}
function displayWeather() {
  json.style.display = "none";
  json.innerText = "";

  locationText.innerText = "";
  timeText.innerText = "";
  weatherText.innerText = "";
  currentTempText.innerText = Math.round(weatherData.hourly.data[0].coordinates[0].dates[0].value);
  currentHighText.innerText = Math.round(
    weatherData.daily.data[1].coordinates[0].dates[0].value
  );
  currentLowText.innerText = Math.round(
    weatherData.daily.data[0].coordinates[0].dates[0].value
  );
  currentImage.src = "img/" + weatherData.hourly.data[1].coordinates[0].dates[0].value + ".png";

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

    div.style.display = "flex";
    div.getElementsByClassName("time")[0].innerText = thisDisplayHour + ' ' + thisAmOrPm;
    div.getElementsByTagName("img")[0].src = "img/" + weatherData.hourly.data[1].coordinates[0].dates[i].value + ".png";
    div.getElementsByClassName("temp")[0].innerText = Math.round(weatherData.hourly.data[0].coordinates[0].dates[i].value);
  }
}
