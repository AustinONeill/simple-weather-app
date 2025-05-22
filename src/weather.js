import React, { useState } from 'react';

const API_KEY = 'ee9fc413ee0d5f45cb95332611591cc8'; // Replace with your OpenWeatherMap API key

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }
    try {
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Failed to fetch weather.');
      setWeather(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Simple Weather App</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={fetchWeather} className="btn btn-primary mb-3">
        Get Weather
      </button>

      {error && <div className="alert alert-danger">{error}</div>}

      {weather && (
        <div className="card">
          <div className="card-body">
            <h3>{weather.name}, {weather.sys.country}</h3>
            <h4>{weather.main.temp} °C</h4>
            <p>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
