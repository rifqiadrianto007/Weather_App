import { CloudRain, CloudLightning, Moon } from "lucide-react";

export default function DayParts() {
    return (
        <div className="dayparts">
            <div className="card">
                <h4>MORNING</h4>
                <CloudRain />
                <strong>22°C</strong>
                <span>Light Rain</span>
            </div>

            <div className="card">
                <h4>AFTERNOON</h4>
                <CloudLightning />
                <strong>24°C</strong>
                <span>Thunderstorm</span>
            </div>

            <div className="card">
                <h4>EVENING</h4>
                <Moon />
                <strong>19°C</strong>
                <span>Partly Cloudy</span>
            </div>
        </div>
    );
}
