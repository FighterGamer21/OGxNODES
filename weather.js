const apiKey = '5001476939afff9da85144925206ea5e'; // Your OpenWeatherMap API key
const latitude = 31.0844; // Kailash Latitude
const longitude = 81.3113; // Kailash Longitude

// OpenWeatherMap One Call API URL with coordinates for 7-day forecast
const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById('forecast').textContent = 'Weather data not available.';
            return;
        }

        // Get daily forecast data (next 7 days)
        const forecastData = data.daily;

        // Empty the forecast container before adding new data
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';

        forecastData.forEach((dayData, index) => {
            const day = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = dayData.temp.day;
            const description = dayData.weather[0].description;
            const icon = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;

            // Create forecast box for each day
            const forecastBox = document.createElement('div');
            forecastBox.classList.add('forecast-box');
            forecastBox.innerHTML = `
                <p class="day">${day}</p>
                <img class="icon" src="${icon}" alt="Weather Icon">
                <p class="temp">${temp}°C</p>
                <p class="description">${description}</p>
            `;

            forecastContainer.appendChild(forecastBox);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('forecast').textContent = 'Failed to load weather data.';
    }
}

// Call the function to fetch and display weather data
getWeather();
