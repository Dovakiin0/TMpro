import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("../app/Home"));
const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Login = React.lazy(() => import("../app/Login"));
const Register = React.lazy(() => import("../app/Register"));
const Error = React.lazy(() => import("../components/Error"));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
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
