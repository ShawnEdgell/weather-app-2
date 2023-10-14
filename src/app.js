const API_BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const API_KEY = "219a015ee939448aa0f195825231010";

let currentPage = 1;

const fetchData = async (location = "Toronto") => {
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

document.getElementById("weatherForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("loading").style.display = "block";

    const locationInputElement = document.getElementById("locationInput");
    const locationValue = locationInputElement.value.trim();
    const location = locationValue;

    if (!location) {
        document.getElementById("errorMsg").innerText = "Please provide a location.";
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("loading").style.display = "none";
        return;
    }

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
        currentPage = 1;

        const forecastData = await fetch7DayForecast(location);
        update7DayForecast(forecastData);

        updateDateAndTime(location);
    } catch (error) {
        document.getElementById("errorMsg").innerText = error;
        document.getElementById("errorMsg").style.display = "block";
    } finally {
        document.getElementById("loading").style.display = "none";
        locationInputElement.value = "";
    }
});

window.addEventListener("load", () => {
    document.getElementById("locationInput").value = "";
});

document.getElementById("searchButton").addEventListener("click", async () => {
    const locationInputElement = document.getElementById("locationInput");
    const locationValue = locationInputElement.value.trim();
    const location = locationValue;

    if (!location) {
        document.getElementById("errorMsg").innerText = "Please provide a location.";
        document.getElementById("errorMsg").style.display = "block";
        return;
    }

    searchAndUpdate(location);
});

const searchAndUpdate = async (location) => {
    document.getElementById("errorMsg").style.display = "none";
    document.getElementById("loading").style.display = "block";

    if (!location) {
        document.getElementById("errorMsg").innerText = "Please provide a location.";
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("loading").style.display = "none";
        return;
    }

    try {
        const data = await fetchData(location);
        const processedData = processWeatherData(data);
        updateUI(processedData);
        currentPage = 1;

        const forecastData = await fetch7DayForecast(location);
        update7DayForecast(forecastData);

        updateDateAndTime(location);
    } catch (error) {
        document.getElementById("errorMsg").innerText = error;
        document.getElementById("errorMsg").style.display = "block";
    } finally {
        document.getElementById("loading").style.display = "none";
        document.getElementById("locationInput").value = "";
    }
};

window.addEventListener("load", () => {
    searchAndUpdate("Toronto");
});

document.getElementById("searchButton").addEventListener("click", () => {
    document.getElementById("locationInput").value = "";
});


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
    const forecast = data.forecast.forecastday[0];

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

    document.getElementById("rainValue").textContent = '';
    document.getElementById("snowValue").textContent = '';
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

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let nextHour = currentHour + 1;
    if (currentMinute < 1) {
        nextHour = currentHour;
    }

    hourlyForecast.forEach((hour) => {
        const hourTimestamp = hour.time_epoch * 1000;
        const hourDate = new Date(hourTimestamp);
        const hourValue = hourDate.getHours();

        if (hourValue >= nextHour) {
            const hourElement = document.createElement('div');
            hourElement.classList.add('hourly-forecast-item');

            const iconImg = document.createElement('img');
            iconImg.setAttribute('src', hour.condition.icon);
            iconImg.setAttribute('alt', 'Weather Icon');

            const formattedTime = `${hourValue % 12}:${hourValue % 12 === 0 ? '00' : '00'} ${hourValue >= 12 ? 'PM' : 'AM'}`;

            const timeSpan = document.createElement('span');
            timeSpan.textContent = formattedTime;

            const temperatureSpan = document.createElement('span');
            temperatureSpan.textContent = `${hour.temp_c}°C`;

            hourElement.appendChild(iconImg);
            hourElement.appendChild(timeSpan);
            hourElement.appendChild(temperatureSpan);
            forecastContainer.appendChild(hourElement);

            nextHour++;
        }
    });
};

const forecastContent = document.getElementById("forecast-content");

const updateDateAndTime = (location) => {
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

