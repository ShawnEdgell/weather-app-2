const API_BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const API_KEY = "219a015ee939448aa0f195825231010"; // Replace with your WeatherAPI API key

let currentPage = 1;

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("loading").style.display = "block";

    const location = document.getElementById("locationInput").value.trim();

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
        currentPage = 1; // Reset to the first page when new data is loaded

        // Fetch and update the 7-day forecast for the new location
        const forecastData = await fetch7DayForecast(location);
        update7DayForecast(forecastData);

        // Update date, time, and location based on the new location
        updateDateAndTime(location);
    } catch (error) {
        document.getElementById("errorMsg").innerText = error;
        document.getElementById("errorMsg").style.display = "block";
    } finally {
        document.getElementById("loading").style.display = "none";
    }
});

(async () => {
    // No default location used here
})();

const fetchData = async (location) => {
    const url = `${API_BASE_URL}?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching data for ${location}: ${error.message}`);
        throw error;
    }
};

const fetch7DayForecast = async (location) => {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`
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

const processWeatherData = (data) => {
    const current = data.current;
    const forecast = data.forecast.forecastday[0]; // Assuming you want data for the first day

    return {
        location: `${data.location.name}`,
        temperature: current.temp_c,
        feelsLike: current.feelslike_c,
        uv: current.uv,
        description: current.condition.text,
        humidity: current.humidity,
        windSpeed: current.wind_kph,
        icon: current.condition.icon,
        daily_chance_of_rain: forecast.day.daily_chance_of_rain,
        daily_chance_of_snow: forecast.day.daily_chance_of_snow,
        hourly_forecast: forecast.hour,
    };
};

const updateUI = (data) => {
    document.getElementById("location").textContent = data.location;
    document.getElementById("temperature").textContent = `${data.temperature}°C`;
    document.getElementById("feelsLikeValue").textContent = `${data.feelsLike}°C`;
    document.getElementById("uvIndexValue").textContent = data.uv;
    document.getElementById("description").textContent = data.description;
    document.getElementById("humidityValue").textContent = `${data.humidity}%`;
    document.getElementById("windSpeedValue").textContent = `${data.windSpeed} kph`;
    document.getElementById("icon").setAttribute("src", data.icon);

    formatDateAndTime();
    displayHourlyForecast(data.hourly_forecast);

    document.getElementById("rainValue").textContent = `${data.daily_chance_of_rain}%`;
    document.getElementById("snowValue").textContent = `${data.daily_chance_of_snow}%`;
};

const formatDateAndTime = () => {
    const currentDate = new Date();
    const optionsForDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString('en-US', optionsForDate);

    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`;

    document.getElementById('currentDate').textContent = `currentDate: ${dateString}`;
    document.getElementById('currentTime').textContent = `currentTime: ${timeString}`;
};

const displayHourlyForecast = (hourlyForecast) => {
    const forecastContainer = document.getElementById('hourlyForecast');
    forecastContainer.innerHTML = '';

    // Get the current date and time
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Calculate the next hour based on the current time
    let nextHour = currentHour + 1;
    if (currentMinute < 1) {
        nextHour = currentHour;
    }

    hourlyForecast.forEach((hour) => {
        // Check if the hour matches the nextHour
        const hourTimestamp = hour.time_epoch * 1000;
        const hourDate = new Date(hourTimestamp);
        const hourValue = hourDate.getHours();

        // Only display forecast data for the next hour and beyond
        if (hourValue >= nextHour) {
            const hourElement = document.createElement('div');
            hourElement.classList.add('hourly-forecast-item');

            // Create an <img> element for the weather icon
            const iconImg = document.createElement('img');
            iconImg.setAttribute('src', hour.condition.icon);
            iconImg.setAttribute('alt', 'Weather Icon');

            // Format the time as HH:MM AM/PM
            const formattedTime = `${hourValue % 12}:${hourValue % 12 === 0 ? '00' : '00'} ${hourValue >= 12 ? 'PM' : 'AM'}`;

            // Create a <span> element for time
            const timeSpan = document.createElement('span');
            timeSpan.textContent = formattedTime;

            // Create a <span> element for temperature
            const temperatureSpan = document.createElement('span');
            temperatureSpan.textContent = `${hour.temp_c}°C`;

            // Append the icon, time, and temperature to the hourElement
            hourElement.appendChild(iconImg);
            hourElement.appendChild(timeSpan);
            hourElement.appendChild(temperatureSpan);

            // Append the hourly forecast item to the container
            forecastContainer.appendChild(hourElement);

            // Increment nextHour for the next iteration
            nextHour++;
        }
    });
};

// Get the radio buttons and forecast content element
const dailyRadio = document.getElementById("daily");
const hourlyRadio = document.getElementById("hourly");
const forecastContent = document.getElementById("forecast-content");

// Add event listeners to the radio buttons
dailyRadio.addEventListener("change", () => {
    forecastContent.classList.remove("show-hourly");
});

hourlyRadio.addEventListener("change", () => {
    forecastContent.classList.add("show-hourly");
});

const updateDateAndTime = (location) => {
    // Fetch data for the selected location to get its current time
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
    .then((response) => response.json())
    .then((data) => {
        const date = new Date(data.location.localtime);
        const optionsForDate = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = date.toLocaleDateString('en-US', optionsForDate);

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;

        const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

        document.getElementById('currentDate').textContent = `${dateString}`;
        document.getElementById('currentTime').textContent = `${timeString}`;
    })
    .catch((error) => {
        console.error(`Error fetching date and time data for ${location}: ${error.message}`);
    });
};
