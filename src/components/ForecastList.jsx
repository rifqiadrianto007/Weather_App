export default function ForecastList({ data }) {
    if (!data) return null;

    const daily = data.list.filter((_, i) => i % 8 === 0);

    return (
        <div className="forecast-row">
            {daily.slice(0, 4).map((item, i) => (
                <div className="forecast-item" key={i}>
                    <p>{new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt=""
                    />
                    <span>{Math.round(item.main.temp)}°</span>
                </div>
            ))}
        </div>
    );
}