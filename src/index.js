import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Favourites from "./components/Favourites";

// Create browser router with routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "fav",
    element: <Favourites />,
  },
]);

// Create MUI theme
const theme = createTheme({
  palette: {
    primar: {
      main: "#031e87",
    },
    secondary: {
      main: "#2e74c9",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
});

// Create root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Redux Provider to provide the store to the app */}
    <Provider store={store}>
      {/* MUI ThemeProvider to provide the theme to the app */}
      <ThemeProvider theme={theme}>
        {/* React Router Provider to provide routing to the app */}
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals();
