import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/SubTrackerLogo.png";

const TopMainNav = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#0C1B2A] shadow-md">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="text-teal-400 text-3xl font-bold">SubTracker</span>
      </div>
      <div className="space-x-8 text-m">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/subscription" className="hover:underline">
          Subscriptions
        </Link>
        <Link to="/account" className="hover:underline">
          Account
        </Link>
      </div>
    </nav>
  );
};

export default TopMainNav;