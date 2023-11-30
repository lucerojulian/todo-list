import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { THEME_CONFIG } from "./config/theme.config";
import { SWRConfig } from "swr";
import { API_URL } from "./constants/api";
import { Suspense, lazy } from "react";
import { Loader } from "./components/Loader";

const theme = createTheme(THEME_CONFIG);

const Home = lazy(() => import("./pages/Home.page"));

function App() {
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        refreshInterval: 0,
        fetcher: (path, init) =>
          fetch(API_URL + path, init).then((res) => res.json()),
      }}
    >
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box
          component="main"
          display="flex"
          flexDirection="column"
          gap="1rem"
          margin="auto"
          maxWidth="lg"
          padding={matches ? "4rem 2.5rem 6rem 2.5rem" : "2rem 1rem 6rem 1rem"}
        >
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        </Box>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
