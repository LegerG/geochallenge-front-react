import React from "react";
import { Button, Grid } from "@mui/material";
import { MiniQuiz } from "../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";

export function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item sx={{ width: "100%", padding: "0.5rem" }}>
        <MiniQuiz />
      </Grid>

      <Grid
        item
        alignSelf="center"
        sx={{ marginTop: "2rem" }}
        onClick={() => {
          navigate("/game");
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PublicIcon />}
          endIcon={<PublicIcon />}
        >
          {t("app.newGame")}
        </Button>
      </Grid>
    </Grid>
  );
}
