import React from "react";
import { Box, Typography } from "@mui/material";
import { ResponseEmoji as ResponseEmoji } from ".";
import { PopoverWrapper } from "./PopoverWrapper";

interface AnswerPopoverProps {
  answerValue: string;
  answerIsCorrect: boolean;
}

export const AnswerPopover: React.FC<AnswerPopoverProps> = (props) => {
  const { answerValue, answerIsCorrect } = props;

  return (
    <PopoverWrapper>
      <ResponseEmoji answerIsCorrect={answerIsCorrect} />

      <Typography
        variant="body1"
        color={answerIsCorrect ? "success.main" : "error"}
        sx={{
          fontWeight: "bold",
          ml: 1,
          mr: 1,
        }}
      >
        {answerValue}
      </Typography>

      <ResponseEmoji answerIsCorrect={answerIsCorrect} />
    </PopoverWrapper>
  );
};
