import React from "react";
import { Typography } from "@mui/material";

interface ResponseIconProps {
  answerIsCorrect: boolean;
}

export function ResponseEmoji(props: ResponseIconProps) {
  const { answerIsCorrect } = props;

  return (
    <Typography variant="body1">{answerIsCorrect ? "🎉" : "❌"}</Typography>
  );
}
