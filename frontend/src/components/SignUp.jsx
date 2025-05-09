import React from "react";
import TopLandingNav from "./navbar/TopLandingNav";
import mascot from "../assets/SubTrackerWave.png"; 
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#1A1A2E] min-h-screen text-white flex flex-col">
      <TopLandingNav />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <img src={mascot} alt="Mascot" className="w-32" />

        <h1 className="text-4xl text-teal-400 font-bold mb-6">Sign Up</h1>

        <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg text-black">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="name"
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button className="bg-blue-500 text-white text-lg font-semibold px-4 py-3 rounded w-full hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-300">
          <Link to="/forgotPassword" className="hover:underline">
            Forgot password?
          </Link>
          <span className="mx-2">|</span>
          <Link to="/login" className="hover:underline">
            Have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;