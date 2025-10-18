const APP_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

// City Search
export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}&units=metric`
  );
  return await response.json();
};

// Current location Weather
export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric`
  );
  return await response.json();
};

// 3-day Forecast
export const fetchForecastByCoords = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric`
  );
  const data = await response.json();

  if (!data.list) return [];

  // ✅ Filter out forecasts that occur around noon (12:00:00)
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  // ✅ Keep only the first 3 days
  const threeDayForecast = dailyForecasts.slice(0, 3);

  return threeDayForecast;
};
