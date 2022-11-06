import { Box, CircularProgress, Grid, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FlagImage,
  GameStatistic,
  AnswerPopover as AnswerPopover,
  ResultsPopover,
  CountrySearch,
} from "../components";
import { TerritoryName } from "../models/country";
import {
  useLazyGetGameQuery,
  useGetTerritoryNamesQuery,
} from "../utils/territory.api";
import { ROOT_URL } from "../utils/urls";

export const UN_CODE = "gr_un";

export function Game() {
  const [index, setIndex] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [wrongAnswers, setWrongAnswers] = React.useState(0);
  const [currentAnswerIsCorrect, setCurrentAnswerIsCorrect] =
    React.useState<boolean>();
  const [isGameEnded, setIsGameEnded] = React.useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [trigger, gameResult] = useLazyGetGameQuery();
  const namesResult = useGetTerritoryNamesQuery({
    lang: i18n.language,
    group: UN_CODE,
  });

  React.useEffect(() => {
    trigger({ group: UN_CODE });
  }, []);

  const handleAnswer = (_, value: TerritoryName | null) => {
    if (!gameResult.data || !value) {
      return;
    }
    const isCorrect = value.code === gameResult.data[index].code;
    setCurrentAnswerIsCorrect(isCorrect);

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }

    setTimeout(() => {
      if (index < gameResult?.data?.length - 1) {
        setIndex(index + 1);
        setCurrentAnswerIsCorrect(undefined);
        return;
      }

      setIsGameEnded(true);
    }, 1000);
  };

  return (
    <Box sx={{ padding: "0.5rem" }}>
      {!gameResult.data || !namesResult.data ? (
        <Grid container justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <GameStatistic
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            currentAnswerIndex={index + 1}
            totalAnswer={gameResult.data.length ?? 0}
          />

          <FlagImage
            code={gameResult.data[index].code}
            popoverElement={
              isGameEnded ? (
                <ResultsPopover
                  correctAnswers={correctAnswers}
                  wrongAnswers={wrongAnswers}
                />
              ) : (
                <AnswerPopover
                  answerValue={
                    namesResult.data.find(
                      (tn: TerritoryName) =>
                        tn.code === gameResult?.data[index].code
                    )?.name ?? ""
                  }
                  answerIsCorrect={currentAnswerIsCorrect ?? false}
                />
              )
            }
            popoverOpen={currentAnswerIsCorrect !== undefined || isGameEnded}
          />
          {isGameEnded ? (
            <Button
              onClick={() => {
                navigate(ROOT_URL);
              }}
              variant="contained"
              sx={{ mt: 2 }}
            >
              {t("game.comebackHome")}
            </Button>
          ) : (
            <CountrySearch
              names={namesResult.data ?? []}
              onChange={handleAnswer}
            />
          )}
        </div>
      )}
    </Box>
  );
}
