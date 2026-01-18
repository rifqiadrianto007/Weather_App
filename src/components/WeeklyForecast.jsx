import { Sun } from "lucide-react";

export default function WeeklyForecast() {
    return (
        <div className="week">
            {["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"].map(day => (
                <div className="card week-item" key={day}>
                    <p>{day}</p>
                    <Sun />
                    <strong>25°C</strong>
                    <span>16°C</span>
                </div>
            ))}
        </div>
    );
}
