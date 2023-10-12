// app.js
import { fetchData, processWeatherData } from './modules/api.js'; // Remove fetchWeeklyForecast import as we don't need it
import { updateUI } from './modules/ui.js';

// Set the default location to Toronto
const defaultLocation = 'Toronto';

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Hide previous error messages
    document.getElementById("errorMsg").style.display = "none";

    // Show loading state
    document.getElementById("loading").style.display = "block";

    // Set the location to the value from the input or the default location
    const location = document.getElementById("locationInput").value || defaultLocation;

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
    } catch (error) {
        // Display the error in the UI
        document.getElementById("errorMsg").innerText = error;
        document.getElementById("errorMsg").style.display = "block";
    } finally {
        // Hide loading state in a finally block to ensure it always hides, even if there's an error
        document.getElementById("loading").style.display = "none";
    }
});

// Fetch weather data for default location (Toronto) on page load
(async () => {
    const data = await fetchData(defaultLocation);
    const processedData = processWeatherData(data);
    updateUI(processedData);
})();
