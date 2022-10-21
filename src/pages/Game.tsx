import { AnchorSharp } from "@mui/icons-material";
import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FlagImage,
  GameStatistic,
  AnswerPopover as AnswerPopover,
  ResultsPopover,
} from "../components";
import { TerritoryName } from "../models/country";
import {
  useGetNewGameQuery,
  useGetTerritoryNamesQuery,
  useGetTrainingGameQuery,
} from "../utils/territory.api";
import { ROOT_URL } from "../utils/urls";

export const Game: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [wrongAnswers, setWrongAnswers] = React.useState(0);
  const [currentAnswerIsCorrect, setCurrentAnswerIsCorrect] =
    React.useState<boolean>();
  const [value, setValue] = React.useState<string>("");
  const [isGameEnded, setIsGameEnded] = React.useState(false);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const gameResult = useGetTrainingGameQuery({
    size: 1,
  });
  const namesResult = useGetTerritoryNamesQuery({ lang: i18n.language });

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
        setValue("");
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
                      (n) => n.code === gameResult?.data[index].code
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
            <Autocomplete
              options={namesResult.data}
              renderOption={(props, option) => (
                <li {...props}>{option.name}</li>
              )}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("game.countrySearch")}
                  variant="outlined"
                  autoFocus
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    onInput(event: React.ChangeEvent<HTMLInputElement>) {
                      if (event) {
                        setValue(event.target.value);
                      }
                    },
                  }}
                />
              )}
              autoComplete
              inputValue={value}
              onChange={handleAnswer}
              sx={{ mt: 2 }}
              autoSelect
              fullWidth
              autoHighlight
              clearIcon={null}
              clearOnEscape
            />
          )}
        </div>
      )}
    </Box>
  );
};
