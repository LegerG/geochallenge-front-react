import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Game } from "../pages";
import App from "../App";
import { GAME_URL, HOME_URL, ROOT_URL, ABOUT_URL } from "../utils/urls";
import { About } from "../pages/About";

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
        {
          path: ABOUT_URL,
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
