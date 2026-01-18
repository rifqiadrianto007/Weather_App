import { memo } from "react";
export default memo(function WeeklyForecast({ days }) {
    return (
        <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
            {days.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div key={index} className="rmin-w-[110px] rounded-2xl bg-white/20 p-4 h-37.5 flex flex-col items-center justify-between">
                        <p className="text-xs uppercase tracking-wide opacity-80">
                            {item.day}
                        </p>
                        <Icon size={28} strokeWidth={1.4} />
                        <div className="text-center">
                            <p className="text-sm font-light">{item.max}°</p>
                            <p className="text-[11px] opacity-70">{item.min}°</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});