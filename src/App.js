import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '60d091561b988b1bde7da35bc892df86';

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={getWeather} className="search-button">
          Get Weather
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-box">
          <h2 className="weather-city">{weather.name}</h2>
          <p className="weather-info">Temperature: {weather.main.temp}°C</p>
          <p className="weather-info">Weather: {weather.weather[0].description}</p>
          <p className="weather-info">Humidity: {weather.main.humidity}%</p>
          <p className="weather-info">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
