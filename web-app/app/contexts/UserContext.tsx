"use client"
import * as React from 'react'

interface UserContextInterface {
    isLoggedIn: boolean
}

export const UserContext = React.createContext<UserContextInterface>({
    isLoggedIn: false,
})

export default function UserProvider({ children, }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)

    React.useEffect(() => {
        // eslint-disable-next-line
    }, [])

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)
