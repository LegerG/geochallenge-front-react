import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { PopoverWrapper } from "./PopoverWrapper";

interface ResultsPopoverProps {
  correctAnswers: number;
  wrongAnswers: number;
}

export const ResultsPopover: React.FC<ResultsPopoverProps> = (props) => {
  const { correctAnswers, wrongAnswers } = props;

  const { t } = useTranslation();

  return (
    <PopoverWrapper direction="column">
      <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1 }}>
        {t("game.endGameTitle")}
      </Typography>

      <Typography
        variant="body1"
        color="success.main"
        sx={{ fontWeight: "bold" }}
      >
        {t("game.correctAnswer")} {correctAnswers}
      </Typography>
      <Typography variant="body1" color="error" sx={{ fontWeight: "bold" }}>
        {t("game.wrongAnswer")} {wrongAnswers}
      </Typography>
    </PopoverWrapper>
  );
};
