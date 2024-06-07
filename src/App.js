import { useState } from "react";
import "./App.css";
import axios from 'axios';
import sunny from "./assets/sunny.svg";
import rainy from "./assets/rainy.svg";
import stormy from "./assets/stormy.svg";
import cloudy from "./assets/cloudy.svg";


const api = {
  key: "bb2e8c6ed5e991f76b07ae3175db9ab7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clear":
      return sunny;
    case "Rain":
      return rainy;
    case "Thunderstorm":
      return stormy;
    case "Clouds":
      return cloudy;
    default:
      return null;
  }
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

    const searchPressed = async () => {
      try {
        const response = await axios.get(`${api.base}weather`, {
          params: {
            q: search,
            units: 'metric',
            APPID: api.key,
          },
        });
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

  return (
    <div className="App">
      <header className="App-header">
      {/* HEADER  */}
        <h1>Weather App</h1>

        {/* Search Box - Input + Button  */}
        <div>
          <input
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed} >Search</button>
        </div>

        {/* If weather is not undefined display results from API */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location  */}
            <p>{weather.name}</p>

            {/* Temperature Celsius  */}
            <p>{weather.main.temp}°C</p>

            {/* Condition (Sunny ) */}
            <img src={getWeatherIcon(weather.weather[0].main)} alt="icon" width={200} height={200} />
            <span>{}</span>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        ) : (
          ""
        )}
      </header>
    </div>
  );
}

export default App;