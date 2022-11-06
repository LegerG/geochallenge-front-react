import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { PopoverWrapper } from "./PopoverWrapper";

interface ResultsPopoverProps {
  correctAnswers: number;
  wrongAnswers: number;
}

export function ResultsPopover(props: ResultsPopoverProps) {
  const { correctAnswers, wrongAnswers } = props;

  const { t } = useTranslation();

  return (
    <PopoverWrapper>
      <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
        {t("game.endGame.title")}
      </Typography>

      <Typography
        variant="body1"
        color="success.main"
        paragraph
        sx={{ fontWeight: "bold" }}
      >
        {t("game.endGame.correctAnswers", { correctAnswers })}
      </Typography>

      <Typography paragraph color="error" sx={{ fontWeight: "bold" }}>
        {t("game.endGame.wrongAnswers", { wrongAnswers })}
      </Typography>

      <Typography paragraph sx={{ fontWeight: "bold" }}>
        {t("game.endGame.percentage", {
          percentage: (100 * correctAnswers) / (correctAnswers + wrongAnswers),
        })}
      </Typography>
    </PopoverWrapper>
  );
}
