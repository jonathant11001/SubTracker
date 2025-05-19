import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ subscriptions }) => {
  const { theme } = useTheme();
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    const calculateCategoryData = () => {
      const categoryTotals = {};

      subscriptions.forEach((sub) => {
        if (categoryTotals[sub.category]) {
          categoryTotals[sub.category] += sub.price;
        } else {
          categoryTotals[sub.category] = sub.price;
        }
      });

      setCategoryData(categoryTotals);
    };

    calculateCategoryData();
  }, [subscriptions]);

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(categoryData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme?.fontColor || "#FFF",
        },
      },
      title: {
        display: true,
        text: "Spending by Category",
        color: theme?.fontColor || "#FFF",
      },
      tooltip: {
        bodyColor: theme?.fontColor || "#FFF",
        titleColor: theme?.fontColor || "#FFF",
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;