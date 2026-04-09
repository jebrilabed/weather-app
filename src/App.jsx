import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Container } from "@mui/material";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";
dayjs.extend(utc);
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getWeather, getWeatherByCoords } from "../api/weather.js";
import CITIES from "./cities.js";





// Function to convert Western digits to Arabic numerals
const toArabicNumerals = (str) => {
  const arabicNumerals = "٠١٢٣٤٥٦٧٨٩";
  return str.replace(/[0-9]/g, (d) => arabicNumerals[d]);
};

const theme = createTheme({
  mode: "dark", // يفضل استخدام الوضع الداكن
  text: {
    primary: "#ffffff",
    secondary: "#ffffff",
  },
  typography: {
    fontFamily: ["appFont", "sans-serif"],
    allVariants: {
      color: "#ffffff",
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Gaza");
  const [inputValue, setInputValue] = useState("Gaza");
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

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
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          .then((data) => {
            setWeather(data);
            setSelectedCity(data.name);
            setLocating(false);
          })
          .catch(() => {
            setLocationError(i18n.language === "ar" ? "تعذّر جلب الطقس" : "Failed to get weather");
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
    getWeather(selectedCity)
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }, [selectedCity]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: { xs: 2, sm: 3 },
          gap: 2,
        }}
      >
        {/* City Search + Location Button */}
        <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: 400, alignItems: "center" }}>
          <Autocomplete
            freeSolo
            options={CITIES}
            value={selectedCity}
            inputValue={inputValue}
            onInputChange={(_, val) => setInputValue(val)}
            onChange={(_, newValue) => { if (newValue) { setSelectedCity(newValue); setInputValue(newValue); } }}
            disableClearable
            sx={{ flex: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={i18n.language === "ar" ? "ابحث عن أي مدينة" : "Search any city"}
                variant="outlined"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); searchCity(inputValue); } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.4)" },
                    "&:hover fieldset": { borderColor: "#ffffff" },
                    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                  },
                  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
                  "& .MuiSvgIcon-root": { color: "#ffffff" },
                  "& input": { color: "#ffffff" },
                }}
              />
            )}
            componentsProps={{
              paper: {
                sx: {
                  bgcolor: "#0a3f9e",
                  color: "#ffffff",
                  borderRadius: "10px",
                  "& .MuiAutocomplete-option": { color: "#ffffff" },
                  "& .MuiAutocomplete-option:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                  "& .MuiAutocomplete-option[aria-selected='true']": { backgroundColor: "rgba(255,255,255,0.25) !important" },
                },
              },
            }}
          />
          <Tooltip
            title={locationError || (i18n.language === "ar" ? "تحديد موقعي" : "Detect my location")}
            arrow
          >
            <span>
              <IconButton
                onClick={detectLocation}
                disabled={locating}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "10px",
                  color: locationError ? "#ff6b6b" : "#ffffff",
                  width: 56,
                  height: 56,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.22)", borderColor: "#ffffff" },
                }}
              >
                {locating
                  ? <CircularProgress size={22} sx={{ color: "#ffffff" }} />
                  : <MyLocationIcon />}
              </IconButton>
            </span>
          </Tooltip>
        </div>
        <Card
          sx={{
            padding: { xs: 1, sm: 2 },
            minWidth: 275,
            width: "100%",
            backgroundColor: "#0a3f9e",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent sx={{ padding: { xs: "16px", sm: "8px" } }}>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: { xs: "0 5px", sm: "0 10px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 48, sm: 58, md: 68 },
                  fontWeight: "500",
                  padding: "0",
                  textAlign: "end",
                }}
              >
                {loading || !weather ? (
                  <div className="skeleton" style={{ width: "140px", height: "52px" }} />
                ) : (
                  t(weather.name)
                )}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center",
                  marginBottom: { xs: "-10px", md: "-30px" },
                  fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.4rem" },
                }}
              >
                {loading || !weather ? (
                  <div className="skeleton" style={{ width: "200px", height: "22px", marginTop: "4px" }} />
                ) : i18n.language === "ar" ? (
                  toArabicNumerals(
                    dayjs.utc().add(weather.timezone, "second").locale("ar").format("dddd, D MMMM HH:mm")
                  )
                ) : (
                  dayjs.utc().add(weather.timezone, "second").locale("en").format("dddd, D MMMM HH:mm")
                )}
              </Typography>
            </div>
            <div
              style={{
                width: "104%",
                height: "1.6px",
                background: "white",
                margin: "-10px",
              }}
            ></div>

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-around",
                padding: { xs: "5px", sm: "10px" },
                textAlign: "center",
              }}
            >
              <div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    gap: 5,
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#ffffff",
                    height: { xs: "80px", sm: "110px" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 60, sm: 80, md: 100 },
                      fontWeight: "500",
                      padding: "0",
                    }}
                  >
                    {loading || !weather ? (
                      <div className="skeleton" style={{ width: "90px", height: "80px", borderRadius: "12px" }} />
                    ) : i18n.language === "ar" ? (
                      toArabicNumerals(Math.round(weather.main.temp).toString())
                    ) : (
                      Math.round(weather.main.temp).toString()
                    )}
                  </Typography>
                  {loading || !weather ? null : (
                    <img
                      src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                  )}
                </div>
                <Typography
                  sx={{
                    marginTop: { xs: "-10px", sm: "-12px", md: "-15px" },
                    fontSize: { xs: 20, sm: 23, md: 25 },
                    fontWeight: "400",
                  }}
                >
                  {loading || !weather ? (
                    <div className="skeleton" style={{ width: "120px", height: "24px", margin: "4px auto" }} />
                  ) : (
                    t(weather.weather[0].description)
                  )}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    marginTop: "15px",
                    gap: { xs: 5, sm: 10 },
                    justifyContent: "space-around",
                    alignItems: "center",
                    color: "#ffffff",
                  }}
                >
                  <Typography>
                    {loading || !weather ? (
                      <div className="skeleton" style={{ width: "70px", height: "18px" }} />
                    ) : (
                      `${t("min")}: ${i18n.language === "ar" ? toArabicNumerals(Math.round(weather.main.temp_min).toString()) : Math.round(weather.main.temp_min).toString()}`
                    )}
                  </Typography>
                  {!loading && weather && <Typography>|</Typography>}
                  <Typography>
                    {loading || !weather ? (
                      <div className="skeleton" style={{ width: "70px", height: "18px" }} />
                    ) : (
                      `${t("max")}: ${i18n.language === "ar" ? toArabicNumerals(Math.round(weather.main.temp_max).toString()) : Math.round(weather.main.temp_max).toString()}`
                    )}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                <CloudIcon
                  className={loading ? "loading-cloud" : ""}
                  sx={{
                    fontSize: { xs: 120, sm: 150, md: 180 },
                    marginTop: { xs: 5, sm: 4 },
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          onClick={() =>
            i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
          }
          sx={{
            mt: 3,
            minWidth: 100,
            color: "#0a3f9e",
            backgroundColor: "#ffffff",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {i18n.language === "ar" ? "English" : "العربية"}
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
