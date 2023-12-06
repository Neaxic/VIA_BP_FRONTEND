"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../../../../components/ui/card";
import { useMachineContext } from "../../../../contexts/MachineContext";
import {
  getCurrentOeeFromBatch,
  getMostFrequentStatusForBatch,
} from "../../../../api/MachineApi";
import { Button } from "../../../../components/ui/button";
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
  const { machines, setMachine } = useMachineContext();
  const [oeeData, setOeeData] = useState<OeeData>({});
  const [frequentProductErrorData, setFrequentProductErrorData] =
    useState<FrequentProductErrorData>({});
  const fail = "Ingen Aktive Ordre";

  // Henter OEE-data og den mest hyppige produktfejlstatus for en batch
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

  return (
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
  );
}
