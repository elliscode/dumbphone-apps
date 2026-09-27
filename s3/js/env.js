// These values are derived from the domain the page is being served from.
// The API is expected to live at api.<domain>, e.g. www.dumbphoneapps.com
// and dumbphoneapps.com use api.dumbphoneapps.com, and dpa.elliscode.com
// uses api.dpa.elliscode.com. When running locally (localhost or file://),
// the production dumbphoneapps.com values are used.
const DEFAULT_UI_DOMAIN_NO_HTTP = "www.dumbphoneapps.com";
const IS_LOCAL = ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
const UI_DOMAIN_NO_HTTP = IS_LOCAL ? DEFAULT_UI_DOMAIN_NO_HTTP : window.location.host;
const UI_DOMAIN = "https://" + UI_DOMAIN_NO_HTTP;
const API_DOMAIN = "https://api." + UI_DOMAIN_NO_HTTP.replace(/^www\./, "");
const THERMOSTAT_URL = UI_DOMAIN + "/thermostat/index.html";
