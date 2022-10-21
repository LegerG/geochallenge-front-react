import React from "react";
import { Box, Typography } from "@mui/material";
import { ResponseIcon } from "./";

interface ResultTextOverProps {
  answerValue: string;
  answerIsCorrect: boolean;
}

export const ResultTextOver: React.FC<ResultTextOverProps> = (props) => {
  const { answerValue, answerIsCorrect } = props;

  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        shadowBox: theme.shadows[2],
        border: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "space-between",
      })}
    >
      <ResponseIcon answerIsCorrect={answerIsCorrect} />

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

      <ResponseIcon answerIsCorrect={answerIsCorrect} />
    </Box>
  );
};
