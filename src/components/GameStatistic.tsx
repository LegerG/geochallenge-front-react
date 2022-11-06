import React from "react";
import { Grid, Typography } from "@mui/material";

interface GameStatisticProps {
  correctAnswers: number;
  wrongAnswers: number;
  currentAnswerIndex: number;
  totalAnswer?: number;
}

export function GameStatistic(props: GameStatisticProps) {
  const {
    correctAnswers,
    wrongAnswers,
    currentAnswerIndex: current,
    totalAnswer: total,
  } = props;

  return (
    <Grid container>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {current}/{total}
      </Typography>
      <Typography
        variant="h6"
        color="success.main"
        sx={{ alignSelf: "flex-end" }}
      >
        {correctAnswers}
      </Typography>
      <Typography variant="h6" sx={{ alignSelf: "flex-end" }}>
        /
      </Typography>
      <Typography variant="h6" color="error" sx={{ alignSelf: "flex-end" }}>
        {wrongAnswers}
      </Typography>
    </Grid>
  );
}
