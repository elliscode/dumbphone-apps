if (!csrfToken) {
    window.location.replace("../signup.html");
}
if (!navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Safari')) {
    iosCookieRefresh();
}
const button = document.getElementById('get-weather');
const json = document.getElementById('json');
const locationText = document.getElementById('location-text');
const timeText = document.getElementById('time-text');
const weatherText = document.getElementById('weather-text');
const currentTempText = document.getElementById('current-temp-text');
const currentHighText = document.getElementById('current-high-text');
const currentLowText = document.getElementById('current-low-text');
const currentImage = document.getElementById('current-image');
let weatherData = undefined;
function getCurrentLocation() {
    json.style.display = 'block';
    button.style.display = 'none';
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
    json.innerHTML = "Sending current location latitude=" + lat + " and longitude=" + long + " to weather api...";

    let url = API_DOMAIN + '/weather/get-forecast';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleWeatherGet;
    let payload = {
        'csrf': csrfToken,
        'lat': lat,
        'lon': long,
    }
    xmlHttp.send(JSON.stringify(payload));
}
function handleWeatherGet(event) {
    if (weatherData) {
        displayWeather();
        return;
    }
    let xmlHttp = event.target;
    let responseJson = JSON.parse(xmlHttp.responseText);
    console.log(responseJson);
    weatherData = responseJson;
    displayWeather();
}
function displayWeather() {
    json.style.display = 'none';
    json.innerText = '';

    let last_updated_time = weatherData.current.last_updated.substring(weatherData.current.last_updated.length - 5);

    locationText.innerText = weatherData.location.name;
    timeText.innerText = weatherData.current.last_updated;
    weatherText.innerText = weatherData.current.condition.text;
    currentTempText.innerText = Math.round(weatherData.current.temp_f);
    currentHighText.innerText = Math.round(weatherData.forecast.forecastday[0].day.maxtemp_f);
    currentLowText.innerText = Math.round(weatherData.forecast.forecastday[0].day.mintemp_f);
    currentImage.src = 'https:' + weatherData.current.condition.icon;

    let hourly = weatherData.forecast.forecastday[0].hour;
    let hourlyDivs = document.getElementsByClassName('hour');
    for (let i = 0; i < hourly.length; i++) {
        let hour = hourly[i];
        let div = hourlyDivs[i];
        let time = hour.time.substring(hour.time.length - 5);

        if (parseInt(time.substring(0,2)) <= parseInt(last_updated_time.substring(0,2))) {
            div.style.display = 'none';
            continue;
        }

        div.style.display = 'flex';
        div.getElementsByClassName('time')[0].innerText = time;
        div.getElementsByTagName('img')[0].src = 'https:' + hour.condition.icon;
        div.getElementsByClassName('temp')[0].innerText = Math.round(hour.temp_f);
    }
}