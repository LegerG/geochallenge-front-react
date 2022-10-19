import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FlagleAppBar } from "./components";
import { territoryApi } from "./utils/territory.api";

function App() {
  return (
    <ApiProvider api={territoryApi}>
      <FlagleAppBar />
      <Outlet />
    </ApiProvider>
  );
}

export default App;
