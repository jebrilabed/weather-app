import "./App.css";
import CloudIcon from "@mui/icons-material/Cloud";
import { Container } from "@mui/material";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import Button from "@mui/material/Button";

dayjs.locale("ar");

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
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=31.5017&lon=34.4668&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      )
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: { xs: 2, sm: 3 },
        }}
      >
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
                  fontSize: { xs: 40, sm: 50, md: 70 },
                  fontWeight: "500",
                  padding: "0",
                  textAlign: "end",
                }}
              >
                {t(weather ? weather.name : "Loading...")}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  textAlign: "center",
                  marginBottom: { xs: "-10px", md: "-30px" },
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
                }}
              >
                {i18n.language === "ar"
                  ? toArabicNumerals(
                      dayjs().locale("ar").format("dddd, D MMMM YYYY HH:mm"),
                    )
                  : dayjs().locale("en").format("dddd, D MMMM YYYY HH:mm")}
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
                    {loading
                      ? t("Loading...")
                      : weather
                        ? i18n.language === "ar"
                          ? toArabicNumerals(
                              Math.round(weather.main.temp - 273.15).toString(),
                            )
                          : Math.round(weather.main.temp - 273.15).toString()
                        : ""}
                  </Typography>
                  <img
                    src={`https://openweathermap.org/payload/api/media/file/${weather ? weather.weather[0].icon : ""}.png`}
                    alt="Weather Icon"
                  />
                </div>
                <Typography
                  sx={{
                    marginTop: { xs: "-10px", sm: "-12px", md: "-15px" },
                    fontSize: { xs: 20, sm: 23, md: 25 },
                    fontWeight: "400",
                  }}
                >
                  {t(
                    loading
                      ? "Loading..."
                      : weather
                        ? weather.weather[0].description
                        : "",
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
                    {loading
                      ? `${t("min")}: ${t("Loading...")}`
                      : weather
                        ? `${t("min")}: ${
                            i18n.language === "ar"
                              ? toArabicNumerals(
                                  Math.round(
                                    weather.main.temp_min - 273.15,
                                  ).toString(),
                                )
                              : Math.round(
                                  weather.main.temp_min - 273.15,
                                ).toString()
                          }`
                        : ""}
                  </Typography>
                  <Typography>|</Typography>
                  <Typography>
                    {loading
                      ? `${t("max")}: ${t("Loading...")}`
                      : weather
                        ? `${t("max")}: ${
                            i18n.language === "ar"
                              ? toArabicNumerals(
                                  Math.round(
                                    weather.main.temp_max - 273.15,
                                  ).toString(),
                                )
                              : Math.round(
                                  weather.main.temp_max - 273.15,
                                ).toString()
                          }`
                        : ""}
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  width: { xs: "100%", sm: "50%" },
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                <CloudIcon
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
