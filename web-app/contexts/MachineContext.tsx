"use client"
import * as React from 'react'

interface MachineContextInterface {

}

export const MachineContext = React.createContext<MachineContextInterface>({

})

export default function MachineProvider({ children, }: { children: React.ReactNode }) {



    React.useEffect(() => {
        // eslint-disable-next-line
    }, [])

    return (
        <MachineContext.Provider
            value={{}}
        >
            {children}
        </MachineContext.Provider>
    )
}

export const useMachineContext = () => React.useContext(MachineContext)
