const API_KEY = "1e84ebc2782552744fe066b25d7fb509";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return res.json();
}

export async function getForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  return res.json();
}
