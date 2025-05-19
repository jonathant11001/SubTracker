import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_THEME = {
  backgroundColor: "linear-gradient(135deg, #0D0D0D 0%, #101820 50%, #30E0C6 100%)",
  componentColor: "23272A",
  fontColor: "#FFF",
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setTheme(DEFAULT_THEME);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.backgroundColor && data.componentColor) {
          setTheme({
            backgroundColor: data.backgroundColor,
            componentColor: data.componentColor,
            fontColor: data.componentColor === "FFFFFF" ? "#000" : "#FFF",
          });
        } else {
          setTheme(DEFAULT_THEME);
        }
      } catch {
        setTheme(DEFAULT_THEME);
      }
      setLoading(false);
    };
    fetchTheme();
  }, []);

  const updateTheme = async (newTheme) => {
    setTheme(newTheme);
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(`${VITE_API_URL}/api/users/theme`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          backgroundColor: newTheme.backgroundColor,
          componentColor: newTheme.componentColor,
        }),
      });
    }
  };

  const value = {
    theme,
    setTheme: updateTheme,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}