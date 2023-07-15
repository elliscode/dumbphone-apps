function logOut(event) {
    localStorage.removeItem('dumbphoneapps-csrf-token');
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
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const csrfToken = localStorage.getItem('dumbphoneapps-csrf-token');
if (!csrfToken) {
    window.location.replace("../signup.html");
}
const DOMAIN = 'https://test.dumbphoneapps.com';