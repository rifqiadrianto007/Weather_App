export default function HourlyForecast({ hours }) {
    return (
        <div className="rounded-3xl bg-white/20 p-6 h-70 flex flex-col justify-between">
            <h3 className="text-sm uppercase tracking-wide opacity-80">
                Hourly Forecast
            </h3>

            <div className="flex items-center justify-between mt-4">
                {hours.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2 text-[11px] opacity-85"
                        >
                            <Icon size={26} strokeWidth={1.5} className="opacity-90" />
                            <span>{item.time}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
