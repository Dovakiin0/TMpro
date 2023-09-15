import { useState } from "react";
import { AppShell, useMantineTheme, Navbar, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function TMLayout() {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={<Header />}
    >
      <div className="m-5">
        <Outlet />
      </div>
    </AppShell>
  );
}
