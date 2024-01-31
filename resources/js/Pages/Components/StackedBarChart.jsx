import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, Tooltip, Legend, LinearScale, CategoryScale);

export default function StackedBarChart({ total_payable_per_account }) {
  const labels = Object.keys(total_payable_per_account);
  const values = Object.values(total_payable_per_account);

  const backgroundColors = Array.from(
    { length: labels.length },
    () => "rgba(255, 61, 70, 0.4)",
  );

  const datasets = [
    {
      label: "Remaining Credit",
      data: values.map((item) => item.remaining_payable),
      backgroundColor: "rgba(255, 61, 70, 0.4)",
      borderColor: "rgba(255, 61, 70, 1)",
      borderWidth: 1,
    },
    {
      label: "Total Paid",
      data: values.map((item) => item.total_paid),
      backgroundColor: "rgba(71, 255, 70, 0.4)",
      borderColor: "rgba(71, 255, 70, 1)",
      borderWidth: 1,
    },
  ];


  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y:{
        stacked: true,
      }
    },
  };

  return <Bar data={data} options={options} />;
}
