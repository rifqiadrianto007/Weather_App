export default function WeatherCard({ data }) {
    if (!data) return null;

    return (
        <div className="weather-main">
            <p className="city">{data.name}</p>

            <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt=""
            />

            <h1 className="temp">{Math.round(data.main.temp)}°</h1>
            <p className="desc">{data.weather[0].description}</p>
        </div>
    );
}
