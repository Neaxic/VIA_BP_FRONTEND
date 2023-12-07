// page.tsx
"use client";
import React from "react";
import TimeSchedule from "../../../../components/TimeSchuled";

const App = () => {
  const machineData = {
    "maskine 1": [
      1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    "maskine 2": [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    ],
  };

  return (
    <div>
      <h1>Machine Performance</h1>
      <TimeSchedule machineData={machineData} />
    </div>
  );
};

export default App;
