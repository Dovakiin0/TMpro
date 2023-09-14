import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("../app/Home"));
const Layout = React.lazy(() => import("../partials/layout"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
