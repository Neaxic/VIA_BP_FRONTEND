"use client"
import * as React from 'react'

interface PageContextInterface {

}

export const PageContext = React.createContext<PageContextInterface>({

})

export default function PageProvider({ children, }: { children: React.ReactNode }) {

    //Vi skal implementere "settings" her

    //Notifikationer skal også være her

    React.useEffect(() => {
        // eslint-disable-next-line
    }, [])

    return (
        <PageContext.Provider
            value={{

            }}
        >
            {children}
        </PageContext.Provider>
    )
}

export const usePageContext = () => React.useContext(PageContext)
