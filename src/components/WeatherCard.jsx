import { useTranslation } from "react-i18next";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import dayjs from "dayjs";

const toArabicNumerals = (str) => {
    const arabicNumerals = "٠١٢٣٤٥٦٧٨٩";
    return str.replace(/[0-9]/g, (d) => arabicNumerals[d]);
};

export default function WeatherCard({ weather, loading, darkMode, error }) {
    const { t, i18n } = useTranslation();

    const cardBg = darkMode ? "#0a3f9e" : "#ffffff";
    const textColor = darkMode ? "#ffffff" : "#0a3f9e";
    const dividerColor = darkMode ? "white" : "#0a3f9e";

    return (
        <Card
            sx={{
                padding: { xs: 1, sm: 2 },
                minWidth: 275,
                width: "100%",
                backgroundColor: cardBg,
                borderRadius: "12px",
                boxShadow: darkMode ? "0 4px 8px rgba(0,0,0,0.2)" : "0 8px 32px rgba(10,63,158,0.12)",
                transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
        >
            <CardContent sx={{ padding: { xs: "16px", sm: "8px" } }}>
                {error && !loading ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "250px", padding: "20px" }}>
                        <Typography component="div" sx={{ fontSize: 24, fontWeight: "500", color: darkMode ? "#ff9999" : "#d32f2f", textAlign: "center" }}>
                            {error}
                        </Typography>
                    </div>
                ) : (
                    <>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                                padding: { xs: "0 5px", sm: "0 10px" },
                            }}
                        >
                            <Typography
                                component="div"
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
                                background: dividerColor,
                                margin: "-10px",
                                transition: "background 0.3s ease",
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
                                        color: textColor,
                                        height: { xs: "80px", sm: "110px" },
                                    }}
                                >
                                    <Typography
                                        component="div"
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
                                    component="div"
                                    sx={{
                                        marginTop: { xs: "-10px", sm: "-12px", md: "-15px" },
                                        fontSize: { xs: 20, sm: 23, md: 25 },
                                        fontWeight: "400",
                                    }}
                                >
                                    {loading || !weather ? (
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                            <CircularProgress size={20} sx={{ color: textColor }} />
                                            <span>{i18n.language === "ar" ? "جاري التحميل..." : "Loading..."}</span>
                                        </div>
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
                                        color: textColor,
                                    }}
                                >
                                    <Typography component="div">
                                        {loading || !weather ? (
                                            <div className="skeleton" style={{ width: "70px", height: "18px" }} />
                                        ) : (
                                            `${t("min")}: ${i18n.language === "ar" ? toArabicNumerals(Math.round(weather.main.temp_min).toString()) : Math.round(weather.main.temp_min).toString()}`
                                        )}
                                    </Typography>
                                    {!loading && weather && <Typography>|</Typography>}
                                    <Typography component="div">
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
                                    color: textColor,
                                }}
                            >
                                {loading || !weather ? (
                                    <CircularProgress size={90} sx={{ marginTop: { xs: 5, sm: 4 }, color: textColor, opacity: 0.6 }} />
                                ) : (
                                    <CloudIcon
                                        sx={{
                                            fontSize: { xs: 120, sm: 150, md: 180 },
                                            marginTop: { xs: 5, sm: 4 },
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
