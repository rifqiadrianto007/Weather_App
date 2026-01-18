import { useEffect, useState } from "react";
import { useMemo } from "react";
import {
    getCurrentWeather,
    getForecast,
    getCurrentWeatherByCoords,
    getForecastByCoords,
} from "./services/weatherApi";
import { getWeatherIcon } from "./utils/weatherIcon";
import {
    getLocalDateTime,
    formatDay,
    formatDate,
    formatTime,
    isNightTime,
} from "./utils/timezone";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DayParts from "./components/DayParts";
import WeeklyForecast from "./components/WeeklyForecast";
import AnimatedCard from "./components/AnimateCard";
import WeatherParticles from "./components/WeatherParticles";

function App() {
    const [city, setCity] = useState("Jakarta");
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);

    async function fetchByCity(name) {
        const c = await getCurrentWeather(name);
        const f = await getForecast(name);
        setCurrent(c);
        setForecast(f);
        setCity(name);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const c = await getCurrentWeatherByCoords(latitude, longitude);
                const f = await getForecastByCoords(latitude, longitude);
                setCurrent(c);
                setForecast(f);
                setCity(c.name);
            },
            () => fetchByCity(city)
        );
    }, []);

    if (!current || !forecast) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading weather...
            </div>
        );
    }

    const localDate = useMemo(
        () => getLocalDateTime(current.dt, current.timezone),
        [current.dt, current.timezone]
    );
    const night = useMemo(
        () => isNightTime(localDate),
        [localDate]
    );

    const weatherMain = current.weather[0].main;
    const isStorm =
        weatherMain === "Rain" || weatherMain === "Thunderstorm";

    let particleType = null;
    if (weatherMain === "Rain" || weatherMain === "Thunderstorm") {
        particleType = "rain";
    }
    if (weatherMain === "Snow") {
        particleType = "snow";
    }

    const CurrentIcon = useMemo(
        () => getWeatherIcon(weatherMain),
        [weatherMain]
    );

    const hourly = useMemo(
        () =>
            forecast.list.slice(0, 6).map((item) => ({
                time: new Date(item.dt_txt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                }),
                icon: getWeatherIcon(item.weather[0].main),
            })),
        [forecast.list]
    );

    const parts = useMemo(
        () =>
            [2, 5, 7].map((i, idx) => ({
                label: ["Morning", "Afternoon", "Evening"][idx],
                temp: Math.round(forecast.list[i].main.temp),
                desc: forecast.list[i].weather[0].description,
                icon: getWeatherIcon(forecast.list[i].weather[0].main),
            })),
        [forecast.list]
    );

    const dailyMap = {};
    forecast.list.forEach((item) => {
        const d = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
        });
        dailyMap[d] = dailyMap[d] || [];
        dailyMap[d].push(item);
    });

    const weekly = useMemo(() => {
        const map = {};
        forecast.list.forEach((item) => {
            const d = new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
            });
            map[d] = map[d] || [];
            map[d].push(item);
        });

        return Object.entries(map)
            .slice(0, 7)
            .map(([day, items]) => ({
                day,
                max: Math.round(Math.max(...items.map(i => i.main.temp_max))),
                min: Math.round(Math.min(...items.map(i => i.main.temp_min))),
                icon: getWeatherIcon(items[0].weather[0].main),
            }));
    }, [forecast.list]);

export default App;