import { useTranslation } from "react-i18next";
import { Button, IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function LanguageToggle({ darkMode, setDarkMode }) {
  const { i18n } = useTranslation();
  const textColor = darkMode ? "#ffffff" : "#0a3f9e";
  const borderColor = darkMode ? "rgba(255,255,255,0.4)" : "rgba(10,63,158,0.3)";

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "24px" }}>
      <Button
        variant="contained"
        onClick={() =>
          i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar")
        }
        sx={{
          minWidth: 100,
          color: darkMode ? "#0a3f9e" : "#ffffff",
          backgroundColor: darkMode ? "#ffffff" : "#0a3f9e",
          fontWeight: "bold",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {i18n.language === "ar" ? "English" : "العربية"}
      </Button>
      <Tooltip title={darkMode ? (i18n.language === "ar" ? "الوضع الفاتح" : "Light mode") : (i18n.language === "ar" ? "الوضع الداكن" : "Dark mode")} arrow>
        <IconButton
          onClick={() => setDarkMode((prev) => !prev)}
          sx={{
            backgroundColor: darkMode ? "rgba(255,255,255,0.15)" : "rgba(10,63,158,0.1)",
            border: `1px solid ${borderColor}`,
            borderRadius: "10px",
            color: textColor,
            width: 44,
            height: 44,
            transition: "background-color 0.3s ease, color 0.3s ease",
            "&:hover": { backgroundColor: darkMode ? "rgba(255,255,255,0.25)" : "rgba(10,63,158,0.2)" },
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}
