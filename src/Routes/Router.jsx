import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CounterTickets from "../Pages/CounterTickets/CounterTickets";
import OnlineTickets from "../Pages/OnlineTickets/OnlineTickets";
import NewTickets from "../Pages/NewTickets/NewTickets";
import UsedTickets from "../Pages/UsedTickets/UsedTickets";
import TotalTickets from "../Pages/TotalTickets/TotalTickets";
import CounterNewTickets from "../Pages/CounterNewTickets/CounterNewTickets";
import CounterUsedTickets from "../Pages/CounterUsedTickets/CounterUsedTickets";
import CounterTotalTickets from "../Pages/CounterTotalTickets/CounterTotalTickets";
import CounterCreateTicket from "../Pages/CounterCreateTicket/CounterCreateTicket";

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
      {
        path: "/usedTickets",
        element: (
          <PrivateRoute>
            <UsedTickets></UsedTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/totalTickets",
        element: (
          <PrivateRoute>
            <TotalTickets></TotalTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/counterNewTickets",
        element: (
          <PrivateRoute>
            <CounterNewTickets></CounterNewTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/counterUsedTickets",
        element: (
          <PrivateRoute>
            <CounterUsedTickets></CounterUsedTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/counterTotalTickets",
        element: (
          <PrivateRoute>
            <CounterTotalTickets></CounterTotalTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "/counterCreateTicket",
        element: (
          <PrivateRoute>
            <CounterCreateTicket></CounterCreateTicket>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
