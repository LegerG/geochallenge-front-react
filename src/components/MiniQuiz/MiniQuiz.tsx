import React from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetTerritoryNamesQuery } from "../../utils/territory.api";
import { FlagImage } from "..";
import { TerritoryName } from "../../models/country";
import { getRandomElement } from "../../utils/arrayTools";
import { UN_CODE } from "../../pages";
import ChoicesButtons from "./ChoicesButtons";

export type MiniQuizChoices = [TerritoryName, TerritoryName, TerritoryName];
const gapSize = "0.5rem";

export function MiniQuiz() {
  const { t, i18n } = useTranslation();

  const { data } = useGetTerritoryNamesQuery({
    lang: i18n.language,
    group: UN_CODE,
  });

  const [choices, setChoices] = React.useState<MiniQuizChoices>();
  const [correctAnswer, setCorrectAnswer] = React.useState<TerritoryName>();

  const resetMiniQuiz = () => {
    if (data) {
      let choices: MiniQuizChoices = [
        getRandomElement(data),
        getRandomElement(data),
        getRandomElement(data),
      ];
      setChoices(choices);
      setCorrectAnswer(getRandomElement(choices));
    }
  };

  React.useEffect(() => {
    if (data) {
      resetMiniQuiz();
    }
  }, [data]);

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

      <ChoicesButtons
        choices={choices}
        correctAnswer={correctAnswer}
        onClick={() => resetMiniQuiz()}
      />
    </Box>
  );
}
