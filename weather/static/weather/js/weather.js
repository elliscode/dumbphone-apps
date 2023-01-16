
let json = document.getElementById("json");
function getCurrentLocation() {
  json.style.display = 'block';
  if (navigator.geolocation) {
    json.innerHTML = "Retrieving current location from device...";
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    json.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getCherryHill() {
    json.style.display = 'block';
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

function writeResult(event) {
    json.style.display = 'none';
    let xmlHttp = event.target;
    let result = JSON.parse(xmlHttp.responseText);
    json.innerText = JSON.stringify(result, null, 2);

    let forecastDiv = document.getElementById('forecast');
    while(forecastDiv.firstElementChild) {
        forecastDiv.firstElementChild.remove();
    }

    // loop over forecast data
    let firstDay = true;
    for(let idx = 0; idx < result.forecast.forecastday.length; idx++) {
        let forecastDay = result.forecast.forecastday[idx];

        let dayText = document.createElement('p');
        forecastDiv.appendChild(dayText);
        dayText.classList.add('title');
        dayText.innerText = forecastDay.date;


        let div = document.createElement('div');
        forecastDiv.appendChild(div);
        div.classList.add('icon-and-temp');

        let img = document.createElement('img');
        div.appendChild(img);
        img.classList.add('icon');
        let url = extractUrl(forecastDay.day.condition.icon);
        img.src = '/static/weather/img/' + url;

        let tempDiv = document.createElement('div');
        div.appendChild(tempDiv);

        let tempHigh = document.createElement('p');
        tempDiv.appendChild(tempHigh);
        tempHigh.classList.add('temp');
        tempHigh.classList.add('high');
        tempHigh.innerHTML = forecastDay.day.maxtemp_f + '&#8457;';

        let tempLow = document.createElement('p');
        tempDiv.appendChild(tempLow);
        tempLow.classList.add('temp');
        tempLow.classList.add('low');
        tempLow.innerHTML = forecastDay.day.mintemp_f + '&#8457;';

        if(firstDay) {
            let temp = document.createElement('p');
            div.appendChild(temp);
            temp.classList.add('temp');
            temp.classList.add('current');
            temp.innerHTML = result.current.temp_f + '&#8457;';
            firstDay = false;
        }

        let feelsLike = document.createElement('p');
        feelsLike.innerHTML = 'Feels like ' + forecastDay.day.avgtemp_f + '&#8457;';
    }
}

function extractUrl(input) {
    let idx = input.indexOf('64x64');
    return input.substring(idx + 6);
}
