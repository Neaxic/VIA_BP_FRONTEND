import React from "react";

type MachineData = {
  [key: string]: number[];
};

const TimeSchedule: React.FC<{ machineData: MachineData }> = ({
  machineData,
}) => {
  if (!machineData) {
    // Handle the case where machineData is undefined or null
    return <div>No data available</div>;
  }

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

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
      <table>
        <thead>
          <tr>
            <th>Hours ago</th>
            {Array.from({ length: 24 }).map((_, index) => (
              <th key={index}>{formatNumber(index)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(machineData).map(([machine, data]) => (
            <tr key={machine}>
              <td>{machine}</td>
              {data.map((value, index) => (
                <td key={index} style={{ backgroundColor: getColor(value) }}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid black;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default TimeSchedule;
