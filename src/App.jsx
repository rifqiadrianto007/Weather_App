import "./App.css";

import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DayParts from "./components/DayParts";
import WeeklyForecast from "./components/WeeklyForecast";

function App() {
    return (
        <div className="dashboard">
            <div className="grid">
                <CurrentWeather />
                <HourlyForecast />

                <DayParts />
            </div>

            <WeeklyForecast />
        </div>
    );
}

export default App;
