const APP_KEY = import.meta.env.VITE_WEATHER_APP_KEY;

const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to parse the error message from the API, or use a default.
    const errorData = await response.json().catch(() => ({
      message: "An unknown API error occurred.",
    }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// City Search
export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}&units=metric`
  );
  return handleResponse(response);
};

// Current location Weather
export const fetchWeatherByCoords = async (lat, lon) => {
  if (!APP_KEY) {
    throw new Error("VITE_WEATHER_APP_KEY is not configured. See README.md.");
  }
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric`
  );
  return handleResponse(response);
};

// 3-day Forecast
export const fetchForecastByCoords = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_KEY}&units=metric`
  );
  const data = await handleResponse(response);

  if (!data.list) return [];

  // ✅ Filter out forecasts that occur around noon (12:00:00)
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  // ✅ Keep only the first 3 days
  const threeDayForecast = dailyForecasts.slice(0, 3);

  return threeDayForecast;
};
