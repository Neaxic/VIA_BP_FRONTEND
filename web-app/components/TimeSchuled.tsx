import React from "react";
import { Line } from "react-chartjs-2";

type MachineData = {
  [key: string]: number[];
};

const PerformanceChart = ({ machineData }: { machineData: MachineData }) => {
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => i + ":00"),
    datasets: Object.entries(machineData).map(([name, data]) => ({
      label: `${name} Ydeevne (%)`,
      data: data,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    })),
  };

  return <Line data={data} />;
};

const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const TimeSchedule = ({ machineData }: { machineData: MachineData }) => {
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
    <div>
      <PerformanceChart machineData={machineData} />
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
          {Object.entries(machineData).map(([machine, data]) => (
            <tr key={machine}>
              <td>{machine}</td>
              {Array.from({ length: 24 }).map((_, colIndex) => {
                const value = data[colIndex] || 0;
                return (
                  <td
                    key={colIndex}
                    style={{ backgroundColor: getColor(value) }}
                  >
                    {value}
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
};
export default TimeSchedule;
