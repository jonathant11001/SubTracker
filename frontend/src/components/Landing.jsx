import React from "react";
import TopLandingNav from "./navbar/TopLandingNav";
import welcome from "../assets/SubTrackerWelcome.png";

const Landing = () => {
  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6] min-h-screen text-white">
      <TopLandingNav />
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <img src={welcome} alt="Mascot" className="w-70 mb-6" />
        <h1 className="text-4xl text-teal-300 font-bold mb-4">SubTracker</h1>
        <p className="text-lg text-teal-200 mb-6">
          Track your Subscriptions with Ease
        </p>
        <button className="bg-teal-400 hover:bg-teal-300 text-black font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;