function logOut(event) {
  localStorage.removeItem("dumbphoneapps-csrf-token");
  window.location.replace("/signup.html");
}
function defaultHandler(event) {
  let xmlHttp = event.target;
  if (xmlHttp.status == 403) {
    logOut(event);
  }
  let result = JSON.parse(xmlHttp.responseText);
  return result;
}
function getParameterByName(name, url = window.location.href) {
  name = name.replace(new RegExp("[[]]", "g"), "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  let results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function iosCookieRefresh(event) {
  let cookieRefreshTime = localStorage.getItem(
    "dumbphoneapps-cookie-refresh-time"
  );
  if (
    !cookieRefreshTime ||
    !new RegExp("d+").test(cookieRefreshTime) ||
    parseInt(cookieRefreshTime) < new Date().getTime()
  ) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", API_DOMAIN + "/ios-cookie-refresh", true);
    xmlHttp.withCredentials = true;
    xmlHttp.onload = handleIosCookieRefresh;
    xmlHttp.send(
      JSON.stringify({
        csrf: csrfToken
      })
    );
  }
}
function handleIosCookieRefresh(event) {
  let xmlHttp = event.target;
  let timeInt = new Date().getTime() + 86400000;
  localStorage.setItem("dumbphoneapps-cookie-refresh-time", timeInt.toString());
}
function findParentWithClass(element, className) {
  let current = element;
  while (!!current) {
    if (current.classList.contains(className)) {
      return current;
    }
    current = current.parentElement;
  }
  return current;
}
const csrfToken = localStorage.getItem("dumbphoneapps-csrf-token");
const API_DOMAIN = "https://api.dumbphoneapps.com";
const UI_DOMAIN = "https://www.dumbphoneapps.com";
