import { useState, useEffect } from "react";

const DEFAULT_THEME = {
  backgroundColor:
    "linear-gradient(135deg, #0D0D0D 0%, #101820 50%, #30E0C6 100%)",
  componentColor: "23272A",
  fontColor: "#FFF",
};

export default function useUserTheme() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.backgroundColor && data.componentColor) {
          setTheme({
            backgroundColor: data.backgroundColor,
            componentColor: data.componentColor,
            fontColor: data.componentColor === "FFFFFF" ? "#000" : "#FFF",
          });
        }
      } catch (e) {
        console.error("Error fetching theme:", e);
        setTheme(DEFAULT_THEME);
      }
      setLoading(false);
    };
    fetchTheme();
  }, []);

  return [theme, setTheme, loading];
}