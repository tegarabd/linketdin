import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthenticationContextProvider from "./providers/AuthenticationContextProvider";
import BackendServiceContextProvider from "./providers/BackendServiceContextProvider";
import BuildProviderTree from "./tools/BuildProviderTree";
import ThemeContextProvider from "./providers/ThemeContextProvider";
import "./index.css";

const Providers = BuildProviderTree([
  BrowserRouter,
  BackendServiceContextProvider,
  AuthenticationContextProvider,
  ThemeContextProvider,
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
