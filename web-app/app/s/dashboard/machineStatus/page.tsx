"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../../../components/ui/label";
import { Card } from "../../../../components/ui/card";
import { getAllMachines } from "../../../../api/adminApi";
import { machine } from "os";
interface Machine {
  machineID: number;
  machineName: string;
  description: string;
  statusCode: {
    statusCodeID: number;
    statusDescription: string;
  };
  currentBatch: {
    batchNo: number;
    machineID: number;
    producedItems: number;
    startTime: string;
    endTime: string;
  };
  batches: Array<{
    batchNo: number;
    machineID: number;
    producedItems: number;
    startTime: string;
    endTime: string;
  }>;
  machineRunning: boolean;
}

function getHoursDifference(startTime: string, endTime: string | number) {
  return null;
}

//function MachineCard({
// name,
// isRunning,
// errorCount,
// acceptedCount,
// rejectCount,
// plannedProductionTime,
// totalPossibleCount,
//: MachineCardProps) {
// const cardStyle = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr 1fr 1fr",
//   gap: "10px",
//   padding: "10px",
//   border: "1px solid black",
//   width: "100%",
// };

//  const sectionStyle = {
//    display: "flex",
//    alignItems: "center",
//    justifyContent: "center",
//    height: "100px",
//    border: "2px solid black",
//  };
//
//  const runningStyle = {
//    ...sectionStyle,
//    backgroundColor: isRunning ? "green" : "red",
//  };
//
//  const availability =
//    ((acceptedCount + rejectCount) * 60) / plannedProductionTime;
//  const performance = (acceptedCount - rejectCount) / totalPossibleCount;
//  const quality = (acceptedCount - rejectCount) / acceptedCount;
//
//  const oee = (availability * performance * quality * 100).toFixed(2); // OEE i procet et eller andet er forkert
//
//  return (
//    <div style={cardStyle}>
//      <Label className="mb-2 text-lg ml-2"></Label>
//      <div style={runningStyle}></div>
//      <div style={sectionStyle}>Errors: {errorCount}</div>
//      <div style={sectionStyle}>Accepted: {acceptedCount}</div>
//      <div style={sectionStyle}>Rejected: {rejectCount}</div>
//      <div style={sectionStyle}>Machine Name: {name}</div>
//      <div style={sectionStyle}>
//        Planned Time in Houres : {plannedProductionTime}
//      </div>
//      <div style={sectionStyle}>OEE: {oee}%</div>
//      <div style={sectionStyle}>Max antal produkter: {totalPossibleCount}</div>
//    </div>
//  );
//}

export default function Page() {
  const [machines, setMachines] = useState<Machine[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllMachines();
        if (response && response.data) {
          console.log(response);
          setMachines(response.data);
          console.log("Inside API " + response.data);
        } else {
          console.log("Response is undefined or does not contain data");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {machines?.map((machine) => (
        <div key={machine.machineID}>
          console.log(machine.machineID);
          <h2>{machine.machineName}</h2>
          <p>Description: {machine.description}</p>
          <p>Status: {machine.statusCode.statusDescription}</p>
          <p>Batch: {machine.currentBatch.batchNo}</p>
        </div>
      ))}
    </div>
  );
}

//return (
//  <>
//    <Card className="w-full p-2">
//      <Label className="mb-2 text-lg ml-2">Machine 1</Label>
//      <MachineCard
//        isRunning={true}
//        errorCount={5}
//        acceptedCount={100}
//        rejectCount={10}
//        name={"test"}
//        plannedProductionTime={100}
//        totalPossibleCount={150}
//      />
//    </Card>
//    <Card className="w-full p-2">
//      <Label className="mb-2 text-lg ml-2"> name={"test2"}</Label>
//      <MachineCard
//        isRunning={false}
//        errorCount={2}
//        acceptedCount={150}
//        rejectCount={5}
//        plannedProductionTime={100}
//        totalPossibleCount={100}
//        name={""}
//      />
//    </Card>
//  </>
//);
