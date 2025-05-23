import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'ee9fc413ee0d5f45cb95332611591cc8'; // Replace with your OpenWeatherMap API Key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      setError('');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found or API issue.');
    }
  };

  const generateAdvice = (weather) => {
    if (!weather) return '';

    const wind = weather.wind.speed;
    const pressure = weather.main.pressure;
    const desc = weather.weather[0].description.toLowerCase();

    if (wind > 15) return 'Windy! Consider fishing in sheltered spots.';
    if (pressure < 1000) return 'Low pressure, fish may be more active. Try shallow bait.';
    if (desc.includes('rain')) return 'Rainy conditions — fish closer to cover or structure.';
    return 'Great day for fishing! Try early morning or late evening.';
  };

  return (
    <div className="app-container">
      <h1>🎣 Fishing Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Check Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡️ Temp: {weather.main.temp}°C</p>
          <p>☁️ Conditions: {weather.weather[0].description}</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>📉 Pressure: {weather.main.pressure} hPa</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
          <p>🎣 Advice: <strong>{generateAdvice(weather)}</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;

