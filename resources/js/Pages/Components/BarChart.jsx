import React from 'react';
import { Chart as ChartJS, BarElement, Tooltip, Legend, LinearScale, CategoryScale } from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, Tooltip, Legend, LinearScale, CategoryScale);

export default function BarChart({ total_spent_per_account }) {
  const labels = Object.keys(total_spent_per_account);
  const amount = Object.values(total_spent_per_account);
  const backgroundColors = Array.from({ length: labels.length }, () =>
    "rgba(255, 61, 70, 0.4)"
  );

  const data = {
    labels: labels,
    datasets: [{
      label: 'Total Spent',
      data: amount,
      backgroundColor: backgroundColors,
      borderColor: backgroundColors.map((color) => color.replace("0.4", "1")),
      borderWidth: 1,
    }],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
      <Bar data={data} options={options} />
  )
}
