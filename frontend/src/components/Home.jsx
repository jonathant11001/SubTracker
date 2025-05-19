import { useState, useEffect } from "react";
import TopMainNav from "./navbar/TopMainNav";
import SubTrackerPeeking from "../assets/SubTrackerPeeking.png";
import UpdateRenewalsButton from "./button/UpdateRenewalButton";
import Calendar from "./HomeContent/Calendar";
import MonthlySpending from "./HomeContent/MonthlySpending";
import PieChart from "./HomeContent/PieChart";
import useUserTheme from "../hooks/useUserTheme";

const Home = () => {
  const [theme] = useUserTheme();
  const [subscriptions, setSubscriptions] = useState([]);
  const [summary, setSummary] = useState({
    monthlySpending: 0,
    yearlyProjection: 0,
    highestSubscription: { name: "", price: 0 },
    limit: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [
          subsRes,
          monthlyRes,
          yearlyRes,
          highestRes,
          userRes
        ] = await Promise.all([
          fetch(`${VITE_API_URL}/api/subscriptions`, { headers }).then((res) => res.json()),
          fetch(`${VITE_API_URL}/api/subscriptions/monthly-spending`, { headers }).then((res) => res.json()),
          fetch(`${VITE_API_URL}/api/subscriptions/yearly-projection`, { headers }).then((res) => res.json()),
          fetch(`${VITE_API_URL}/api/subscriptions/highest-subscription`, { headers }).then((res) => res.json()),
          fetch(`${VITE_API_URL}/api/users/me`, { headers }).then((res) => res.json()),
        ]);

        setSubscriptions(subsRes);
        setSummary({
          monthlySpending: monthlyRes.totalSpending,
          yearlyProjection: yearlyRes.yearlyProjection,
          highestSubscription: highestRes.highestSubscription,
          limit: userRes.limit !== undefined ? userRes.limit : 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

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
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <UpdateRenewalsButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-lg shadow-md p-4"
            style={{
              background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
              color: theme.fontColor
            }}
          >
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <Calendar
              subscriptions={subscriptions}
              componentColor={theme.componentColor}
              fontColor={theme.fontColor}
            />
          </div>

          <div
            className="rounded-lg shadow-md p-4 flex flex-col justify-between"
            style={{
              background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
              color: theme.fontColor
            }}
          >
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
                <span>${summary.limit !== undefined ? summary.limit.toFixed(2) : "N/A"}</span>
              </li>
            </ul>
            <img src={SubTrackerPeeking} alt="Mascot" className="w-30 mt-4 ml-auto" />
          </div>

          <div
            className="rounded-lg shadow-md p-4"
            style={{
              background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
              color: theme.fontColor
            }}
          >
            <h2 className="text-xl font-bold mb-4">Monthly Spending</h2>
            <div
              className="rounded-lg h-64 flex flex-col items-center justify-center"
              style={{
                background: theme.componentColor === "FFFFFF" ? "#F3F4F6" : `#${theme.componentColor}`,
                color: theme.fontColor
              }}
            >
              <MonthlySpending
                componentColor={theme.componentColor}
                fontColor={theme.fontColor}
              />
            </div>
          </div>

          <div
            className="rounded-lg shadow-md p-4"
            style={{
              background: theme.componentColor === "FFFFFF" ? "#FFFFFF" : `#${theme.componentColor}`,
              color: theme.fontColor
            }}
          >
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div
              className="rounded-lg h-64 flex flex-col items-center justify-center"
              style={{
                background: theme.componentColor === "FFFFFF" ? "#F3F4F6" : `#${theme.componentColor}`,
                color: theme.fontColor
              }}
            >
              <PieChart
                subscriptions={subscriptions}
                componentColor={theme.componentColor}
                fontColor={theme.fontColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;