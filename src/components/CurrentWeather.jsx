import {
    Wind,
    Droplets,
    Gauge,
    Eye,
    Sunrise,
    Sunset,
} from "lucide-react";

export default function CurrentWeather({
    day,
    date,
    temp,
    description,
    Icon,
    details,
    sunrise,
    sunset,
}) {
    return (
        <div className="rounded-3xl bg-white/20 p-6 h-70 flex flex-col justify-between">
            <div>
                <h1 className="text-[34px] font-light uppercase tracking-wide">
                    {day}
                </h1>
                <p className="text-sm opacity-80 mt-1">{date}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <p className="text-[52px] font-light leading-none">
                        {temp}°
                    </p>
                    <p className="text-sm opacity-80 mt-2 capitalize">
                        {description}
                    </p>
                </div>
                <Icon size={80} className="opacity-90 sm:size-24" />
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-[11px] opacity-80">
                <div className="flex items-center gap-2">
                    <Wind size={14} /> Wind: {details.wind}
                </div>
                <div className="flex items-center gap-2">
                    <Droplets size={14} /> Humidity: {details.humidity}
                </div>
                <div className="flex items-center gap-2">
                    <Gauge size={14} /> Pressure: {details.pressure}
                </div>
                <div className="flex items-center gap-2">
                    <Eye size={14} /> Visibility: {details.visibility}
                </div>
            </div>

            <div className="flex justify-between text-[11px] opacity-80">
                <div className="flex items-center gap-2">
                    <Sunrise size={14} /> {sunrise}
                </div>
                <div className="flex items-center gap-2">
                    <Sunset size={14} /> {sunset}
                </div>
            </div>
        </div>
    );
}
