import React from "react";
import { Grid } from "@mui/material";
import { MiniQuiz } from "../components/MiniQuiz";

export const Home: React.FC = () => {
  return (
    <Grid container direction="column" justifyContent="center">
      <Grid item sx={{ width: "100%", padding: "0.5rem" }}>
        <MiniQuiz />
      </Grid>
    </Grid>
  );
};
