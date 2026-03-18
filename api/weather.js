import axios from "axios";

export async function getWeather(city = "Gaza") {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!API_KEY) {
    throw new Error("API key not found. Please set VITE_OPENWEATHER_API_KEY in your environment variables.");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
