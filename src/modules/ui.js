// ui.js
export const updateUI = (data) => {
    document.getElementById("location").textContent = data.location;
    document.getElementById("temperature").textContent = `${data.temperature}°C`;
    document.getElementById("feelsLike").textContent = `Feels like: ${data.feelsLike}°C`;
    document.getElementById("uvIndex").textContent = `UV Index: ${data.uv}`;
    document.getElementById("description").textContent = data.description;
    document.getElementById("humidity").textContent = `Humidity: ${data.humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind speed: ${data.windSpeed} kph`;
    document.getElementById("icon").setAttribute("src", data.icon);

    formatDateAndTime(); // Display date and time
    displayHourlyForecast(data.hourly_forecast); // Display hourly forecast

    // Use the correct field names for chance of rain and snow from your API response
    const chanceOfRain = data.daily_chance_of_rain;
    const chanceOfSnow = data.daily_chance_of_snow;

    document.getElementById("chanceOfRain").textContent = `Chance of Rain: ${chanceOfRain}%`;
    document.getElementById("chanceOfSnow").textContent = `Chance of Snow: ${chanceOfSnow}%`;
};

const formatDateAndTime = () => {
    const currentDate = new Date();
    const optionsForDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString('en-US', optionsForDate);

    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`;

    document.getElementById('currentDate').textContent = dateString;
    document.getElementById('currentTime').textContent = timeString;
};

const displayHourlyForecast = (hourlyForecast) => {
    const forecastContainer = document.getElementById('hourlyForecast');
    forecastContainer.innerHTML = ''; // Clear previous data

    hourlyForecast.forEach((hour) => {
        const hourElement = document.createElement('div');
        hourElement.classList.add('hourly-forecast-item');

        // Format the time to your preferred display format
        const time = new Date(hour.time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        hourElement.textContent = `${time} - ${hour.temp_c}°C`;

        forecastContainer.appendChild(hourElement);
    });
};
