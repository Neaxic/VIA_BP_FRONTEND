"use client";
import React, { useState, useEffect } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { useUserContext } from "../../../../contexts/UserContext";
import { getCurrentOeeFromBatch, getMostFrequentStatusForBatch, getMostFrequentStatusForMachine } from "../../../../api/MachineApi";
import { useMachineContext } from "../../../../contexts/MachineContext";
import Link from "next/link";

type OeeData = {
  [batchNo: number]: string | number;
};
// Definerer en type for den mest hyppige produktfejlstatus
type FrequentProductErrorData = {
  [batchNo: number]: {
    errorLookUpId: string;
    count: number;
  };
};

export default function Page() {
  const { machines, mostProblematicMachine, setMachine } = useMachineContext();
  const { user } = useUserContext();
  const [machineData, setMachineData] = useState([]);
  const [runningCount, setRunningCount] = useState(0);
  const [failingCount, setFailingCount] = useState(0);
  const [oeeData, setOeeData] = useState<OeeData>({});
  const [frequentProductErrorData, setFrequentProductErrorData] =
    useState<FrequentProductErrorData>({});
  const fail = "Ingen Aktive Ordre";

  const fetchOeeData = async (batchNo: number) => {
    try {
      const oee = await getCurrentOeeFromBatch(batchNo);
      const frequentProductError = await getMostFrequentStatusForBatch(batchNo);
      setOeeData((prevData) => ({ ...prevData, [batchNo]: oee }));
      setFrequentProductErrorData((prevData) => ({
        ...prevData,
        [batchNo]: frequentProductError,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setOeeData((prevData) => ({ ...prevData, [batchNo]: fail }));
      setFrequentProductErrorData((prevData) => ({
        ...prevData,
        [batchNo]: fail,
      }));
    }
  };

  useEffect(() => {
    machines.forEach((machine) => {
      const batchNo = machine.batches?.[0]?.batchNo;
      if (batchNo) {
        fetchOeeData(batchNo);
      }
    });
  }, [machines]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMostFrequentStatusForMachine();
        setMachineData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <Card className="p-4">
          <h1 style={{ fontSize: 24 }}>Welcome back!</h1>
          <h1 style={{ fontSize: 32, fontWeight: "bold" }}>{user?.firstname} {user?.lastname}</h1>
          <p style={{ fontSize: 14 }}>Access since: {new Date(user?.createDate).toLocaleString()}</p>
        </Card>
      </div>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
        Heres todays current overview
      </h1>

      {machineData && machineData.map((machine, index) => {
        if (machine.statusCode.statusCodeID != 1) {
          setFailingCount(1 + failingCount)

          return (
            <Card key={"i: " + index + "m" + machine.status} className="w-full mb-4 p-4 border-red-600 bg-red-700">
              Attention! {machine.machineName} machine is currently down. Error{" "}
              {machine.statusCode.statusCodeID}
              <Button >
                <Link href={"./machine/" + machine.machineId}>
                  See more
                </Link>
              </Button>
            </Card >
          );
        } else {
          setRunningCount(1 + runningCount)
        }
        return (<></>)
      })}

      {runningCount === machines.length && (
        <Card className="w-full mb-4 p-4 border-green-600 bg-green-700">
          Currently everything is running accordingly.
        </Card>
      )}

      <Card className="w-full mb-4 p-4 border-red-600 bg-red-700">
        Attention! 1 machine is currently down. Error E201 was issued last 02:31
        hr(s). <span style={{ textDecoration: "underline" }}>See more</span>
      </Card>

      <Card className="w-full mb-4 p-4 border-yellow-600 bg-yellow-700">
        Attention! 1 machine is currently under maintenence.
      </Card>
      <div className="flex gap-2">
        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>Machine breakdown</h1>
          <p>Currently 3 of 4 machines running</p>
          <p>3 Breakdown(s) in the last 24hr</p>
          <p>Error x was last seen y</p>
        </Card>

        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>The most problematic machine</h1>
          <p>Machine {mostProblematicMachine?.machineName} is the most problematic</p>
          <p>2 Breakdown(s) in the last 24hr</p>
          <p>Error x was last seen y times</p>
          <p>A total downtime of {mostProblematicMachine?.downtimePercentage}%</p>
        </Card>
      </div>
      <div>
        {machines.map((machine) => (
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
                <p>
                  Current OEE: {oeeData[machine.batches?.[0]?.batchNo] ?? fail}
                </p>
                <p>
                  Most Frequent Product Error On Batch:
                  {frequentProductErrorData[machine.batches?.[0]?.batchNo]
                    ? `${frequentProductErrorData[machine.batches?.[0]?.batchNo]
                      .errorLookUpId
                    } (Count: ${frequentProductErrorData[machine.batches?.[0]?.batchNo]
                      .count
                    })`
                    : fail}
                </p>
                <p>
                  Current Batch:
                  {machine.batches?.length > 0
                    ? machine.batches[0].batchNo
                    : fail}
                </p>
                <p>
                  Produced:
                  {machine.batches?.length > 0
                    ? machine.batches[0].productsMade
                    : fail}
                </p>
                <p>
                  Need to produce:
                  {machine.batches?.length > 0
                    ? machine.batches[0].batchSize
                    : fail}
                </p>
                <Button variant={"outline"} onClick={() => setMachine(machine)}>
                  <Link href={"./machine/" + machine.machineID}>See more</Link>
                </Button>
                <button>Se mere</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
