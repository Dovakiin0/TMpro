import { Loader, MantineProvider, createEmotionCache } from "@mantine/core";
import { ThemeOptions } from "./config/ThemeOptions";
import { RouterProvider } from "react-router-dom";
import { router } from "./config/router";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const emotionCache = createEmotionCache({ key: "mantine", prepend: false });

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={ThemeOptions}
      emotionCache={emotionCache}
    >
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </MantineProvider>
  );
}

export default App;
