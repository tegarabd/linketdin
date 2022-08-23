import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const localTheme = localStorage.getItem("theme");
  const [currentTheme, setCurrentTheme] = useState<string>(
    localTheme ? localTheme : "light"
  );
  document.documentElement.style.setProperty(
    "background-color",
    `var(--primary-${currentTheme})`
  );
  document.documentElement.style.setProperty(
    "color",
    `var(--font-${currentTheme})`
  );

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    document.documentElement.style.setProperty(
      "background-color",
      `var(--primary-${currentTheme})`
    );
    document.documentElement.style.setProperty(
      "color",
      `var(--font-${currentTheme})`
    );
  };

  const themeValue = () => ({
    primary: `var(--primary-${currentTheme})`,
    secondary: `var(--secondary-${currentTheme})`,
    accent: `var(--accent-${currentTheme})`,
    font: `var(--font-${currentTheme})`,
    fontDimmed: `var(--font-dimmed-${currentTheme})`,
    error: `var(--error-${currentTheme})`,
    overlay: `var(--overlay-${currentTheme})`,
    toggleTheme,
  });

  return <ThemeProvider theme={themeValue}>{children}</ThemeProvider>;
}

export default ThemeContextProvider;
