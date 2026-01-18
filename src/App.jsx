import {
    CloudSun,
    Sun,
    Cloud,
    CloudRain,
    CloudLightning,
} from "lucide-react";

import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DayParts from "./components/DayParts";
import WeeklyForecast from "./components/WeeklyForecast";

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-400 to-blue-700">
            <div className="w-275 rounded-4xl p-6 bg-linear-to-b from-sky-500 to-blue-600 text-white">

                <div className="grid grid-cols-[420px_1fr] gap-5">
                    <CurrentWeather
                        day="Monday"
                        date="April 19"
                        temp={18}
                        description="Partly Cloudy"
                        Icon={CloudSun}
                        details={{
                            wind: "5 km/h",
                            humidity: "65%",
                            pressure: "1009 mb",
                            visibility: "5 km",
                        }}
                        sunrise="07:24"
                        sunset="19:15"
                    />

                    <HourlyForecast
                        hours={[
                            { time: "10 AM", icon: Sun },
                            { time: "11 AM", icon: Cloud },
                            { time: "12 PM", icon: CloudRain },
                            { time: "1 PM", icon: CloudRain },
                            { time: "2 PM", icon: Cloud },
                            { time: "3 PM", icon: Sun },
                        ]}
                    />
                </div>

                <div className="mt-5">
                    <DayParts
                        parts={[
                            { label: "Morning", temp: 22, desc: "Light Rain", icon: CloudRain },
                            { label: "Afternoon", temp: 24, desc: "Storm", icon: CloudLightning },
                            { label: "Evening", temp: 19, desc: "Cloudy", icon: CloudSun },
                        ]}
                    />
                </div>

                <div className="mt-5">
                    <WeeklyForecast
                        days={[
                            { day: "Sat", max: 25, min: 16, icon: Sun },
                            { day: "Sun", max: 26, min: 17, icon: Cloud },
                            { day: "Mon", max: 24, min: 15, icon: CloudRain },
                            { day: "Tue", max: 23, min: 14, icon: Cloud },
                            { day: "Wed", max: 25, min: 16, icon: Sun },
                            { day: "Thu", max: 27, min: 18, icon: Sun },
                            { day: "Fri", max: 26, min: 17, icon: Cloud },
                        ]}
                    />
                </div>

            </div>
        </div>
    );
}

export default App;
