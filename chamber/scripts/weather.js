const CURRENT_TEMP_OUT = document.querySelector('#current-temp');
const WEATHER_ICON_OUT = document.querySelector('#weather-icon');
const WEATHER_CAPTION = document.querySelector('#weather-desc');
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const UNITS = "imperial";
const LAT = 41.73
const LON = -111.83

// NOTE: 
// This API key is intentionally exposed because this project 
// is deployed as a static GitHub Pages site for a class assignment. 
// In production, API requests should be proxied through a backend 
// where secrets are stored securely. 
const API_KEY = "e6955d20253e5ae3f87c89bfa2650b17";

const PARAMS = ["lat", "lon", "units", "APPID"];
const PARAM_VALUES = [LAT, LON, UNITS, API_KEY];

let url = BASE_URL;
let i = 0;
PARAMS.forEach(param => {
    if (i < PARAM_VALUES.length - 1)
        url += `${param}=${PARAM_VALUES[i]}&`
    else
        url += `${param}=${PARAM_VALUES[i]}`
    i++;
});
apiFetch(url);

async function apiFetch(url) {
    try {
        let response = await fetch(url);
        if (!response.ok)
            throw new Error("Failed to fetch endpoint");
        let data = await response.json();
        displayResults(data);
    } catch (err) {
        WEATHER_CAPTION.textContent = "Weather unavailable";
        return 0;
    }
}

function displayResults(weatherData) {
    // data 
    const ICON_ID = weatherData['weather'][0]['icon'];
    const TEMP = weatherData['main']['temp'];
    const ICON_URL = `https://openweathermap.org/img/wn/${ICON_ID}@2x.png`;
    const WEATHER_DESC = weatherData['weather'][0]['description']

    // display 
    CURRENT_TEMP_OUT.textContent = `${TEMP} °F`;
    WEATHER_ICON_OUT.setAttribute('src', ICON_URL);
    WEATHER_ICON_OUT.setAttribute('alt', WEATHER_DESC);
    WEATHER_CAPTION.textContent = WEATHER_DESC;
}