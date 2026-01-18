import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import { getWeather, getForecast } from "./services/weatherApi";
import "./App.css";

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleSearch = async (city) => {
        const weatherData = await getWeather(city);
        const forecastData = await getForecast(city);
        setWeather(weatherData);
        setForecast(forecastData);
    };

    return (
        <div className="app">
            <div className="weather-container">
                <SearchBar onSearch={handleSearch} />
                <WeatherCard data={weather} />
                <ForecastList data={forecast} />
            </div>
        </div>

    );
}

export default App;
