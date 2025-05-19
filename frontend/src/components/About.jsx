import React from "react";
import TopLandingNav from "./navbar/TopLandingNav";
import about1 from "../assets/SubTrackerAbout1.png";
import about2 from "../assets/SubTrackerAbout2.png";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6] min-h-screen text-white">
      <TopLandingNav />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-center">
            <img src={about1} alt="Mascot" className="w-80 mb-4" />
          </div>

          <div className="bg-gray-100 text-black p-8 rounded-lg shadow-md w-full md:w-4/5 lg:w-3/4 mx-auto">
            <p className="text-lg">
              Easily monitor all your active subscriptions in one place and
              never miss a renewal again.
            </p>
          </div>

          <div className="bg-gray-100 text-black p-8 rounded-lg shadow-md w-full md:w-4/5 lg:w-3/4 mx-auto">
            <p className="text-lg">
              Visualize your monthly spending habits through intuitive charts
              and graphs, helping you stay in control of your budget.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img src={about2} alt="Mascot 2" className="w-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;