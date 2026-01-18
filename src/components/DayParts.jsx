import { memo } from "react";
export default memo(function DayParts({ parts }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {parts.map((part, index) => {
                const Icon = part.icon;
                return (
                    <div key={index} className="rounded-3xl bg-white/20 p-5 h-45 flex flex-col items-center justify-between">
                        <h4 className="text-xs uppercase tracking-wider opacity-80">
                            {part.label}
                        </h4>
                        <Icon size={40} strokeWidth={1.4} />
                        <p className="text-[32px] font-light">{part.temp}°</p>
                        <p className="text-[11px] opacity-80 capitalize">{part.desc}</p>
                    </div>
                );
            })}
        </div>
    );
});
