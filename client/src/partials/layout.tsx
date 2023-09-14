import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

function layout({}: Props) {
  return (
    <div>
      layout
      <Outlet />
    </div>
  );
}

export default layout;
