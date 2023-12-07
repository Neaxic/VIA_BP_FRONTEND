"use client";

import * as React from "react";
import { IMachine, IProblemMachine, initialMachine } from "../util/MachinesInterfaces";
import { getAllMachines } from "../api/adminApi";
import { getCurrentOeeFromBatch, getLastBreakdown, getMachineUpTime24HourProcentage, getMostProlematicMachine24hr, getNumBreakdowns24hr, getNumBreakdowns24hrByMachineId } from "../api/MachineApi";

interface MachineContextInterface {
  machines: IMachine[];
  qualityControl: IMachine[];
  updateMachine: (id: number) => Promise<void>;
  getCurrentOee: (batchNo: number) => Promise<number>;
  machine: IMachine | undefined;
  runningCount: number;
  totalBreakdownCount: number;
  mostProblematicMachine: IProblemMachine | undefined;
  setMachine: React.Dispatch<React.SetStateAction<IMachine | undefined>>;
}

export const MachineContext = React.createContext<MachineContextInterface>({
  machines: [],
  qualityControl: [],
  updateMachine: () => new Promise(() => { }),
  getCurrentOee: () => new Promise(() => { }),
  machine: undefined,
  runningCount: 0,
  totalBreakdownCount: 0,
  mostProblematicMachine: undefined,
  setMachine: () => { },
});

export default function MachineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [machine, setMachine] = React.useState<IMachine>();
  const [runningCount, setRunningCount] = React.useState<number>(0);
  const [machines, setMachines] = React.useState<IMachine[]>([]);
  const [qualityControl, setQualityControl] = React.useState<IMachine[]>([]);
  const [mostProblematicMachine, setMostProblematicMachine] = React.useState<IProblemMachine>();
  const [totalBreakdownCount, setTotalBreakdownCount] = React.useState<number>(0);

  const loadTotalBreakdowns = React.useCallback(async () => {
    const resp = await getNumBreakdowns24hr();
    if (resp) {
      setTotalBreakdownCount(resp);
    }
  }, []);

  const loadAllMachines = React.useCallback(async () => {
    try {
      const response = await getAllMachines();
      if (response) {
        const problematicID = await getMostProlematicMachine24hr();
        const uptimePercent = await getMachineUpTime24HourProcentage(problematicID);
        const brekadownCnt = await getNumBreakdowns24hrByMachineId(problematicID);
        const lastBreakdown: {
          statusCode: number;
          timesince: number;
        }[] = await getLastBreakdown(problematicID);

        let problematicMachine: IProblemMachine = {
          ...initialMachine,
          ...response.find((machine: IMachine) => machine.machineID === problematicID),
          downtimePercentage: +(100 - +uptimePercent).toFixed(2),
          breakdownAmount: brekadownCnt,
          lastBreakdown: lastBreakdown[0],
        };
        setMostProblematicMachine(problematicMachine);
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

  const calculateRunningCount = React.useCallback(() => {
    machines.forEach((machine) => {
      if (machine.status === 1) {
        setRunningCount((prev) => prev + 1);
      }
    });
  }, [machines]);

  React.useEffect(() => {
    if (machines.length > 0) {
      setRunningCount(0);
      calculateRunningCount();
    }

    //Hver gang machines liste opdateres
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machines])

  //Repeately refetch machines in interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      loadAllMachines();
    }, 10000); //10 sek pt
    return () => clearInterval(interval);
  }, [loadAllMachines]);


  // Fetch everything needed useEffect
  React.useEffect(() => {
    loadAllMachines();
    loadTotalBreakdowns();
    // loadAllQualityControl()
  }, []);

  return (
    <MachineContext.Provider
      value={{
        machine,
        runningCount,
        totalBreakdownCount,
        mostProblematicMachine,
        setMachine,
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
