import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5010/weather/${city}`); // Use your backend
      const data = await response.json();
  
      if (response.status !== 200) {
        alert(data.message || "City not found! Please enter a valid city.");
        return;
      }
  
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching weather data. Please try again.");
    }
  };
  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {weather && (
          <div>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
