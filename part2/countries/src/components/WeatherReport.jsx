import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherReport = ({ city }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => setWeatherData(response.data))
      .catch((error) => console.error('Error fetching data', error));
  }, [apiUrl]);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  const { main, wind, weather } = weatherData;
  return (
    <div>
      <p>Temperature: {main.temp} °C</p>
      <p>Wind: {wind.speed} m/s</p>
      <p>Weather: {weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
        alt={weather[0].description}
      />
    </div>
  );
};

export default WeatherReport;
