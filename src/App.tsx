import { Box } from "@mui/material";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FlagleAppBar } from "./components";
import { territoryApi } from "./utils/territory.api";
import "./App.css";

function App() {
  return (
    <ApiProvider api={territoryApi}>
      <FlagleAppBar />
      <Box id="outlet">
        <Outlet />
      </Box>
    </ApiProvider>
  );
}

export default App;
