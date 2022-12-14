import React from "react";
import { Box, Typography } from "@mui/material";
import { ResponseEmoji as ResponseEmoji } from ".";
import { PopoverWrapper } from "./PopoverWrapper";

interface AnswerPopoverProps {
  answerValue: string;
  answerIsCorrect: boolean;
}

export function AnswerPopover(props: AnswerPopoverProps) {
  const { answerValue, answerIsCorrect } = props;

  return (
    <PopoverWrapper>
      <Box
        sx={{
          display: "flex",
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
      </Box>
    </PopoverWrapper>
  );
}
