import React, { useState, useEffect } from "react";
import TopMainNav from "./navbar/TopMainNav";
import useUserTheme from "../hooks/useUserTheme";

const COLORS = [
  { name: "Mint Breeze", backgroundColor: "linear-gradient(135deg, #E6FFFA 0%, #30E0C6 100%)", group: "Light", componentColor: "FFFFFF" },
  { name: "Sky Fade", backgroundColor: "linear-gradient(135deg, #F0F9FF 0%, #87CEEB 100%)", group: "Light", componentColor: "FFFFFF" },
  { name: "Sakura Bloom", backgroundColor: "linear-gradient(135deg, #FFF5F7 0%, #FFB7C5 100%)", group: "Light", componentColor: "FFFFFF" },
  { name: "Cyber Teal", backgroundColor: "linear-gradient(135deg, #0D0D0D 0%, #101820 50%, #30E0C6 100%)", group: "Dark", componentColor: "23272A" },
  { name: "Shadow Drift", backgroundColor: "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #101010 100%)", group: "Dark", componentColor: "23272A" },
  { name: "Neon Eclipse", backgroundColor: "linear-gradient(135deg, #242124 0%, #5A4FCF 100%)", group: "Dark", componentColor: "23272A" },
];

const Account = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [theme, setTheme] = useUserTheme();
  const [password, setPassword] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [limit, setLimit] = useState();

  useEffect(() => {
    if (theme && theme.backgroundColor && COLORS.length > 0) {
      const match = COLORS.find(
        c => c.backgroundColor === theme.backgroundColor
      );
      if (match) {
        setSelectedColor(match);
      }
    }
  }, [theme]);

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${VITE_API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.limit !== undefined) {
          setLimit(data.limit);
        }
      } catch (err) {
        setMessage("Failed to fetch limit.");
      }
    };
    fetchLimit();
  }, []);

  useEffect(() => {
    if (selectedColor) {
      const updateTheme = async () => {
        try {
          const token = localStorage.getItem("token");
          await fetch(`${VITE_API_URL}/api/users/theme`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              backgroundColor: selectedColor.backgroundColor,
              componentColor: selectedColor.componentColor,
            }),
          });
        } catch (err) {
          setMessage("Failed to update background color.");
        }
      };
      updateTheme();
    }
  }, [selectedColor]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleChangePassword = async () => {
    if (!password || password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${VITE_API_URL}/api/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password changed!");
        setPassword("");
      } else {
        setMessage(data.error || "Failed to change password.");
      }
    } catch (err) {
      setMessage("Failed to change password.");
    }
  };

  const handleChangeLimit = async () => {
    if (!inputValue || isNaN(Number(inputValue)) || Number(inputValue) < 0) {
      setMessage("Please enter a valid limit.");
      return;
    }
    setLimit(Number(inputValue));
    setMessage("Limit changed!");
    setInputValue("");

    try {
      const token = localStorage.getItem("token");
      await fetch(`${VITE_API_URL}/api/users/limit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ limit: Number(inputValue) }),
      });
    } catch (err) {
      setMessage("Failed to update limit on server.");
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setMessage(`Background set to ${color.name}`);
    const updateTheme = async () => {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${VITE_API_URL}/api/users/theme`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            backgroundColor: color.backgroundColor,
            componentColor: color.componentColor,
          }),
        });
        setTheme({
          backgroundColor: color.backgroundColor,
          componentColor: color.componentColor,
        });
      } catch (err) {
        setMessage("Failed to update background color.");
      }
    };
    updateTheme();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.backgroundColor,
        transition: "background 0.5s",
      }}
      className="text-white"
    >
      <TopMainNav />
      <div
        className="max-w-3xl mx-auto mt-10 rounded shadow-lg p-8"
        style={{
          background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
          color: theme.componentColor === "FFFFFF" ? "#000" : "#FFF"
        }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 border-b border-gray-400 pb-6">
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>
          <div className="flex items-center space-x-2 text-black">
            <input
              type="password"
              className="bg-gray-200 px-4 py-2 rounded w-64"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              className="bg-teal-400 text-black px-4 py-2 rounded font-semibold hover:bg-teal-500"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-400 pb-6">
          <h2 className="text-xl font-semibold mb-2">Change Limit</h2>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className="bg-gray-200 px-4 py-2 rounded w-64 text-black"
              placeholder={limit !== undefined && limit !== null ? limit.toString() : "Set your limit"}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button
              className="bg-teal-400 text-black px-4 py-2 rounded font-semibold hover:bg-teal-500"
              onClick={handleChangeLimit}
            >
              Change Limit
            </button>
          </div>
        </div>

        {/* Set Background Color */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Set Background Color</h2>
          <div className="mb-2 font-semibold">Light</div>
          <div className="flex flex-wrap gap-6 mb-6">
            {COLORS.filter(c => c.group === "Light").map((color) => (
              <div key={color.name} className="flex flex-col items-center">
                <button
                  className={`w-24 h-12 rounded-lg border-2 mb-1 ${selectedColor && selectedColor.name === color.name ? "border-teal-400" : "border-gray-300"}`}
                  style={{
                    background: color.backgroundColor,
                  }}
                  onClick={() => handleColorSelect(color)}
                />
                <span className="text-xs text-center">{color.name}</span>
              </div>
            ))}
          </div>
          <div className="mb-2 font-semibold">Dark</div>
          <div className="flex flex-wrap gap-6">
            {COLORS.filter(c => c.group === "Dark").map((color) => (
              <div key={color.name} className="flex flex-col items-center">
                <button
                  className={`w-24 h-12 rounded-lg border-2 mb-1 ${selectedColor && selectedColor.name === color.name ? "border-teal-400" : "border-gray-300"}`}
                  style={{
                    background: color.backgroundColor,
                  }}
                  onClick={() => handleColorSelect(color)}
                />
                <span className="text-xs text-center">{color.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <span className="text-green-600 font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Account;