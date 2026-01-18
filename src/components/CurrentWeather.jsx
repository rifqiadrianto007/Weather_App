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

            {/* HEADER */}
            <div>
                <h1 className="text-[34px] font-light tracking-wide uppercase">
                    {day}
                </h1>
                <p className="text-sm opacity-80 mt-1">
                    {date}
                </p>
            </div>

            {/* MAIN */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[52px] font-light leading-none">
                        {temp}°
                    </p>
                    <p className="text-sm opacity-80 mt-2">
                        {description}
                    </p>
                </div>

                <Icon size={96} strokeWidth={1.25} className="opacity-90" />
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-y-2 text-[11px] opacity-80 mt-3">
                <div className="flex items-center gap-2">
                    <Wind size={14} />
                    <span>Wind: {details.wind}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets size={14} />
                    <span>Humidity: {details.humidity}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Gauge size={14} />
                    <span>Pressure: {details.pressure}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Eye size={14} />
                    <span>Visibility: {details.visibility}</span>
                </div>
            </div>

            {/* SUN */}
            <div className="flex justify-between text-[11px] opacity-80">
                <div className="flex items-center gap-2">
                    <Sunrise size={14} />
                    <span>{sunrise}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Sunset size={14} />
                    <span>{sunset}</span>
                </div>
            </div>
        </div>
    );
}
