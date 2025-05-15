import { useState, useEffect } from "react";
import TopMainNav from "./navbar/TopMainNav";
import SubTrackerPeeking from "../assets/SubTrackerPeeking.png";
import SubTrackerPieChart from "../assets/SubTrackerPieChart.png";
import SubTrackerChill from "../assets/SubTrackerChill.png";
import UpdateRenewalsButton from "./button/UpdateRenewalButton";
import Calendar from "./HomeContent/Calendar";
import MonthlySpending from "./HomeContent/MonthlySpending";
import PieChart from "./HomeContent/PieChart";

const Home = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [summary, setSummary] = useState({
    monthlySpending: 0,
    yearlyProjection: 0,
    highestSubscription: { name: "", price: 0 },
    limitSet: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subsRes, monthlyRes, yearlyRes, highestRes, limitRes] = await Promise.all([
          fetch("http://localhost:5000/api/subscriptions").then((res) => res.json()),
          fetch("http://localhost:5000/api/subscriptions/monthly-spending").then((res) => res.json()),
          fetch("http://localhost:5000/api/subscriptions/yearly-projection").then((res) => res.json()),
          fetch("http://localhost:5000/api/subscriptions/highest-subscription").then((res) => res.json()),
          fetch("http://localhost:5000/api/subscriptions/limit-set").then((res) => res.json()),
        ]);

        setSubscriptions(subsRes);
        setSummary({
          monthlySpending: monthlyRes.totalSpending,
          yearlyProjection: yearlyRes.yearlyProjection,
          highestSubscription: highestRes.highestSubscription,
          limitSet: limitRes.limitSet,
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#0D0D0D] via-[#101820] to-[#30E0C6] min-h-screen text-white">
      <TopMainNav />
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <UpdateRenewalsButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white text-black rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <Calendar subscriptions={subscriptions} />
          </div>

          <div className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monthly Spending</span>
                <span>${summary.monthlySpending.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Yearly Projection</span>
                <span>${summary.yearlyProjection.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Highest Subscription</span>
                <span>{summary.highestSubscription.name || "N/A"}</span>
              </li>
              <li className="flex justify-between">
                <span>Highest Subscription Price</span>
                <span>${summary.highestSubscription.price.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Limit Set</span>
                <span>${summary.limitSet.toFixed(2)}</span>
              </li>
            </ul>
            <img src={SubTrackerPeeking} alt="Mascot" className="w-30 mt-4 ml-auto" />
          </div>

          <div className="bg-white text-black rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Monthly Spending</h2>
            <div className="bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center">
              <MonthlySpending />
            </div>
          </div>

          <div className="bg-white text-black rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="bg-gray-100 rounded-lg h-64 flex flex-col items-center justify-center">
              <PieChart subscriptions={subscriptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;