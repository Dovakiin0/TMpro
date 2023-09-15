import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("../app/Home"));
const TMLayout = React.lazy(() => import("../partials/TMLayout"));
const Login = React.lazy(() => import("../app/Login"));
const Register = React.lazy(() => import("../app/Register"));
const Error = React.lazy(() => import("../components/Error"));

export const router = createBrowserRouter([
  {
    element: <TMLayout />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
