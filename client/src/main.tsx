import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthenticationProvider from "./contexts/AuthenticationProvider";
import BackendServiceProvider from "./contexts/BackendServiceProvider";
import BuildProviderTree from "./tools/BuildProviderTree";
import "./index.css";

const Providers = BuildProviderTree([
  BrowserRouter,
  BackendServiceProvider,
  AuthenticationProvider,
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
