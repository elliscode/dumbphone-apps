const originInput = document.getElementById("origin-input");
const destinationInput = document.getElementById("destination-input");
const errorDiv = document.getElementById("error");
const mapDiv = document.getElementById("map");
const routesDiv = document.getElementById("routes");
const stepsDiv = document.getElementById("steps");
const historyDiv = document.getElementById("history");
const stepByStepButton = document.getElementById("step-by-step-button");
const stepOverlay = document.getElementById("step-overlay");
const stepInstructionDiv = document.getElementById("step-instruction");
const stepProgressDiv = document.getElementById("step-progress");
const showLocationCheckbox = document.getElementById("show-location-checkbox");
const stepFollowIndicator = document.getElementById("step-follow-indicator");

const CURRENT_LOCATION_LABEL = "Current Location";
const HISTORY_KEY = "dumbphoneapps-directions-history";
const HISTORY_LIMIT = 5;
const SHOW_LOCATION_KEY = "dumbphoneapps-directions-show-location";
const MIN_ARRIVAL_THRESHOLD_METERS = 40;
const MAX_ARRIVAL_THRESHOLD_METERS = 150;
const ADVANCE_LOOKAHEAD_STEPS = 5;

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
let selectedRouteIndex = 0;
let stepByStepActive = false;
let stepByStepIndex = 0;
let myLocationMarker = undefined;
let locationWatchId = undefined;
let followingLocation = false;

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
    const row = document.createElement("div");
    row.className = "history-row";

    const button = document.createElement("button");
    button.className = "history-entry";
    button.type = "button";
    button.innerText = entry.origin + " to " + entry.destination;
    button.onclick = () => applyHistoryEntry(entry);
    row.appendChild(button);

    const removeButton = document.createElement("button");
    removeButton.className = "history-remove";
    removeButton.type = "button";
    removeButton.innerText = "X";
    removeButton.onclick = (event) => {
      event.stopPropagation();
      removeHistoryEntry(entry);
    };
    row.appendChild(removeButton);

    historyDiv.appendChild(row);
  });
}

function removeHistoryEntry(entry) {
  let history = loadHistory();
  history = history.filter((e) => !(e.origin === entry.origin && e.destination === entry.destination));
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {}
  renderHistory();
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

  // the checkbox may already be checked if the user toggled it before the
  // map finished loading; onchange won't fire again, so check state here too
  if (showLocationCheckbox.checked) {
    startWatchingLocationDot();
  }
}

function handleShowLocationToggle(event) {
  try {
    localStorage.setItem(SHOW_LOCATION_KEY, showLocationCheckbox.checked ? "true" : "false");
  } catch (e) {}

  if (showLocationCheckbox.checked) {
    startWatchingLocationDot();
  } else {
    stopWatchingLocationDot();
  }

  updateFollowIndicatorVisibility();
}

function updateFollowIndicatorVisibility() {
  if (stepByStepActive && showLocationCheckbox.checked) {
    stepFollowIndicator.style.display = "";
  } else {
    stepFollowIndicator.style.display = "none";
    followingLocation = false;
    stepFollowIndicator.classList.remove("active");
  }
}

