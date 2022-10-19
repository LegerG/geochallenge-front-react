import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetTerritoryNamesQuery } from "../utils/territory.api";
import { FlagImage } from "./";
import { TerritoryName } from "../models/country";

const getRandomElement = <T extends unknown>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getButtonColor = (
  buttonValue: TerritoryName,
  correctAnswer?: TerritoryName,
  answer?: TerritoryName
): "primary" | "success" | "error" => {
  if (answer === undefined || answer !== buttonValue) {
    return "primary";
  }

  if (answer === correctAnswer) {
    return "success";
  }
  return "error";
};

export const MiniQuiz: React.FC = (props) => {
  const { t, i18n } = useTranslation();
  const { data } = useGetTerritoryNamesQuery({
    lang: i18n.language,
  });
  const [choices, setChoices] = React.useState<TerritoryName[]>([]);
  const [correctAnswer, setCorrectAnswer] = React.useState<TerritoryName>();
  const [answer, setAnswer] = React.useState<TerritoryName>();

  const gapSize = "0.5rem";

  const resetMiniQuiz = () => {
    if (data) {
      let choices = shuffleArray(data).slice(0, 3);
      setChoices(choices);
      setCorrectAnswer(getRandomElement(choices));
    }
  };

  React.useEffect(() => {
    if (data) {
      console.log("data", data);
      resetMiniQuiz();
    }
  }, [data]);

  React.useEffect(() => {
    if (answer !== undefined) {
      setTimeout(() => {
        setAnswer(undefined);
      }, 500);
    } else {
      resetMiniQuiz();
    }
  }, [answer]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box>
        <Typography variant="h6">{t("home.miniQuizTitle")}</Typography>
      </Box>
      <Box
        sx={{
          marginTop: gapSize,
          width: "100%",
        }}
      >
        <FlagImage code={correctAnswer?.code} />
      </Box>
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
        {choices.map((choice) => (
          <Button
            key={choice.code}
            variant={answer === choice ? "contained" : "outlined"}
            color={getButtonColor(choice, correctAnswer, answer)}
            onClick={() => {
              setAnswer(choice);
            }}
          >
            {choice.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
