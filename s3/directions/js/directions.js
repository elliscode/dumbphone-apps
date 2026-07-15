const originInput = document.getElementById("origin-input");
const destinationInput = document.getElementById("destination-input");
const errorDiv = document.getElementById("error");
const mapDiv = document.getElementById("map");
const routesDiv = document.getElementById("routes");
const stepsDiv = document.getElementById("steps");
const historyDiv = document.getElementById("history");

const CURRENT_LOCATION_LABEL = "Current Location";
const HISTORY_KEY = "dumbphoneapps-directions-history";
const HISTORY_LIMIT = 5;

let apiKey = undefined;
let map = undefined;
let directionsService = undefined;
let directionsRenderer = undefined;
let originLatLng = undefined;
let currentRoutes = [];
let baseDirectionsResult = undefined;
let lastOrigin = undefined;
let lastDestination = undefined;
let lastOriginDisplay = undefined;

function showError(message) {
  errorDiv.innerText = message;
  errorDiv.style.display = "block";
}

function clearError() {
  errorDiv.innerText = "";
  errorDiv.style.display = "none";
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveToHistory(origin, destination) {
  let history = loadHistory();
  history = history.filter((entry) => !(entry.origin === origin && entry.destination === destination));
  history.unshift({ origin: origin, destination: destination });
  history = history.slice(0, HISTORY_LIMIT);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  historyDiv.innerHTML = "";
  history.forEach((entry) => {
    const button = document.createElement("button");
    button.className = "history-entry";
    button.type = "button";
    button.innerText = entry.origin + " to " + entry.destination;
    button.onclick = () => applyHistoryEntry(entry);
    historyDiv.appendChild(button);
  });
}

function applyHistoryEntry(entry) {
  clearError();
  originLatLng = undefined;
  originInput.value = entry.origin;
  destinationInput.value = entry.destination;
  getDirections();
}

function prefillFromHistory() {
  const history = loadHistory();
  if (history.length === 0) {
    return;
  }
  originInput.value = history[0].origin;
  destinationInput.value = history[0].destination;
}

function getMapsApiKey() {
  let url = API_DOMAIN + "/one-offs/get-authenticated-maps-key";
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true);
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handleMapsKey;
  xmlHttp.send(JSON.stringify({ csrf: csrfToken }));
}

function handleMapsKey(event) {
  const result = defaultHandler(event);
  if (!result || result.statusCode != 200) {
    showError("Could not load Google Maps, please try logging in again");
    hideLoader();
    return;
  }
  apiKey = result.responseJson.key;
  let scriptTag = document.createElement("script");
  scriptTag.src = "js/maps-init.js";
  document.body.appendChild(scriptTag);
}

function onMapReady(mapInstance) {
  map = mapInstance;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map });
  hideLoader();
}

function useCurrentLocationAsOrigin(event, autoContinue) {
  if (!navigator.geolocation) {
    showError("Your browser does not support geolocation");
    return;
  }
  showLoader();
  navigator.geolocation.getCurrentPosition(
    (position) => {
      originLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      originInput.value = CURRENT_LOCATION_LABEL;
      if (autoContinue) {
        getDirections();
      } else {
        hideLoader();
      }
    },
    (error) => {
      showError("Could not get your current location");
      hideLoader();
    }
  );
}

function getDirections(event) {
  clearError();

  if (!directionsService) {
    showError("Google Maps is still loading, please try again in a moment");
    return;
  }

  const typedOrigin = originInput.value.trim();
  const destination = destinationInput.value.trim();

  if (!typedOrigin) {
    showError("Please enter an origin or use your current location");
    return;
  }
  if (!destination) {
    showError("Please enter a destination");
    return;
  }

  // if the origin is a stale "Current Location" label from a previous visit,
  // re-fetch the current position before requesting directions
  if (typedOrigin === CURRENT_LOCATION_LABEL && !originLatLng) {
    useCurrentLocationAsOrigin(null, true);
    return;
  }

  const origin = originLatLng || typedOrigin;

  lastOrigin = origin;
  lastDestination = destination;
  lastOriginDisplay = originLatLng ? CURRENT_LOCATION_LABEL : typedOrigin;

  showLoader();

  directionsService.route(
    {
      origin: lastOrigin,
      destination: lastDestination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    },
    handleDirectionsResult
  );
}

function handleDirectionsResult(result, status) {
  if (status != "OK") {
    hideLoader();
    showError("Could not find directions for that origin and destination");
    routesDiv.innerHTML = "";
    mapDiv.style.display = "none";
    return;
  }

  baseDirectionsResult = result;
  currentRoutes = result.routes;

  if (currentRoutes.length < 3) {
    // a single trip often has only one sane highway route; asking again
    // while avoiding highways tends to surface a genuinely different one
    directionsService.route(
      {
        origin: lastOrigin,
        destination: lastDestination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        avoidHighways: true,
      },
      handleAvoidHighwaysResult
    );
    return;
  }

  finalizeRoutes();
}

function handleAvoidHighwaysResult(result, status) {
  if (status == "OK") {
    result.routes.forEach((route) => {
      if (currentRoutes.length >= 3) {
        return;
      }
      const isDuplicate = currentRoutes.some((existing) => existing.summary === route.summary);
      if (!isDuplicate) {
        currentRoutes.push(route);
      }
    });
  }

  finalizeRoutes();
}

function finalizeRoutes() {
  hideLoader();

  mapDiv.style.display = "block";
  directionsRenderer.setDirections({ ...baseDirectionsResult, routes: currentRoutes });
  directionsRenderer.setRouteIndex(0);

  renderRouteOptions(0);

  saveToHistory(lastOriginDisplay, lastDestination);
}

function renderRouteOptions(selectedIndex) {
  routesDiv.innerHTML = "";

  currentRoutes.forEach((route, index) => {
    const leg = route.legs[0];

    const optionDiv = document.createElement("div");
    optionDiv.className = "route-option" + (index === selectedIndex ? " selected" : "");
    optionDiv.onclick = () => selectRoute(index);

    const durationP = document.createElement("p");
    durationP.className = "duration";
    durationP.innerText = leg.duration.text;
    optionDiv.appendChild(durationP);

    const detailP = document.createElement("p");
    detailP.innerText = `${route.summary || "Route " + (index + 1)} - ${leg.distance.text}`;
    optionDiv.appendChild(detailP);

    routesDiv.appendChild(optionDiv);
  });

  renderSteps(currentRoutes[selectedIndex]);
}

function renderSteps(route) {
  stepsDiv.innerHTML = "";

  if (!route) {
    return;
  }

  const heading = document.createElement("p");
  heading.innerText = "Turn-by-turn: " + (route.summary || "Selected route");
  stepsDiv.appendChild(heading);

  const list = document.createElement("ol");

  route.legs[0].steps.forEach((step) => {
    const li = document.createElement("li");

    const instructionsSpan = document.createElement("span");
    instructionsSpan.innerHTML = step.instructions;
    li.appendChild(instructionsSpan);

    const detailSpan = document.createElement("span");
    detailSpan.innerText = ` (${step.distance.text}, ${step.duration.text})`;
    li.appendChild(detailSpan);

    list.appendChild(li);
  });

  stepsDiv.appendChild(list);
}

function selectRoute(index) {
  directionsRenderer.setRouteIndex(index);
  renderRouteOptions(index);
}

prefillFromHistory();
renderHistory();
