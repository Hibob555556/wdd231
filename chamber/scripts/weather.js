const CURRENT_TEMP_OUT = document.querySelector('#current-temp');
const WEATHER_ICON_OUT = document.querySelector('#weather-icon');
const WEATHER_CAPTION = document.querySelector('#weather-desc');
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast?";
const UNITS = "imperial";
const LAT = 41.73;
const LON = -111.83;

// NOTE: 
// This API key is intentionally exposed because this project 
// is deployed as a static GitHub Pages site for a class assignment. 
// In production, API requests should be proxied through a backend 
// where secrets are stored securely. 
const API_KEY = "e6955d20253e5ae3f87c89bfa2650b17";

const PARAMS = ["lat", "lon", "units", "APPID"];
const PARAM_VALUES = [LAT, LON, UNITS, API_KEY];

let url = BASE_URL;
let forecast_url = FORECAST_BASE_URL;
let i = 0;
PARAMS.forEach(param => {
    if (i < PARAM_VALUES.length - 1) {
        url += `${param}=${PARAM_VALUES[i]}&`
        forecast_url += `${param}=${PARAM_VALUES[i]}&`
        i++;
    } else {
        url += `${param}=${PARAM_VALUES[i]}`
        forecast_url += `${param}=${PARAM_VALUES[i]}`
    }
});
apiFetch(url);
apiFetch(forecast_url, true);

async function apiFetch(url, forecast = false) {
    try {
        let response = await fetch(url);
        if (!response.ok)
            throw new Error("Failed to fetch endpoint");
        let data = await response.json();
        if (forecast)
            displayForecast(data);
        else
            displayResults(data);
    } catch (err) {
        WEATHER_CAPTION.textContent = "Weather unavailable";
        console.error(err)
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

function displayForecast(forecastData) {
    function dateFromDt(dtSecs, utcOffset) {
        let date = new Date((dtSecs + utcOffset) * 1000);
        date = date.toISOString().slice(0, 10);
        return date;
    }

    function parseDayOfWeek(num) {
        switch (num) {
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            case 7:
                return "Sunday"
            default:
                break;
        }
    }

    let utc_offset = forecastData.city.timezone;
    let nowUtcSec = Math.floor(Date.now() / 1000);
    let data = forecastData.list;
    let todayKey = dateFromDt(nowUtcSec, utc_offset);
    let byDay = {};

    for (let item of data) {
        let dayKey = dateFromDt(item.dt, utc_offset);
        if (dayKey === todayKey) continue;
        (byDay[dayKey] ??= []).push(item);
    }

    let days = Object.keys(byDay);
    days = days.sort().slice(0, 3);

    let forecastSummary = days.map(dayKey => {
        let items = byDay[dayKey]
        let high = Math.max(...items.map(x => x.main.temp_max))
        let midday = items.find(x => x.dt_txt.includes("12:00:00")) ?? items[Math.floor(items.length / 2)];
        let desc = midday.weather[0].description;
        let icon = midday.weather[0].icon;

        return { dayKey, high, desc, icon };
    })

    let day_count = 0;
    const base_id = '#day-{REPLACE}-icon';
    const desc_base_id = '#day-{REPLACE}-weather-desc';
    const temp_base_id = '#temp-day-{REPLACE}';
    const base_day_id = '#day-of-week-{REPLACE}'
    const replace_string = '{REPLACE}';
    for (let day of forecastSummary) {
        if (day_count > 3) break;
        day_count++;

        const num_of_day = new Date(day.dayKey).getDay() + 1
        const day_of_week = parseDayOfWeek(num_of_day);
        const temp_container = document.querySelector(temp_base_id.replace(replace_string, day_count));
        temp_container.innerHTML = `${day_of_week}: <b>${Math.round(day.high)} °F</b>`;
    }
}
