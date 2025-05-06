import React from "react";
import TopLandingNav from "./navbar/TopLandingNav";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6] min-h-screen text-white">
        <TopLandingNav />
        <h1 className="text-3xl font-bold mb-4">About SubTracker</h1>
        <p className="text-lg">
            SubTracker is a subscription management tool designed to help you track
            and manage all your subscriptions with ease.
        </p>
    </div>
  );
};

export default About;