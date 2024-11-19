import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SpendingChart = () => {
  const data = {
    labels: ["Groceries", "Utilities", "Rent", "Entertainment"],
    datasets: [
      {
        label: "Spending",
        data: [200, 100, 500, 150],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} />;
};

export default SpendingChart;