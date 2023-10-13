// ui.js
// ui.js
export const updateUI = (data) => {
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

    document.getElementById('currentDate').textContent = dateString;
    document.getElementById('currentTime').textContent = timeString;
};

const displayHourlyForecast = (hourlyForecast) => {
    const forecastContainer = document.getElementById('hourlyForecast');
    forecastContainer.innerHTML = '';

    hourlyForecast.forEach((hour) => {
        const hourElement = document.createElement('div');
        hourElement.classList.add('hourly-forecast-item');

        // Create an <img> element for the weather icon
        const iconImg = document.createElement('img');
        iconImg.setAttribute('src', hour.condition.icon);
        iconImg.setAttribute('alt', 'Weather Icon');

        // Create a <span> element for time
        const timeSpan = document.createElement('span');
        timeSpan.textContent = new Date(hour.time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        // Create a <span> element for temperature
        const temperatureSpan = document.createElement('span');
        temperatureSpan.textContent = `${hour.temp_c}°C`;

        // Append the icon, time, and temperature to the hourElement
        hourElement.appendChild(iconImg);
        hourElement.appendChild(timeSpan);
        hourElement.appendChild(temperatureSpan);

        forecastContainer.appendChild(hourElement);
    });
};
