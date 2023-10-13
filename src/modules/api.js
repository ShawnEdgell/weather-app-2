// api.js
const API_BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const API_KEY = "219a015ee939448aa0f195825231010"; // Replace with your WeatherAPI API key

export const fetchData = async (location = "Toronto") => {
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

export const fetchWeeklyForecast = async (location = "Toronto") => {
    const url = `${API_BASE_URL}?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.forecast.forecastday;
    } catch (error) {
        console.error(`Error fetching weekly forecast data for ${location}: ${error.message}`);
        throw error;
    }
};

export const processWeatherData = (data) => {
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
