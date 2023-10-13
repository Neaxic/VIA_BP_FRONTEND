"use client";
import React from "react";
import { Line } from "react-chartjs-2";

const PerformanceChart = () => {
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => i + ":00"), // ['0:00', '1:00', ... '23:00']
    datasets: [
      {
        label: "Maskinens Ydeevne (%)",
        data: [
          90, 85, 88, 70, 75, 95, 100, 92, 85, 80, 78, 90, 88, 87, 85, 90, 92,
          93, 95, 96, 97, 98, 99, 100,
        ], // Eksempeldata
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};

export default function Page() {
  return <h1>Hej</h1>;
}
