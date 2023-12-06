"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../../../components/ui/label";
import { getAllMachines } from "../../../../api/adminApi";
import { machine } from "os";
import { IMachine } from "../../../../util/MachinesInterfaces";
import { useMachineContext } from "../../../../contexts/MachineContext";
import { Card } from "../../../../components/ui/card";
import { getCurrentOeeFromBatch } from "../../../../api/MachineApi";

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
              borderColor: machine.status ? "lightgreen" : "red",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <h2>{machine.machineName}</h2>
                <p>Description: {machine.description}</p>
                <p>Current OEE: {}</p>
                <p>Most Frequent Product Error On Batch : Need API Er lavet</p>
                <p>
                  Current Batch:{" "}
                  {machine.batches !== null ? machine.batches[0].batchNo : fail}
                </p>

                <p>
                  {" "}
                  Produced:{" "}
                  {machine.batches !== null
                    ? machine.batches[0].productsMade
                    : fail}{" "}
                </p>
                <p>
                  Need to produce :{" "}
                  {machine.batches !== null
                    ? machine.batches[0].batchSize
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
