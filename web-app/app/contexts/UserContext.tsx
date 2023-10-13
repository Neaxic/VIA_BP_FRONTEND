"use client"
import * as React from 'react'

interface UserContextInterface {
    isLoggedIn: boolean
    registerUser: (username: string, isAdmin: boolean) => void
    signOut: () => void
}

export const UserContext = React.createContext<UserContextInterface>({
    isLoggedIn: false,
    registerUser: () => { },
    signOut: () => { },
})

export default function UserProvider({ children, }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)

    const registerUser = async (username: string, isAdmin: boolean) => {
        setIsLoggedIn(true)
        //Lav et obj med userdata
        //Det her er til efter man er logget ind, og siden skal gemme datet fra servern.
        //Den giver os alt data vi skal bruge, og gemme i storen / contexten
        savingDataToLocalStorage(username, isAdmin) //mere data her en dag
    }

    const savingDataToLocalStorage = (username: string, isAdmin: boolean) => {
        localStorage.setItem("user", JSON.stringify({ username: username, isAdmin: isAdmin }))
    }

    const loadingDataFromLocalStorage = () => {
        const data = localStorage.getItem("user")
        if (data) {
            const user = JSON.parse(data)
            registerUser(user.username, user.isAdmin)
        }
    }

    const signOut = () => {
        localStorage.removeItem("user")
        setIsLoggedIn(false)
    }


    //Vi skal have logik her der der indeholder noget gem til localstorage, så sitet gemmer man er logget ind og hvem man er
    //Vi skal have noget automatisk tjek på login efter man har loaded localstorage, så den selv checker du stadig har adgang

    React.useEffect(() => {
        //Vi skal have logik her der tjekke
        loadingDataFromLocalStorage()
    }, [])

    return (
        <UserContext.Provider
            value={{
                isLoggedIn,
                registerUser,
                signOut,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)
