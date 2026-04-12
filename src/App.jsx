import "./styles/App.css";
import { Container, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getWeather, getWeatherByCoords } from "./api/weather.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";
dayjs.extend(utc);

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LanguageToggle from "./components/LanguageToggle";

const buildTheme = (dark) =>
  createTheme({
    typography: {
      fontFamily: ["appFont", "sans-serif"],
      allVariants: {
        color: dark ? "#ffffff" : "#0a3f9e",
      },
    },
  });

function App() {
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Gaza");
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [apiError, setApiError] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("weatherDarkMode");
    if (saved !== null) {
      return saved === "true";
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem("weatherDarkMode", darkMode);
  }, [darkMode]);

  const theme = buildTheme(darkMode);

  // Colour tokens (kept necessary ones)
  const bg = darkMode ? "#0048ca" : "#f0f4f8";

  const searchCity = (city) => {
    const trimmed = city.trim();
    if (trimmed) setSelectedCity(trimmed);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(i18n.language === "ar" ? "المتصفح لا يدعم تحديد الموقع" : "Geolocation not supported");
      return;
    }
    setLocating(true);
    setLocationError("");
    setApiError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          .then((data) => {
            setWeather(data);
            setSelectedCity(data.name);
            setApiError("");
            setLocating(false);
          })
          .catch(() => {
            setLocationError(i18n.language === "ar" ? "تعذّر جلب الطقس" : "Failed to get weather");
            setWeather(null);
            setLocating(false);
          });
      },
      () => {
        setLocationError(i18n.language === "ar" ? "تم رفض الوصول إلى الموقع" : "Location access denied");
        setLocating(false);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    setApiError("");
    getWeather(selectedCity)
      .then((data) => {
        setWeather(data);
        setApiError("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setApiError(i18n.language === "ar" ? "تعذر العثور على المدينة أو حدث خطأ في الاتصال." : "City not found or network error.");
        setWeather(null);
        setLoading(false);
      });
  }, [selectedCity, i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: bg,
          minHeight: "100vh",
          width: "100%",
          transition: "background-color 0.3s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            direction: i18n.language === "ar" ? "rtl" : "ltr",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: { xs: 2, sm: 3 },
            gap: 2,
          }}
        >
          <SearchBar
            selectedCity={selectedCity}
            searchCity={searchCity}
            detectLocation={detectLocation}
            locating={locating}
            locationError={locationError}
            darkMode={darkMode}
          />

          <WeatherCard
            weather={weather}
            loading={loading}
            darkMode={darkMode}
            error={apiError}
          />

          <LanguageToggle
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
