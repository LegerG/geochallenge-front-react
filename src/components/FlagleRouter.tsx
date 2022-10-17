import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Game } from "../pages";
import App from "../App";
import { GAME_URL, HOME_URL, ROOT_URL } from "../utils/urls";

export const FlagleRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: ROOT_URL,
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: HOME_URL,
          element: <Home />,
        },
        {
          path: GAME_URL,
          element: <Game />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
