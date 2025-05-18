import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import useUserTheme from "../../hooks/useUserTheme";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlySpending = () => {
  const [theme] = useUserTheme();
  const [spendingHistory, setSpendingHistory] = useState([]);

  useEffect(() => {
    const fetchSpendingHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/subscriptions/spending-history", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setSpendingHistory(data);
      } catch (error) {
        console.error("Error fetching spending history:", error.message);
      }
    };

    fetchSpendingHistory();
  }, []);

  const labels = spendingHistory.map((record) => record.month);
  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Spending",
        data: spendingHistory.map((record) => record.totalSpending),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "x",
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme?.fontColor || "#FFF"
        }
      },
      title: {
        display: true,
        text: "Monthly Spending (Past Year)",
        color: theme?.fontColor || "#FFF"
      },
      tooltip: {
        bodyColor: theme?.fontColor || "#FFF",
        titleColor: theme?.fontColor || "#FFF",
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: theme?.fontColor || "#FFF"
        },
        ticks: {
          color: theme?.fontColor || "#FFF"
        }
      },
      y: {
        title: {
          display: true,
          text: "Spending ($)",
          color: theme?.fontColor || "#FFF"
        },
        ticks: {
          color: theme?.fontColor || "#FFF"
        },
        min: 0
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default MonthlySpending;