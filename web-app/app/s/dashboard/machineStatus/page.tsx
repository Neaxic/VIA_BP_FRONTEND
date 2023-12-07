"use client";
import React, { useEffect, useState } from "react";
import { MachineListView } from "../../../../components/MachineListView";
import { Label } from "../../../../components/ui/label";
import {
  FrequentProductErrorData,
  OeeData,
} from "../../../../util/HelperInterfaces";
import { useMachineContext } from "../../../../contexts/MachineContext";
import {
  getCurrentOeeFromBatch,
  getMostFrequentStatusForBatch,
} from "../../../../api/MachineApi";

export default function Page() {
  const { machines, setMachine } = useMachineContext();
  const [oeeData, setOeeData] = useState<OeeData>({});
  const [frequentProductErrorData, setFrequentProductErrorData] =
    useState<FrequentProductErrorData>({});
  const fail = "Fejl På maskinen";

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
    <>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
        Total list all of machines
      </h1>
      <MachineListView />
    </>
  );
}
