import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/SubTrackerLogo.png";

const TopLandingNav = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#0C1B2A] shadow-md">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-teal-400 text-xl font-bold">SubTracker</span>
        </Link>
      </div>
      <div className="space-x-6 text-sm">
        <Link to="/about" className="hover:underline">
          About
        </Link>
        <Link to="/login" className="hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default TopLandingNav;