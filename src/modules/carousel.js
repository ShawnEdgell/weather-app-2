// app.js (main application)
import { fetchData, processWeatherData } from './modules/api.js';
import { updateUI } from './modules/ui.js';
import createCarousel from './carousel.js'; // Import your carousel module

const defaultLocation = 'Toronto';
let currentPage = 1;

// Initialize the carousel
const slidesSelector = '.hourly-forecast-item';
const prevButtonSelector = '.prev-button';
const nextButtonSelector = '.next-button';
createCarousel(slidesSelector, prevButtonSelector, nextButtonSelector);

function nextCarouselPage() {
    const hourlyForecast = document.getElementById("hourlyForecast");
    const numberOfPages = Math.ceil(hourlyForecast.children.length / 8);

    if (currentPage < numberOfPages) {
        currentPage++;
        updateCarousel();
    }
}

function prevCarouselPage() {
    if (currentPage > 1) {
        currentPage--;
        updateCarousel();
    }
}

function updateCarousel() {
    const hourlyForecast = document.getElementById("hourlyForecast");
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const items = hourlyForecast.getElementsByClassName("hourly-forecast-item");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }

    for (let i = startIndex; i < endIndex && i < items.length; i++) {
        items[i].style.display = "block";
    }
}

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("loading").style.display = "block";

    const location = document.getElementById("locationInput").value || defaultLocation;

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
        currentPage = 1;
        updateCarousel();
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

document.querySelector(".prev-button").addEventListener("click", () => {
    prevCarouselPage();
});

document.querySelector(".next-button").addEventListener("click", () => {
    nextCarouselPage();
});

const fetch7DayForecast = async (location) => {
    try {
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=219a015ee939448aa0f195825231010&q=${location}&days=7&aqi=no&alerts=no`
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
