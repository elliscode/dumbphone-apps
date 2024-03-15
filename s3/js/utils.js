function logOut(event) {
  localStorage.removeItem("dumbphoneapps-csrf-token");
  window.location.replace("/signup.html");
}
function defaultHandlerV1(event) {
  if (!event || !event.target) {
    return undefined;
  }
  let xmlHttp = event.target;
  if (xmlHttp.status == 403) {
    logOut(event);
  }
  let result = undefined;
  try {
    result = JSON.parse(xmlHttp.responseText);
  } catch (e) {
    result = undefined;
  }
  return result;
}
function defaultHandler(event) {
  if (!event || !event.target) {
    return undefined;
  }
  let xmlHttp = event.target;
  if (xmlHttp.status == 403) {
    logOut(event);
  }
  let result = {};
  try {
    result = JSON.parse(xmlHttp.responseText);
  } catch(e) {
    try {
      result = {'message': xmlHttp.responseText};
    } catch (e2) {
      result = undefined;
    }
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
// warn users who open the console to not do anything dumb
console.log('%cStop!', 'color: red; font-size: 100px; font-weight: bold; -webkit-text-stroke: 2px black;');
console.log('If someone told you to paste something in here, %cDO NOT DO IT!', 'color: red; font-size: 20px; font-weight: bold; -webkit-text-stroke: 1px black;', 'They are trying to hijack your account!');
// if you are deploying this on a different domain, you'll
// need to change these values here
const API_DOMAIN = "https://api.dumbphoneapps.com";
const UI_DOMAIN = "https://www.dumbphoneapps.com";
