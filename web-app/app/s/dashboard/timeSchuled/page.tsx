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
  // Function to format numbers with a leading zero if under 10
  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  type MachineHours = {
    [key: string]: number[];
  };

  const machines: MachineHours = {
    "maskine 1": [1, 1, 3, 1, 1, 2, 1, 1, 1, 1], // hours where "x" appears for maskine 1
    "maskine 2": [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    "maskine 3": [],
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td></td>
            {Array.from({ length: 24 }).map((_, colIndex) => (
              <td key={colIndex}>{formatNumber(colIndex + 1)}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(machines).map(([machine, data]) => (
            <tr key={machine}>
              <td>{machine}</td>
              {Array.from({ length: 24 }).map((_, colIndex) => {
                const value = data[colIndex]; // Get the value from the data array
                const getColor = (val: number) => {
                  switch (val) {
                    case 1:
                      return "green";
                    case 2:
                      return "yellow";
                    case 3:
                      return "red";
                    default:
                      return "gray";
                  }
                };
                return (
                  <td
                    key={colIndex}
                    style={{ backgroundColor: getColor(value) }}
                  >
                    {value || ""}{" "}
                    {/* Display the value or an empty string if undefined */}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          border-collapse: collapse;
        }
        td,
        th {
          border: 1px solid black;
          padding: 5px;
        }
      `}</style>
    </div>
  );
}
