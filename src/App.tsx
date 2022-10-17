import React from "react";
import { Outlet } from "react-router-dom";
import { FlagleAppBar } from "./components";

function App() {
  return (
    <>
      <FlagleAppBar />
      <Outlet />
    </>
  );
}

export default App;
