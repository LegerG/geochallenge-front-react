import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: "0.5rem" }}>
      <Typography variant="h5" sx={{ mt: "0.5rem" }}>
        {t("app.about")}
      </Typography>
      <Typography>{t("about.aboutText")}</Typography>

      <Typography variant="h5" sx={{ mt: "0.5rem" }}>
        {t("about.thanks")}
      </Typography>
      <a
        href="https://www.flaticon.com/free-icon/flag_473724?term=flag&related_id=473724"
        title="flag icons"
      >
        Flag favicon created by Freepik - Flaticon
      </a>
    </Box>
  );
}
