import { useEffect, useState } from "react";
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
} from "./utils/timezone";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DayParts from "./components/DayParts";
import WeeklyForecast from "./components/WeeklyForecast";

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

    if (!current || !forecast) return null;

    const localDate = getLocalDateTime(current.dt, current.timezone);
    const CurrentIcon = getWeatherIcon(current.weather[0].main);

    const hourly = forecast.list.slice(0, 6).map((item) => ({
        time: new Date(item.dt_txt).toLocaleTimeString("en-US", { hour: "numeric" }),
        icon: getWeatherIcon(item.weather[0].main),
    }));

    const parts = [2, 5, 7].map((i, idx) => ({
        label: ["Morning", "Afternoon", "Evening"][idx],
        temp: Math.round(forecast.list[i].main.temp),
        desc: forecast.list[i].weather[0].description,
        icon: getWeatherIcon(forecast.list[i].weather[0].main),
    }));

    const dailyMap = {};
    forecast.list.forEach((item) => {
        const d = new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
        dailyMap[d] = dailyMap[d] || [];
        dailyMap[d].push(item);
    });

    const weekly = Object.entries(dailyMap).slice(0, 7).map(([day, items]) => ({
        day,
        max: Math.round(Math.max(...items.map(i => i.main.temp_max))),
        min: Math.round(Math.min(...items.map(i => i.main.temp_min))),
        icon: getWeatherIcon(items[0].weather[0].main),
    }));

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-400 to-blue-700">
            <div className="w-275 rounded-4xl p-6 bg-linear-to-b from-sky-500 to-blue-600 text-white">
                <SearchBar onSearch={fetchByCity} />

                <div className="grid grid-cols-[420px_1fr] gap-5">
                    <CurrentWeather
                        day={formatDay(localDate)}
                        date={formatDate(localDate)}
                        temp={Math.round(current.main.temp)}
                        description={current.weather[0].description}
                        Icon={CurrentIcon}
                        details={{
                            wind: `${current.wind.speed} km/h`,
                            humidity: `${current.main.humidity}%`,
                            pressure: `${current.main.pressure} mb`,
                            visibility: `${current.visibility / 1000} km`,
                        }}
                        sunrise={formatTime(getLocalDateTime(current.sys.sunrise, current.timezone))}
                        sunset={formatTime(getLocalDateTime(current.sys.sunset, current.timezone))}
                    />

                    <HourlyForecast hours={hourly} />
                </div>

                <div className="mt-5">
                    <DayParts parts={parts} />
                </div>

                <div className="mt-5">
                    <WeeklyForecast days={weekly} />
                </div>
            </div>
        </div>
    );
}

export default App;