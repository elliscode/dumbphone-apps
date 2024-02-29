function logOut(event) {
  localStorage.removeItem("dumbphoneapps-csrf-token");
  window.location.replace("/signup.html");
}
function defaultHandlerV1(event) {
  let xmlHttp = event.target;
  if (xmlHttp.status == 403) {
    logOut(event);
  }
  let result = JSON.parse(xmlHttp.responseText);
  return result;
}
function defaultHandler(event) {
  let xmlHttp = event.target;
  if (xmlHttp.status == 403) {
    logOut(event);
  }
  let result = {};
  try {
    result = JSON.parse(xmlHttp.responseText);
  } catch(e) {
    console.log('Response text was invalid JSON, returning text as json')
    result = {'message': xmlHttp.responseText};
  }
  return {statusCode: xmlHttp.status, responseJson: result};
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
// https://stackoverflow.com/a/7616484/9313980
function hashCode(input) {
  var hash = 0, i, chr;
  if (input.length === 0) return hash.toString();
  for (i = 0; i < input.length; i++) {
      chr = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}
const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
function getTodayOrUrlParam() {
  let year = 0;
  let month = 0;
  let day = 0;

  let youStillNeedToFigureOutTodaysDate = true;

  // first check if you have a URL param
  let urlParam = getParameterByName("date");
  if (urlParam) {
    // if so, check if its valid
    if (dateRegex.test(urlParam)) {
      let regexResult = dateRegex.exec(urlParam);
      year = regexResult[1];
      month = regexResult[2];
      day = regexResult[3];
      youStillNeedToFigureOutTodaysDate = false;
    }
  }
  if (youStillNeedToFigureOutTodaysDate) {
    let d = new Date();
    year = (d.getFullYear()).toString();
    month = (d.getMonth() + 1).toString();
    day = (d.getDate()).toString();
    
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
  }

  return `${year}-${month}-${day}`;
}
const csrfToken = localStorage.getItem("dumbphoneapps-csrf-token");
const API_DOMAIN = "https://api.dumbphoneapps.com";
const UI_DOMAIN = "https://www.dumbphoneapps.com";
