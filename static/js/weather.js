
let json = document.getElementById("json");
function getCurrentLocation() {
  if (navigator.geolocation) {
    json.innerHTML = "Retrieving current location from device...";
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    json.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getCherryHill() {
    let lat = '39.8688';
    let long = '-75.006';
    let url = '/weather/get_weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.onload = writeResult;
    json.innerHTML = "Retrieving weather for latitude " + lat + " / longitude " + long + " ...";
    xmlHttp.send(null);
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let url = '/weather/get_weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // false for synchronous request
    xmlHttp.onload = writeResult;
    json.innerHTML = "Retrieving weather for latitude " + lat + " / longitude " + long + " ...";
    xmlHttp.send(null);
}

let temp = document.getElementById('temp');
let icon = document.getElementById('icon');
let feelsLike = document.getElementById('feels-like');
let description = document.getElementById('description');
function writeResult(event) {
    let xmlHttp = event.target;
    let result = JSON.parse(xmlHttp.responseText);
    json.innerText = JSON.stringify(result, null, 2);
    temp.innerHTML = Math.round(convertToFahrenheit(result.main.temp)) + '&#8457;';
    icon.src = '/static/img/' + result.weather[0].icon + '.png';
    feelsLike.innerHTML = 'Feels like ' + Math.round(convertToFahrenheit(result.main.feels_like)) + '&#8457;';
    description.innerHTML = result.weather[0].description.substring(0,1).toUpperCase() + result.weather[0].description.substring(1);

}

function convertToFahrenheit(kelvin) {
    return ((9.0*(kelvin-273.15))/5)+32
}
