import { AnchorSharp } from "@mui/icons-material";
import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlagImage, GameStatistic } from "../components";
import { TerritoryName } from "../models/country";
import {
  useGetNewGameQuery,
  useGetTerritoryNamesQuery,
} from "../utils/territory.api";

export const Game: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [wrongAnswers, setWrongAnswers] = React.useState(0);
  const [currentAnswerIsCorrect, setCurrentAnswerIsCorrect] =
    React.useState<boolean>();
  const [value, setValue] = React.useState<string>("");

  const { t, i18n } = useTranslation();
  const gameResult = useGetNewGameQuery();
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
      setIndex(index + 1);
      setValue("");
      setCurrentAnswerIsCorrect(undefined);
    }, 1000);
  };

  React.useEffect(() => {
    if (gameResult && namesResult && gameResult.data && namesResult.data) {
      console.log(currentAnswerIsCorrect);
      console.log(
        namesResult.data.find((n) => n.code === gameResult.data[index].code)
      );
    }
  }, [currentAnswerIsCorrect]);

  return (
    <Box sx={{ padding: "0.5rem" }}>
      {!gameResult.data || !namesResult.data ? (
        <Grid container justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      ) : (
        <div>
          <GameStatistic
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            currentAnswerIndex={index}
            totalAnswer={gameResult.data.length ?? 0}
          />

          <FlagImage
            code={gameResult.data[index].code}
            answerValue={
              namesResult.data.find(
                (n) => n.code === gameResult?.data[index].code
              )?.name ?? ""
            }
            answerIsCorrect={currentAnswerIsCorrect}
          />

          <Autocomplete
            options={namesResult.data}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
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
            sx={{ marginTop: "0.5rem" }}
            autoSelect
            fullWidth
            autoHighlight
            clearIcon={null}
            clearOnEscape
          />
        </div>
      )}
    </Box>
  );
};
