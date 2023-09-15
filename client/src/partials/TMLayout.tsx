import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function TMLayout() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

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
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          className="bg-blend-darken"
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div className="flex items-center h-full">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div className="w-28 ">
              <Image src="/full.png" />
            </div>
          </div>
        </Header>
      }
    >
      <div className="m-5">
        <Outlet />
      </div>
    </AppShell>
  );
}
