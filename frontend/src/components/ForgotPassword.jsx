import React, { useState } from "react";
import TopLandingNav from "./navbar/TopLandingNav";
import mascot from "../assets/SubTrackerWave.png"; 

const ForgotPassword = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${VITE_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset link sent! Check your email.");
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setMessage("Network error.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#1A1A2E] min-h-screen text-white flex flex-col">
      <TopLandingNav />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <img src={mascot} alt="Mascot" className="w-32" />

        <h1 className="text-4xl text-teal-400 font-bold mb-8">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg text-black">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button className="bg-blue-500 text-white text-lg font-semibold px-4 py-3 rounded w-full hover:bg-blue-600 transition">
            Send Request
          </button>
          {message && <div className="mt-4 text-center text-teal-600">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;