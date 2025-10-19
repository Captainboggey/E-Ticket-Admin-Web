import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CounterTickets from "../Pages/CounterTickets/CounterTickets";
import OnlineTickets from "../Pages/OnlineTickets/OnlineTickets";
import NewTickets from "../Pages/NewTickets/NewTickets";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/counterTickets",
        element: (
          <PrivateRoute>
            <CounterTickets></CounterTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/onlineTickets",
        element: (
          <PrivateRoute>
            <OnlineTickets></OnlineTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/newTickets",
        element: (
          <PrivateRoute>
            <NewTickets></NewTickets>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
