import { Loader, MantineProvider, Text } from "@mantine/core";
import { ThemeOptions } from "./config/ThemeOptions";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={ThemeOptions}>
      <Suspense fallback={<Loader />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </MantineProvider>
  );
}

export default App;
