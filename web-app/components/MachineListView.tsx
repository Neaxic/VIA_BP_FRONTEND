import * as React from "react";
import { useMachineContext } from "../contexts/MachineContext";
import { FrequentProductErrorData, OeeData } from "../util/HelperInterfaces";
import {
  getCurrentOeeFromBatch,
  getMostFrequentStatusForBatch,
  getMachineUpTime24HourProcentage,
} from "../api/MachineApi";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card } from "./ui/card";

interface MachineListViewProps {
  totalAmount?: number;
}

type MachineData = {
  machineID: string;
  machineName: string;
  description: string;
  status: number;
  batches?: Array<{
    batchNo: string;
    productsMade?: number;
    batchSize?: number;
  }>;
};

export function MachineListView({ totalAmount }: MachineListViewProps) {
  const { machines, setMachine } = useMachineContext();
  const [oeeData, setOeeData] = React.useState<OeeData>({});
  const [uptime, setUptime] = React.useState<Record<string, number>>({});
  const [frequentProductErrorData, setFrequentProductErrorData] =
    React.useState<FrequentProductErrorData>({});
  const fail = "Ingen Aktive Ordre";

  let count = 0;

  const fetchUptimedata = async (machineId: number) => {
    try {
      const uptimeValue = await getMachineUpTime24HourProcentage(machineId);
      setUptime((prevData) => ({ ...prevData, [machineId]: uptimeValue }));
    } catch (error) {
      console.error("Error fetching uptime data:", error);
      setUptime((prevData) => ({ ...prevData, [machineId]: 0 })); // Assuming 0 for fail case
    }
  };

  React.useEffect(() => {
    machines.forEach((machine) => {
      fetchUptimedata(machine.machineID);
    });
  }, [machines]);

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
      console.error("Error fetching OEE data:", error);
      setOeeData((prevData) => ({ ...prevData, [batchNo]: 0 })); // Assuming 0 for fail case
      setFrequentProductErrorData((prevData) => ({
        ...prevData,
        [batchNo]: { errorLookUpId: "Error", count: 0 },
      })); // Assuming default error object
    }
  };

  React.useEffect(() => {
    machines.forEach((machine) => {
      machine.batches?.forEach((batch) => {
        fetchOeeData(batch.batchNo);
      });
    });
  }, [machines]);

  const calculateOee = (
    machine: MachineData,
    oeeData: Record<string, number>,
    uptimeData: Record<string, number>
  ): number => {
    if (!machine.batches || machine.batches.length === 0) {
      return 0; // Assuming 0 for fail case
    }

    const batchNo = machine.batches[0].batchNo;
    const machineID = machine.machineID;

    const oee = oeeData[batchNo] ?? 0;
    const uptimeValue = uptimeData[machineID] ?? 0;

    return (uptimeValue / 100) * (oee / 100) * 100;
  };

  return (
    <div>
      {machines.map((machine) => {
        count++;
        if (totalAmount && count > totalAmount) {
          return null;
        }

        const oeereal = calculateOee(machine, oeeData, uptime);

        return (
          <Card
            key={machine.machineID}
            className="p-4 mb-4"
            style={{
              borderColor: machine.status === 1 ? "lightgreen" : "red",
            }}
          >
            <div className="float-right">
              <h1 style={{ fontSize: 18 }}>
                {machine.status === 1 ? "Running" : "Stopped"}
              </h1>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <h2>Machine Name: {machine.machineName}</h2>
                <p>Description: {machine.description}</p>
                <p>
                  Current Quality % :{" "}
                  {oeeData[machine.batches?.[0]?.batchNo] ?? fail}
                </p>
                <p>Current Uptime % : {uptime[machine.machineID] ?? fail}</p>
                <p>Current OEE % : {oeereal}</p>
                <p>
                  Most Frequent Product Error On Batch:{" "}
                  {frequentProductErrorData[machine.batches?.[0]?.batchNo]
                    ? `${
                        frequentProductErrorData[machine.batches?.[0]?.batchNo]
                          .errorLookUpId
                      } (Count: ${
                        frequentProductErrorData[machine.batches?.[0]?.batchNo]
                          .count
                      })`
                    : fail}
                </p>
                <p>
                  Current Batch:{" "}
                  {machine.batches?.length > 0
                    ? machine.batches[0].batchNo
                    : fail}
                </p>
                <p>
                  Produced:{" "}
                  {machine.batches?.length > 0
                    ? machine.batches[0].productsMade
                    : fail}
                </p>
                <p>
                  Need to produce:{" "}
                  {machine.batches?.length > 0
                    ? machine.batches[0].batchSize
                    : fail}
                </p>
                <Button
                  className="mt-2"
                  variant={"outline"}
                  onClick={() => setMachine(machine)}
                >
                  <Link href={"./machine/" + machine.machineID}>See more</Link>
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
