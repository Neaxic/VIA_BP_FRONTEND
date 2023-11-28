"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../../../components/ui/label";
import { getAllMachines } from "../../../../api/adminApi";
import { machine } from "os";
import { IMachine } from "../../../../util/MachinesInterfaces";
import { useMachineContext } from "../../../../contexts/MachineContext";
import { Card } from "../../../../components/ui/card";

function getHoursDifference(startTime: string, endTime: string | number) {
  return null;
}

//
// const availability =
//   ((acceptedCount + rejectCount) * 60) / plannedProductionTime;
// const performance = (acceptedCount - rejectCount) / totalPossibleCount;
// const quality = (acceptedCount - rejectCount) / acceptedCount;
//
// const oee = (availability * performance * quality * 100).toFixed(2); // OEE i procet et eller andet er forkert

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
  const { machines } = useMachineContext();
  const fail = "Ingen Aktive Ordre";
  return (
    <div>
      {machines &&
        machines.length > 0 &&
        machines?.map((machine) => (
          <Card
            key={machine.machineID}
            className="p-4 mb-4"
            style={{
              borderColor:
                machine.statusCode.statusDescription === "Aktiv"
                  ? "lightgreen"
                  : "red",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2>{machine.machineName}</h2>
                <p>Description: {machine.description}</p>
                <p>Status: {machine.statusCode.statusDescription}</p>
                <p>
                  Current Batch:{" "}
                  {machine.currentBatch !== null
                    ? machine.currentBatch.batchNo
                    : fail}
                </p>
                <p>
                  {" "}
                  Produced:{" "}
                  {machine.currentBatch !== null
                    ? machine.currentBatch.producedItems
                    : fail}{" "}
                </p>
                <p>
                  Need to produce :{" "}
                  {machine.currentBatch !== null
                    ? machine.currentBatch.producedItems
                    : fail}
                </p>
                <button>Se mere</button>
              </div>
            </div>
          </Card>
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
