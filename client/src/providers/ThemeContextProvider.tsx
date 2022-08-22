import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const localTheme = localStorage.getItem("theme");
  const [currentTheme, setCurrentTheme] = useState<string>(
    localTheme ? localTheme : "light"
  );

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    localStorage.setItem("theme", currentTheme);
  };

  const themeValue = () => ({
    primary: `var(--primary-${currentTheme})`,
    secondary: `var(--secondary-${currentTheme})`,
    accent: `var(--accent-${currentTheme})`,
    font: `var(--font-${currentTheme})`,
    error: `var(--error-${currentTheme})`,
    overlay: `var(--overlay-${currentTheme})`,
    toggleTheme,
  });

  return <ThemeProvider theme={themeValue}>{children}</ThemeProvider>;
}

export default ThemeContextProvider;
