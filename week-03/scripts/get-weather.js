const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const LAT = 6.63;
const LON = 49.74;
const UNITS = "imperial";

// NOTE:
// This API key is intentionally exposed because this project
// is deployed as a static GitHub Pages site for a class assignment.
// In production, API requests should be proxied through a backend
// where secrets are stored securely.
const API_KEY = "e6955d20253e5ae3f87c89bfa2650b17";
// BAD BAD BAD BAD BAD PRACTICE

const PARAMS = ["lat", "lon", "units", "APPID"];
const PARAM_VALUES = [LAT, LON, UNITS, API_KEY];

let URL = BASE_URL;
let i = 0;
PARAMS.forEach(param => {
    if (i < PARAM_VALUES.length - 1)
        URL += `${param}=${PARAM_VALUES[i]}&`
    else
        URL += `${param}=${PARAM_VALUES[i]}`
    i++;
});

async function apiFetch(url) {
    try {
        let response = await fetch(url);
        if (!response.ok)
            response.text = "Failed to fetch endpoint";
        else {
            let data = response.json();
            console.log(data)
        }
    } catch (err) {
        console.error(`Error fetching endpoint "${url}. Error:"`, err);
    }
}

apiFetch();