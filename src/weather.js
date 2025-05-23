import React from 'react';

function Weather({ weather }) {
  const generateAdvice = () => {
    if (!weather) return '';

    const wind = weather.wind.speed;
    const pressure = weather.main.pressure;
    const desc = weather.weather[0].description.toLowerCase();

    if (wind > 15) return 'Windy! Consider fishing in sheltered spots.';
    if (pressure < 1000) return 'Low pressure, fish may be more active.';
    if (desc.includes('rain')) return 'Rainy conditions — fish near cover.';
    return 'Great day for fishing! Try early morning or late evening.';
  };

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <p>🌡️ Temp: {weather.main.temp}°C</p>
      <p>☁️ Conditions: {weather.weather[0].description}</p>
      <p>💨 Wind: {weather.wind.speed} m/s</p>
      <p>📉 Pressure: {weather.main.pressure} hPa</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
      <p>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
      <p>🎣 Advice: <strong>{generateAdvice()}</strong></p>
    </div>
  );
}

export default Weather;
