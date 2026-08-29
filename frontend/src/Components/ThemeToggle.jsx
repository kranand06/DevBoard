import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // Load saved theme or default to light
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Apply theme to <html>
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${theme}`);

    // Save preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 rounded bg-primary text-theme-1 hover:bg-hover transition"
    >
      {theme === "light" ? "☀️" : "🌙"}
    </button>
  );
}
