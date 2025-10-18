import React, { useEffect, useState } from "react";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "./api/weather";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  // Fetch by city
  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const result = await fetchWeatherByCity(city);
      if (result.cod !== 200) {
        setError("❌ City not found. Please try again.");
        setWeather(null);
      } else {
        setWeather(result);
        setError("✅ Weather loaded successfully!");
        const forecastdata = await fetchForecastByCoords(
          result.coord.lat,
          result.coord.lon
        );
        setForecast(forecastdata);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Fetch using user's current location
  const handleUseLocation = () => {
    setError("");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const result = await fetchWeatherByCoords(latitude, longitude);
          setWeather(result);
          setError("✅ Local weather loaded successfully!");
          const forecastData = await fetchForecastByCoords(latitude, longitude);

          setForecast(forecastData);
        } catch (err) {
          setError("⚠️ Failed to fetch weather data for your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Could not get the location");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleUseLocation();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-800 to-cyan-500 flex justify-center items-center px-4">
      {error && error.trim() !== "" && (
        <div
          className={`fixed top-4 left-4 px-4 py-4 rounded-lg shadow-lg z-50 text-sm font-semibold transition-all duration-300
      ${
        error.includes("❌") || error.includes("⚠️")
          ? "bg-white text-black"
          : "bg-gray-800 text-white"
      }`}
        >
          {error}
        </div>
      )}

      {/* Weather card  */}
      <div className="w-full max-w-lg p-4 sm:p-7 shadow-2xl rounded">
        <div className="flex gap-2 items-center justify-center">
          <img
            src="weather.png"
            alt="weather icon"
            className="w-16 h-16 sm:w-20 sm:h-20 mt-1"
          />
          <h1 className="text-center text-white text-2xl font-bold mt-6 ">
            Weather Board
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-4 items-stretch">
          <input
            type="text"
            placeholder="Enter a city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            // 2. Remove mt-4 from the input
            className="bg-gray-600 outline-none rounded-lg p-3 text-white shadow-lg flex-1"
          />
          <button
            onClick={handleSearch}
            className="text-white hover:cursor-pointer flex items-center justify-center gap-1 hover:bg-black font-semiboldbold text-lg rounded-lg px-4 py-1 bg-yellow-500"
          >
            Search
            <img
              src="search-white.png"
              alt="search-white icon"
              className="w-8 h-8"
            />
          </button>
        </div>

        {/*loading*/}
        {loading && (
          <p className="text-white text-center mt-4 flex gap-2 items-center justify-center">
            <img src="loading.png" alt="loading icon" className="w-4 h-4" />
            Loading weather data...
          </p>
        )}

        {/*Weather display*/}
        {weather && !loading && (
          <div className="text-center text-white mt-4 font-bold">
            <h2 className="text-2xl font-bold">{weather.name}</h2>

            <div className="flex items-center flex-col">
              <img
                alt="weather icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl text-gray-800 font-bold">
                  {Math.round(weather.main.temp)}°C
                </p>
                <p className="capitalize">{weather.weather[0].description}</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mt-1">
              {new Date(weather.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/*3-day forecast*/}
            <h3 className="text-xl text-center font-medium mt-4">
              3-Day Forecast
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-5">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg flex items-center justify-center flex-col"
                >
                  <p className="font-semibold">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                  <img
                    alt="forecast icon"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    className="w-10 h-10"
                  />
                  <p className="font-semibold text-lg">
                    {Math.round(day.main.temp)}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/*Use my location button*/}
        <button
          onClick={handleUseLocation}
          className="group mt-5 hover:cursor-pointer font-medium w-full text-white text-lg rounded-full p-2 hover:bg-black bg-yellow-500 flex items-center justify-center gap-2"
        >
          <img
            src="location-pin.png"
            alt="location icon"
            className="w-6 h-6 group-hover:hidden"
          />
          <img
            src="location-yellow.png"
            alt="location icon yellow"
            className="w-6 h-6 hidden group-hover:inline"
          />
          Use my current location
        </button>
      </div>
    </div>
  );
}

export default App;
