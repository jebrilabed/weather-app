import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Autocomplete, TextField, Tooltip, IconButton, CircularProgress } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CITIES from "../utils/cities.js";

export default function SearchBar({ selectedCity, searchCity, detectLocation, locating, locationError, darkMode }) {
    const { i18n } = useTranslation();
    const [inputValue, setInputValue] = useState(selectedCity || "Gaza");

    const textColor = darkMode ? "#ffffff" : "#0a3f9e";
    const inputBg = darkMode ? "rgba(255,255,255,0.12)" : "rgba(10,63,158,0.05)";
    const borderColor = darkMode ? "rgba(255,255,255,0.4)" : "rgba(10,63,158,0.3)";
    const borderHover = darkMode ? "#ffffff" : "#0a3f9e";
    const labelColor = darkMode ? "rgba(255,255,255,0.7)" : "rgba(10,63,158,0.6)";
    const dropdownBg = darkMode ? "#0a3f9e" : "#ffffff";

    return (
        <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: 400, alignItems: "center" }}>
            <Autocomplete
                freeSolo
                options={CITIES}
                value={selectedCity}
                inputValue={inputValue}
                onInputChange={(_, val) => setInputValue(val)}
                onChange={(_, newValue) => { if (newValue) { searchCity(newValue); setInputValue(newValue); } }}
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
                                color: textColor,
                                borderRadius: "10px",
                                backgroundColor: inputBg,
                                transition: "background-color 0.3s ease",
                                "& fieldset": { borderColor: borderColor },
                                "&:hover fieldset": { borderColor: borderHover },
                                "&.Mui-focused fieldset": { borderColor: borderHover },
                            },
                            "& .MuiInputLabel-root": { color: labelColor },
                            "& .MuiInputLabel-root.Mui-focused": { color: textColor },
                            "& .MuiSvgIcon-root": { color: textColor },
                            "& input": { color: textColor },
                        }}
                    />
                )}
                componentsProps={{
                    paper: {
                        sx: {
                            bgcolor: dropdownBg,
                            color: textColor,
                            borderRadius: "10px",
                            transition: "background-color 0.3s ease",
                            "& .MuiAutocomplete-option": { color: textColor },
                            "& .MuiAutocomplete-option:hover": { backgroundColor: darkMode ? "rgba(255,255,255,0.15)" : "rgba(10,63,158,0.1)" },
                            "& .MuiAutocomplete-option[aria-selected='true']": { backgroundColor: darkMode ? "rgba(255,255,255,0.25) !important" : "rgba(10,63,158,0.2) !important" },
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
                            backgroundColor: inputBg,
                            border: `1px solid ${borderColor}`,
                            borderRadius: "10px",
                            color: locationError ? "#ff6b6b" : textColor,
                            width: 56,
                            height: 56,
                            transition: "background-color 0.3s ease",
                            "&:hover": { backgroundColor: darkMode ? "rgba(255,255,255,0.22)" : "rgba(10,63,158,0.15)", borderColor: borderHover },
                        }}
                    >
                        {locating
                            ? <CircularProgress size={22} sx={{ color: textColor }} />
                            : <MyLocationIcon />}
                    </IconButton>
                </span>
            </Tooltip>
        </div>
    );
}
