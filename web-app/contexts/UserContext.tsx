"use client"
import * as React from 'react'
import { loginApi } from '../api/AuthAPI'
import { ILoginResponse, IThrowError, initialLoginResponse } from '../util/HelperInterfaces';
import { useToast } from '../components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';

export interface IUser {
    username: string
    isAdmin: boolean
}

interface UserContextInterface {
    user?: IUser
    isLoggedIn: boolean
    registerUser: (user: IUser) => void
    signOut: () => void
    login: (username: string, password: string) => Promise<boolean>
}

export const UserContext = React.createContext<UserContextInterface>({
    isLoggedIn: false,
    registerUser: () => { },
    signOut: () => { },
    login: () => new Promise(() => { }),
})

interface loginInterface {
    email: string
    token: string
}

export default function UserProvider({ children, }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const [user, setUser] = React.useState<IUser>()
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)

    const login = async (username: string, password: string) => {
        const response = await loginApi(username, password)
        try {
            const user: ILoginResponse = response
            if (user && user.token) {
                setUser({
                    username: user.email,
                    isAdmin: false // placeholder
                })

                localStorage.setItem("token", JSON.stringify(response.token));
                return true
            } else {
                throw response
            }
        } catch (e) {
            const err: IThrowError = response
            toast({
                title: "There was a problem with your request.",
                description: response.message,
            })
        }

        return false
    }

    const registerUser = async (user: IUser) => {
        setIsLoggedIn(true)
        setUser(user)
        //Lav et obj med userdata
        //Det her er til efter man er logget ind, og siden skal gemme datet fra servern.
        //Den giver os alt data vi skal bruge, og gemme i storen / contexten
        savingDataToLocalStorage(user) //mere data her en dag
    }

    const savingDataToLocalStorage = (user: IUser) => {
        localStorage.setItem("user", JSON.stringify({ user }))
    }

    const loadingDataFromLocalStorage = () => {
        const data = localStorage.getItem("user")
        if (data) {
            const user = JSON.parse(data)
            registerUser(user)
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

        // eslint-disable-next-line  --- Det gør man for den ikke klager, og den kun kører på render
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                registerUser,
                signOut,
                login
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)
