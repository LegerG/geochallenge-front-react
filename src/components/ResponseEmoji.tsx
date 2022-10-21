import React from "react";
import { Typography } from "@mui/material";

interface ResponseIconProps {
  answerIsCorrect: boolean;
}

export const ResponseEmoji: React.FC<ResponseIconProps> = (props) => {
  const { answerIsCorrect } = props;

  return (
    <Typography variant="body1">{answerIsCorrect ? "🎉" : "❌"}</Typography>
  );
};
