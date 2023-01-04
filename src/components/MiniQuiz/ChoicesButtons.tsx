import { Box, Button, Skeleton } from "@mui/material";
import { MiniQuizChoices } from "./MiniQuiz";
import { TerritoryName } from "../../models/country";
import React, { useState, useRef } from "react";

const gapSize = "0.5rem";

function getButtonColor(
  isSolutionRevealed: boolean,
  isCorrect: boolean
): "primary" | "success" | "error" {
  return isSolutionRevealed ? (isCorrect ? "success" : "error") : "primary";
}

interface ChoicesButtonsProps {
  choices: MiniQuizChoices;
  correctAnswer: TerritoryName;
  onClick: (choice: TerritoryName) => void;
}

function ChoicesButtons(props: ChoicesButtonsProps) {
  const { choices, correctAnswer, onClick } = props;

  const [isSolutionRevealed, setIsSolutionRevealed] = useState(false);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: gapSize,
        gap: gapSize,
        justifyContent: "space-between",
        width: "100%",
        "& > *": {
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      }}
    >
      {choices
        ? choices.map((choice, index) => (
            <Button
              key={choice.code}
              ref={(el) => {
                if (el !== null) {
                  buttonRefs.current[index] = el;
                }
              }}
              color={getButtonColor(
                isSolutionRevealed,
                choice.code === correctAnswer.code
              )}
              variant="outlined"
              onClick={() => {
                if (!isSolutionRevealed) {
                  setIsSolutionRevealed(true);
                  setTimeout(() => {
                    setIsSolutionRevealed(false);
                    onClick(choice);
                  }, 500);
                }
              }}
            >
              {choice.name}
            </Button>
          ))
        : ["", "", ""].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height="45px" />
          ))}
    </Box>
  );
}

export default ChoicesButtons;
