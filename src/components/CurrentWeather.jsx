import { Cloud } from "lucide-react";

export default function CurrentWeather() {
    return (
        <div className="card current">
            <h1>MONDAY</h1>
            <p>APRIL 19</p>

            <div className="current-main">
                <div>
                    <h2>18°C</h2>
                    <span>Partly Cloudy</span>
                </div>
                <Cloud size={90} strokeWidth={1.2} />
            </div>
        </div>
    );
}