function distanceMeters(a, b) {
  const aLat = typeof a.lat === "function" ? a.lat() : a.lat;
  const aLng = typeof a.lng === "function" ? a.lng() : a.lng;
  const bLat = typeof b.lat === "function" ? b.lat() : b.lat;
  const bLng = typeof b.lng === "function" ? b.lng() : b.lng;

  const R = 6371000;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const h = sinDLat * sinDLat + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * sinDLng * sinDLng;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function resyncToNearestStep(latLng) {
  const steps = currentRoutes[selectedRouteIndex].legs[0].steps;
  if (!steps || steps.length === 0) {
    return;
  }

  let bestIndex = 0;
  let bestDist = Infinity;
  steps.forEach((step, i) => {
    const d = distanceMeters(latLng, step.end_location);
    if (d < bestDist) {
      bestDist = d;
      bestIndex = i;
    }
  });

  stepByStepIndex = bestIndex;
  showStepByStepIndex(stepByStepIndex, { panToStep: false });
}

function maybeAdvanceStep(latLng, accuracyMeters) {
  const steps = currentRoutes[selectedRouteIndex].legs[0].steps;
  const threshold = Math.min(
    MAX_ARRIVAL_THRESHOLD_METERS,
    Math.max(MIN_ARRIVAL_THRESHOLD_METERS, accuracyMeters || MIN_ARRIVAL_THRESHOLD_METERS)
  );
  const windowEnd = Math.min(steps.length - 1, stepByStepIndex + ADVANCE_LOOKAHEAD_STEPS);

  let reachedIndex = -1;
  for (let i = stepByStepIndex; i <= windowEnd; i++) {
    if (distanceMeters(latLng, steps[i].end_location) <= threshold) {
      reachedIndex = i;
    }
  }

  if (reachedIndex === -1) {
    return;
  }

  const nextIndex = Math.min(reachedIndex + 1, steps.length - 1);
  if (nextIndex !== stepByStepIndex) {
    stepByStepIndex = nextIndex;
    showStepByStepIndex(stepByStepIndex, { panToStep: false });
  }
}

function toggleFollowLocation() {
  followingLocation = !followingLocation;
  stepFollowIndicator.classList.toggle("active", followingLocation);

  if (followingLocation && myLocationMarker) {
    if (stepByStepActive) {
      resyncToNearestStep(myLocationMarker.getPosition());
    }
    map.panTo(myLocationMarker.getPosition());
  }
}

function startWatchingLocationDot() {
  if (!navigator.geolocation || !map || locationWatchId !== undefined) {
    return;
  }

  locationWatchId = navigator.geolocation.watchPosition(
    (position) => {
      const latLng = { lat: position.coords.latitude, lng: position.coords.longitude };

      if (!myLocationMarker) {
        mapDiv.style.display = "block";
        map.setCenter(latLng);
        map.setZoom(15);

        myLocationMarker = new google.maps.Marker({
          map: map,
          position: latLng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#4285f4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
          title: "Your location",
        });
      } else {
        myLocationMarker.setPosition(latLng);
        if (followingLocation) {
          map.panTo(latLng);
          if (stepByStepActive) {
            maybeAdvanceStep(latLng, position.coords.accuracy);
          }
        }
      }
    },
    (error) => {
      // PERMISSION_DENIED won't recover on its own; anything else (no fix yet,
      // timeout) may still succeed on a later update, so keep the watch alive
      if (error && error.code === error.PERMISSION_DENIED) {
        showLocationCheckbox.checked = false;
        stopWatchingLocationDot();
      }
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 }
  );
}

function stopWatchingLocationDot() {
  if (locationWatchId !== undefined) {
    navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = undefined;
  }
  if (myLocationMarker) {
    myLocationMarker.setMap(null);
    myLocationMarker = undefined;
  }
  if (!baseDirectionsResult) {
    mapDiv.style.display = "none";
  }
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

function swapSourceAndDestination(event) {
  clearError();

  const originValue = originInput.value;
  const destinationValue = destinationInput.value;

  // only the origin field supports the "Current Location" shortcut, so if
  // it's currently live-tracked, freeze it to plain coordinates before it
  // moves into the destination field
  const newDestinationValue =
    originValue === CURRENT_LOCATION_LABEL && originLatLng
      ? `${originLatLng.lat},${originLatLng.lng}`
      : originValue;

  originInput.value = destinationValue;
  destinationInput.value = newDestinationValue;
  originLatLng = undefined;
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
      drivingOptions: {
        departureTime: new Date(),
        trafficModel: "bestguess",
      },
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
    stepByStepButton.style.display = "none";
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
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: "bestguess",
        },
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

  stepByStepButton.style.display = "";

  saveToHistory(lastOriginDisplay, lastDestination);
}

function renderRouteOptions(selectedIndex) {
  selectedRouteIndex = selectedIndex;

  routesDiv.innerHTML = "";

  currentRoutes.forEach((route, index) => {
    const leg = route.legs[0];

    const optionDiv = document.createElement("div");
    optionDiv.className = "route-option" + (index === selectedIndex ? " selected" : "");
    optionDiv.onclick = () => selectRoute(index);

    const durationP = document.createElement("p");
    durationP.className = "duration";
    durationP.innerText = (leg.duration_in_traffic || leg.duration).text;
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

function openStepByStep(event) {
  const route = currentRoutes[selectedRouteIndex];
  if (!route) {
    return;
  }

  stepByStepActive = true;
  stepByStepIndex = 0;

  document.body.classList.add("step-mode");
  mapDiv.classList.add("fullscreen");
  stepOverlay.style.display = "block";
  google.maps.event.trigger(map, "resize");

  updateFollowIndicatorVisibility();

  map.setZoom(18);
  showStepByStepIndex(stepByStepIndex);

  document.addEventListener("keydown", handleStepByStepKeydown);
}

function closeStepByStep(event) {
  stepByStepActive = false;

  document.body.classList.remove("step-mode");
  mapDiv.classList.remove("fullscreen");
  stepOverlay.style.display = "none";

  updateFollowIndicatorVisibility();

  document.removeEventListener("keydown", handleStepByStepKeydown);

  google.maps.event.trigger(map, "resize");
  directionsRenderer.setDirections({ ...baseDirectionsResult, routes: currentRoutes });
  directionsRenderer.setRouteIndex(selectedRouteIndex);
}

function handleStepByStepKeydown(event) {
  if (!stepByStepActive) {
    return;
  }
  if (event.key === "7") {
    event.preventDefault();
    if (followingLocation) {
      toggleFollowLocation();
    }
    goToStep(stepByStepIndex - 1);
  } else if (event.key === "9") {
    event.preventDefault();
    if (followingLocation) {
      toggleFollowLocation();
    }
    goToStep(stepByStepIndex + 1);
  } else if (event.key === "4") {
    event.preventDefault();
    map.setZoom(map.getZoom() - 1);
  } else if (event.key === "6") {
    event.preventDefault();
    map.setZoom(map.getZoom() + 1);
  } else if (event.key === "*") {
    event.preventDefault();
    if (stepFollowIndicator.style.display !== "none") {
      toggleFollowLocation();
    }
  } else if (event.key === "Backspace" || event.key === "EndCall") {
    event.preventDefault();
    closeStepByStep();
  }
}

function goToStep(newIndex) {
  const steps = currentRoutes[selectedRouteIndex].legs[0].steps;
  if (newIndex < 0 || newIndex >= steps.length) {
    return;
  }
  stepByStepIndex = newIndex;
  showStepByStepIndex(stepByStepIndex);
}

function showStepByStepIndex(index, options) {
  const panToStep = !options || options.panToStep !== false;
  const steps = currentRoutes[selectedRouteIndex].legs[0].steps;
  const step = steps[index];

  stepInstructionDiv.innerHTML = step.instructions;
  stepProgressDiv.innerText = `${index + 1} / ${steps.length}`;

  if (panToStep) {
    map.panTo(step.start_location);
  }
}

function restoreShowLocationCheckbox() {
  try {
    showLocationCheckbox.checked = localStorage.getItem(SHOW_LOCATION_KEY) === "true";
  } catch (e) {}
}

prefillFromHistory();
renderHistory();
restoreShowLocationCheckbox();
