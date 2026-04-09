import axios from "axios";

const API_KEY = () => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) throw new Error("API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.");
  return key;
};

export async function getWeather(city = "Gaza") {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY()}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

export async function getWeatherByCoords(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY()}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
