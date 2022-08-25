import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

export interface ThemeValue {
  primary: string;
  secondary: string;
  accent: string;
  font: string;
  fontDimmed: string;
  error: string;
  overlay: string;
  toggleTheme: VoidFunction;
}

function resetDocumentTheme(theme: string) {
  document.documentElement.style.setProperty(
    "background-color",
    `var(--primary-${theme})`
  );
  document.documentElement.style.setProperty("color", `var(--font-${theme})`);
}

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const localTheme = localStorage.getItem("theme");
  const [currentTheme, setCurrentTheme] = useState<string>(
    localTheme ? localTheme : "light"
  );
  resetDocumentTheme(currentTheme);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    resetDocumentTheme(currentTheme);
  };

  const themeValue = () => ({
    primary: `var(--primary-${currentTheme})`,
    secondary: `var(--secondary-${currentTheme})`,
    accent: `var(--accent-${currentTheme})`,
    font: `var(--font-${currentTheme})`,
    fontDimmed: `var(--font-dimmed-${currentTheme})`,
    error: `var(--error-${currentTheme})`,
    overlay: `var(--overlay-${currentTheme})`,
    shadow: `var(--shadow-${currentTheme})`,
    toggleTheme,
  });

  return <ThemeProvider theme={themeValue}>{children}</ThemeProvider>;
}

export default ThemeContextProvider;
