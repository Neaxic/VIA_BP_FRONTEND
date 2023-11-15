"use client"
import * as React from 'react'
import { IMachine } from '../util/MachinesInterfaces'
import { getAllMachines } from '../api/adminApi'

interface MachineContextInterface {
    machines: IMachine[]
    qualityControl: IMachine[]
    updateMachine: (id: number) => Promise<void>
}

export const MachineContext = React.createContext<MachineContextInterface>({
    machines: [],
    qualityControl: [],
    updateMachine: () => new Promise(() => { }),
})

export default function MachineProvider({ children, }: { children: React.ReactNode }) {
    const [machines, setMachines] = React.useState<IMachine[]>([])
    const [qualityControl, setQualityControl] = React.useState<IMachine[]>([])

    const loadAllMachines = React.useCallback(async () => {
        try {
            const response = await getAllMachines();
            if (response) {
                setMachines(response);
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    const loadAllQualityControl = React.useCallback(async () => {

    }, [])

    //Bobbob, kunne bruges til at refreshe en maskine - eventuelt looped
    const updateMachine = React.useCallback(async (id: number) => {
        const machine = machines.find((machine) => machine.machineID === id)
        //Update machine her
        //Vi mangler endpoint til at hente en enkelt maskine

        //Update machine in arr
        if (machine) {
            setMachines((machines) => {
                const index = machines.findIndex((machine) => machine.machineID === id)
                if (index !== -1) {
                    machines[index] = machine
                }
                return machines
            })
        }
    }, [])




    //Fetch everything needed useeffect
    React.useEffect(() => {
        loadAllMachines()
        // loadAllQualityControl()
    }, [])

    return (
        <MachineContext.Provider
            value={{
                machines,
                qualityControl,
                updateMachine,
            }}
        >
            {children}
        </MachineContext.Provider>
    )
}

export const useMachineContext = () => React.useContext(MachineContext)
