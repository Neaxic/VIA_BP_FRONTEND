"use client";
import React, { useState, useEffect } from "react";
import TimeSchedule from "../../../../components/TimeSchuled";
import { getMachineOverviewAllMachineLast24 } from "../../../../api/MachineApi";
const App = () => {
  const [machineData, setMachineData] = useState({});
  useEffect(() => {
    // Foretag API-kaldet og opdater machineData, når dataene er blevet hentet.
    getMachineOverviewAllMachineLast24()
      .then((response) => {
        setMachineData(response); // Antager, at API-responsen indeholder data i det ønskede format.
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data fra API:", error);
      });
  }, []);
  return (
    <div>
      <h1>Machine Uptime Overview</h1>
      <TimeSchedule machineData={machineData} />
    </div>
  );
};
export default App;
