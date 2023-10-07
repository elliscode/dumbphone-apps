const json = document.getElementById('json');
const button = document.getElementById('share-button');
const linkDiv = document.getElementById('link-div');
const link = document.getElementById('link');
function getCurrentLocation() {
    locationTimeout = undefined;
    json.style.display='block';
    button.style.display = 'none';
    if (navigator.geolocation) {
        json.innerHTML = "Retrieving current location from device...";
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        json.innerHTML = "Geolocation is not supported by this browser.";
    }
}

let locationToken = localStorage.getItem('locationToken');
let locationTimeout = undefined;

function showPosition(position) {
    if (locationTimeout) {
        return;
    }

    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    json.innerHTML = "Sending current location latitude=" + lat + " and longitude=" + long + " ...";

    let url = API_DOMAIN + '/one-offs/share-location';
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleShare;
    let payload = {
        'csrf': csrfToken,
        'lat': lat,
        'lon': long,
    }
    if (locationToken) {
        payload.locationToken = locationToken
    }
    xmlHttp.send(JSON.stringify(payload));

}

function handleShare(event) {
    if (locationTimeout) {
        return;
    }

    let xmlHttp = event.target;
    let responseJson = JSON.parse(xmlHttp.responseText)
    locationToken = responseJson.locationToken;

    localStorage.setItem('locationToken', locationToken);

    linkDiv.style.display = 'block';
    link.innerText = UI_DOMAIN.substring(8) + '/lv/?id=' + locationToken;

    locationTimeout = setTimeout(getCurrentLocation, 5000);
}
