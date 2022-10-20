import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h4">{t("app.about")}</Typography>
      <Typography variant="body1">{t("app.aboutText")}</Typography>
      <Typography variant="h4">{t("about.thanks")}</Typography>
      <a
        href="https://www.flaticon.com/free-icon/flag_473724?term=flag&related_id=473724"
        title="flag icons"
      >
        Flag favicon created by Freepik - Flaticon
      </a>
    </Box>
  );
};
