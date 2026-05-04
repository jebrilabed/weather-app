import { useTranslation } from "react-i18next";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
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
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: 0, sm: "1rem" },
                                alignItems: { xs: "flex-start", sm: "center" },
                                justifyContent: "space-between",
                                padding: { xs: "0 5px", sm: "0 10px" },
                                mb: 1
                            }}
                        >
                            <Typography
                                component="div"
                                sx={{
                                    fontSize: { xs: 36, sm: 48, md: 60 },
                                    fontWeight: "600",
                                    padding: "0",
                                    lineHeight: 1.1,
                                    wordBreak: "break-word",
                                    maxWidth: "100%"
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
                                    textAlign: { xs: "start", sm: "center" },
                                    fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.3rem" },
                                    opacity: 0.8,
                                    mt: { xs: 0.5, sm: 0 }
                                }}
                            >
                                {loading || !weather ? (
                                    <div className="skeleton" style={{ width: "120px", height: "20px", marginTop: "4px" }} />
                                ) : i18n.language === "ar" ? (
                                    toArabicNumerals(
                                        dayjs.utc().add(weather.timezone, "second").locale("ar").format("dddd, D MMMM HH:mm")
                                    )
                                ) : (
                                    dayjs.utc().add(weather.timezone, "second").locale("en").format("dddd, D MMMM HH:mm")
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: "calc(100% + 32px)",
                                height: "1.5px",
                                background: dividerColor,
                                margin: "0 -16px",
                                transition: "background 0.3s ease",
                                opacity: 0.6
                            }}
                        ></Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                width: "100%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                padding: { xs: "10px 5px", sm: "10px" },
                                textAlign: "center",
                                gap: { xs: 2, sm: 0 }
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Box
                                    sx={{
                                        marginTop: { xs: 1, sm: 2 },
                                        display: "flex",
                                        gap: 1,
                                        textAlign: "center",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: textColor,
                                    }}
                                >
                                    <Typography
                                        component="div"
                                        sx={{
                                            fontSize: { xs: 60, sm: 70, md: 90 },
                                            fontWeight: "600",
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
                                    <span style={{ fontSize: "2rem", alignSelf: "flex-start", marginTop: "1rem" }}>°</span>
                                    {loading || !weather ? null : (
                                        <img
                                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                            alt="Weather Icon"
                                            style={{ width: "100px", height: "100px" }}
                                        />
                                    )}
                                </Box>
                                <Typography
                                    component="div"
                                    sx={{
                                        marginTop: { xs: "-5px", sm: "-10px" },
                                        fontSize: { xs: 20, sm: 22, md: 24 },
                                        fontWeight: "400",
                                        textTransform: "capitalize"
                                    }}
                                >
                                    {loading || !weather ? (
                                        <Box style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                            <CircularProgress size={20} sx={{ color: textColor }} />
                                            <span>{i18n.language === "ar" ? "جاري التحميل..." : "Loading..."}</span>
                                        </Box>
                                    ) : (
                                        t(weather.weather[0].description)
                                    )}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        marginTop: "15px",
                                        gap: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        color: textColor,
                                        opacity: 0.9
                                    }}
                                >
                                    <Typography component="div" sx={{ fontSize: "0.9rem" }}>
                                        {loading || !weather ? (
                                            <div className="skeleton" style={{ width: "70px", height: "18px" }} />
                                        ) : (
                                            `${t("min")}: ${i18n.language === "ar" ? toArabicNumerals(Math.round(weather.main.temp_min).toString()) : Math.round(weather.main.temp_min).toString()}°`
                                        )}
                                    </Typography>
                                    {!loading && weather && <Typography sx={{ mx: 0.5 }}>|</Typography>}
                                    <Typography component="div" sx={{ fontSize: "0.9rem" }}>
                                        {loading || !weather ? (
                                            <div className="skeleton" style={{ width: "70px", height: "18px" }} />
                                        ) : (
                                            `${t("max")}: ${i18n.language === "ar" ? toArabicNumerals(Math.round(weather.main.temp_max).toString()) : Math.round(weather.main.temp_max).toString()}°`
                                        )}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    width: { xs: "100%", sm: "40%" },
                                    textAlign: "center",
                                    color: textColor,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                {loading || !weather ? (
                                    <CircularProgress size={80} sx={{ mt: 2, color: textColor, opacity: 0.6 }} />
                                ) : (
                                    <CloudIcon
                                        sx={{
                                            fontSize: { xs: 100, sm: 130, md: 160 },
                                            opacity: 0.9,
                                            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))"
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
