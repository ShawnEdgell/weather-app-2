// app.js
import { fetchData, processWeatherData } from './modules/api.js';
import { updateUI } from './modules/ui.js';

// Set the default location to Toronto
const defaultLocation = 'Toronto';

// Variable to track the current page of the carousel
let currentPage = 1;

// Function to go to the next page of the carousel
const nextCarouselPage = () => {
    const hourlyForecast = document.getElementById("hourlyForecast");
    const numberOfPages = Math.ceil(hourlyForecast.children.length / 8);

    if (currentPage < numberOfPages) {
        currentPage++;
        updateCarousel();
    }
};

// Function to go to the previous page of the carousel
const prevCarouselPage = () => {
    if (currentPage > 1) {
        currentPage--;
        updateCarousel();
    }
};

// Function to update the carousel based on the current page
const updateCarousel = () => {
    const hourlyForecast = document.getElementById("hourlyForecast");
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Hide all items in the carousel
    const items = hourlyForecast.getElementsByClassName("hourly-forecast-item");
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }

    // Show items for the current page
    for (let i = startIndex; i < endIndex && i < items.length; i++) {
        items[i].style.display = "block";
    }
};

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("loading").style.display = "block";

    const location = document.getElementById("locationInput").value || defaultLocation;

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
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
