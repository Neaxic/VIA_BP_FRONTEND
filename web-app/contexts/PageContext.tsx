"use client"
import * as React from 'react'

interface PageContextInterface {
    closeHint: (id: string, i: number) => Promise<void>
    getHints: () => void
}

export const PageContext = React.createContext<PageContextInterface>({
    closeHint: () => new Promise(() => { }),
    getHints: () => { },
})

export default function PageProvider({ children, }: { children: React.ReactNode }) {
    const [hints, setHints] = React.useState<[]>([])

    const getHints = React.useCallback(async () => {
        console.log("getHints")
    }, [])

    const closeHint = React.useCallback(async (hintID: string, i: number) => {

    }, [])


    React.useEffect(() => {
        // eslint-disable-next-line
    }, [])

    return (
        <PageContext.Provider
            value={{
                closeHint,
                getHints,
            }}
        >
            {children}
        </PageContext.Provider>
    )
}

export const usePageContext = () => React.useContext(PageContext)
