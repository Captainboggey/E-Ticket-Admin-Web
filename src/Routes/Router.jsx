import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../Pages/Register/Register";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Register></Register>,
      },
    ],
  },
]);
