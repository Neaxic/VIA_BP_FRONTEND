"use client";
import * as React from "react";
import { IMachine } from "../util/MachinesInterfaces";
import { getAllMachines } from "../api/adminApi";
import { getCurrentOeeFromBatch } from "../api/MachineApi";

interface MachineContextInterface {
  machines: IMachine[];
  qualityControl: IMachine[];
  updateMachine: (id: number) => Promise<void>;
  getCurrentOee: (batchNo: number) => Promise<number>;
}

export const MachineContext = React.createContext<MachineContextInterface>({
  machines: [],
  qualityControl: [],
  updateMachine: () => new Promise(() => {}),
  getCurrentOee: () => new Promise(() => {}),
});

export default function MachineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [machines, setMachines] = React.useState<IMachine[]>([]);
  const [qualityControl, setQualityControl] = React.useState<IMachine[]>([]);

  const loadAllMachines = React.useCallback(async () => {
    try {
      const response = await getAllMachines();
      if (response) {
        setMachines(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadAllQualityControl = React.useCallback(async () => {
    // Implement this function if needed
  }, []);

  const updateMachine = React.useCallback(
    async (id: number) => {
      const machine = machines.find((machine) => machine.machineID === id);
      // Update machine here
      // We need an endpoint to fetch a single machine

      // Update machine in the array
      if (machine) {
        setMachines((machines) => {
          const index = machines.findIndex(
            (machine) => machine.machineID === id
          );
          if (index !== -1) {
            machines[index] = machine;
          }
          return machines;
        });
      }
    },
    [machines]
  );

  // Fetch everything needed useEffect
  React.useEffect(() => {
    loadAllMachines();
    // loadAllQualityControl()
  }, []);

  return (
    <MachineContext.Provider
      value={{
        machines,
        qualityControl,
        updateMachine,
        getCurrentOee: async (batchNo: number) => {
          try {
            const oeeData = await getCurrentOeeFromBatch(batchNo);
            return oeeData;
          } catch (error) {
            console.error("Error fetching current OEE data:", error);
            return 0; // You can handle errors appropriately, here returning 0 as a placeholder
          }
        },
      }}
    >
      {children}
    </MachineContext.Provider>
  );
}

export const useMachineContext = () => React.useContext(MachineContext);
