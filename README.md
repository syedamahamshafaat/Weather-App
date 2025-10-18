Weather-app

A clean and simple weather application built with React and Tailwind CSS. It allows users to get real-time weather information for any city or use their current location to get local weather updates.


Features:
- Search by City: Find weather information for any city in the world.
- Geolocation: Use your current location to get instant local weather data.
- Current Weather: Displays the current temperature, weather condition (e.g., "clear sky"), and a corresponding icon.
- 3-Day Forecast: Shows a simplified forecast for the next three days, including the day of the week, icon, and temperature.
- Responsive Design: A clean user interface that works on both desktop and mobile devices.
- Dynamic UI: Interactive elements like hover effects and loading indicators for a smooth user experience.

Technologies Used:

- React: A JavaScript library for building user interfaces.
- Vite: A modern frontend build tool that provides a faster and leaner development experience.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- OpenWeatherMap API: Used to fetch weather and forecast data.

Getting Started

Follow these instructions to get a local copy of the project up and running.

Prerequisites:

Make sure you have the following installed on your machine:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

Installation:

1. Clone the repository
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. Navigate to the project directory
    ```sh
    cd Task-7-WeatherApp
    ```

3. Install NPM packages
    ```sh
    npm install
    ```

4.  Set up environment variables:

    You'll need an API key from OpenWeatherMap.

    Create a `.env` file in the root of your project and add your API key like this:
    ```env
    VITE_WEATHER_APP_KEY=your_api_key_here
    ```
    

5.  Start the development server
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

Usage

1. Search for a City: Type a city name into the search bar and click the "Search" button or press `Enter`.
2. Use Current Location: Click the "Use my current location" button to allow the browser to access your location and fetch local weather data.
3. View Weather Data: The current weather and 3-day forecast will be displayed on the card below the search bar.
