import { fetchData, processWeatherData } from './modules/api.js';
import { updateUI } from './modules/ui.js';

const defaultLocation = 'Toronto';
let currentPage = 1;

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("loading").style.display = "block";

    const location = document.getElementById("locationInput").value || defaultLocation;

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
        currentPage = 1; // Reset to the first page when new data is loaded
    } catch (error) {
        document.getElementById("errorMsg").innerText = error;
        document.getElementById("errorMsg").style.display = "block";
    } finally {
        document.getElementById("loading").style.display = "none";
    }
});

(async () => {
    const data = await fetchData(defaultLocation);
    const processedData = processWeatherData(data);
    updateUI(processedData);
})();

const fetch7DayForecast = async (location) => {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=219a015ee939448aa0f195825231010&q=${location}&days=7&aqi=no&alerts=no`
        );
        if (!response.ok) {
            throw new Error('Unable to fetch 7-day forecast data.');
        }
        const data = await response.json();
        return data.forecast.forecastday;
    } catch (error) {
        throw error;
    }
};

const update7DayForecast = (forecastData) => {
    const forecastContainer = document.querySelector('.seven-day-forecast');
    forecastContainer.innerHTML = '';

    forecastData.forEach((day) => {
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');

        const date = new Date(day.date);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const iconUrl = day.day.condition.icon;
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;

        forecastElement.innerHTML = `
            <div class="forecast-day-icon">
                <img src="${iconUrl}" alt="Weather Icon">
            </div>
            <div class="forecast-day-info">
                <div class="forecast-day-name">${dayOfWeek}</div>
                <div class="forecast-day-temp">${maxTemp}°C / ${minTemp}°C</div>
            </div>
        `;

        forecastContainer.appendChild(forecastElement);
    });
};

(async () => {
    try {
        const location = document.getElementById('locationInput').value || defaultLocation;
        const forecastData = await fetch7DayForecast(location);
        update7DayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching 7-day forecast:', error);
    }
})();


