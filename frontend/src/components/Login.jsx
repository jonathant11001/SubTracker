import React, { useState } from "react";
import TopLandingNav from "./navbar/TopLandingNav";
import mascot from "../assets/SubTrackerWave.png"; 
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#1A1A2E] min-h-screen text-white flex flex-col">
      <TopLandingNav />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <img src={mascot} alt="Mascot" className="w-32" />
        <h1 className="text-4xl text-teal-400 font-bold mb-8">Log In</h1>
        <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg text-black" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white text-lg font-semibold px-4 py-3 rounded w-full hover:bg-blue-600 transition text-center block"
            type="submit"
          > 
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-300">
          <Link to="/forgotPassword" className="hover:underline">
            Forgot password?
          </Link>
          <span className="mx-2">|</span>
          <Link to="/signUp" className="hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;