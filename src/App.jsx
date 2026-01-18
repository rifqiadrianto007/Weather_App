import { useEffect, useMemo, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react"
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

    /* ================= FETCHING ================= */

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

    /* ================= TIME & MODE ================= */

    const localDate = useMemo(
        () => current ? getLocalDateTime(current.dt, current.timezone) : new Date(),
        [current]
    );

    const night = useMemo(
        () => isNightTime(localDate),
        [localDate]
    );

    /* ================= WEATHER STATE ================= */

    const weatherMain = current?.weather[0]?.main || "";

    const isStorm =
        weatherMain === "Rain" || weatherMain === "Thunderstorm";

    const particleType = useMemo(() => {
        if (weatherMain === "Snow") return "snow";
        if (weatherMain === "Rain" || weatherMain === "Thunderstorm") return "rain";
        return null;
    }, [weatherMain]);

    const CurrentIcon = useMemo(
        () => getWeatherIcon(weatherMain),
        [weatherMain]
    );

    /* ================= DATA MAPPING ================= */

    const hourly = useMemo(
        () =>
            forecast?.list ? forecast.list.slice(0, 6).map((item) => ({
                time: new Date(item.dt_txt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                }),
                icon: getWeatherIcon(item.weather[0].main),
            })) : [],
        [forecast]
    );

    const parts = useMemo(
        () =>
            forecast?.list ? [2, 5, 7].map((i, idx) => ({
                label: ["Morning", "Afternoon", "Evening"][idx],
                temp: Math.round(forecast.list[i].main.temp),
                desc: forecast.list[i].weather[0].description,
                icon: getWeatherIcon(forecast.list[i].weather[0].main),
            })) : [],
        [forecast]
    );

    const weekly = useMemo(() => {
        if (!forecast?.list) return [];

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
                max: Math.round(Math.max(...items.map((i) => i.main.temp_max))),
                min: Math.round(Math.min(...items.map((i) => i.main.temp_min))),
                icon: getWeatherIcon(items[0].weather[0].main),
            }));
    }, [forecast]);

    if (!current || !forecast) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading weather...
            </div>
        );
    }

    /* ================= UI ================= */

    return (
        <div
            className={`min-h-screen w-full flex items-center justify-center transition-colors duration-700
        ${night
                    ? "bg-linear-to-br from-slate-900 via-blue-900 to-indigo-900"
                    : "bg-linear-to-br from-sky-400 to-blue-700"
                }`}
        >
            <div
                className={`relative w-full max-w-275 mx-auto rounded-4xl p-4 sm:p-6 text-white overflow-hidden transition-colors duration-700
          ${night
                        ? "bg-linear-to-b from-blue-900 to-indigo-900"
                        : "bg-linear-to-b from-sky-500 to-blue-600"
                    }`}
            >
                {/* PARTICLES */}
                <WeatherParticles type={particleType} />

                {/* HEADER INFO: CITY + DATETIME */}
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h2 className="text-xl font-light tracking-wide">
                            {city}
                        </h2>
                        <p className="text-sm opacity-80">
                            {formatDay(localDate)}, {formatDate(localDate)}
                        </p>
                    </div>

                    <p className="text-sm opacity-80">
                        Local time: <span className="font-medium">{formatTime(localDate)}</span>
                    </p>
                </div>

                {/* SEARCH */}
                <SearchBar onSearch={fetchByCity} />

                {/* TOP GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-5">
                    <AnimatedCard key={city}>
                        <CurrentWeather
                            day={formatDay(localDate)}
                            date={formatDate(localDate)}
                            temp={Math.round(current.main.temp)}
                            description={current.weather[0].description}
                            Icon={CurrentIcon}
                            storm={isStorm}
                            details={{
                                wind: `${current.wind.speed} km/h`,
                                humidity: `${current.main.humidity}%`,
                                pressure: `${current.main.pressure} mb`,
                                visibility: `${current.visibility / 1000} km`,
                            }}
                            sunrise={formatTime(
                                getLocalDateTime(current.sys.sunrise, current.timezone)
                            )}
                            sunset={formatTime(
                                getLocalDateTime(current.sys.sunset, current.timezone)
                            )}
                        />
                    </AnimatedCard>

                    <AnimatedCard delay={0.1}>
                        <HourlyForecast hours={hourly} />
                    </AnimatedCard>
                </div>

                {/* MIDDLE */}
                <AnimatedCard delay={0.2}>
                    <div className="mt-5">
                        <DayParts parts={parts} />
                    </div>
                </AnimatedCard>

                {/* BOTTOM */}
                <AnimatedCard delay={0.3}>
                    <div className="mt-5">
                        <WeeklyForecast days={weekly} />
                    </div>
                </AnimatedCard>
            </div>
        </div>
    );
}

export default App;