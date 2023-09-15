import { MantineProvider, createEmotionCache } from "@mantine/core";
import { ThemeOptions } from "./config/ThemeOptions";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Loader from "./components/Loader";

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
