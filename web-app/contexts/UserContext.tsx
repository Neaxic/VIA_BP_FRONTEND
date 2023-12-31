"use client"
import * as React from 'react'
import { loginApi, verifyTokenApi } from '../api/AuthAPI'
import { IThrowError } from '../util/HelperInterfaces';
import { useToast } from '../components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { ILoginResponse, IUser } from '../util/UserInterfaces';

interface UserContextInterface {
    user?: IUser
    isLoggedIn: boolean
    signOut: () => void
    login: (username: string, password: string) => Promise<boolean>
}

export const UserContext = React.createContext<UserContextInterface>({
    isLoggedIn: false,
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
    const router = useRouter();
    const pathname = usePathname()

    const login = async (username: string, password: string) => {
        const response = await loginApi(username, password)
        try {
            const user: ILoginResponse = response
            if (user && user.token) {
                toast({
                    title: "Credentials correct!",
                    description: "Proccessing your data, and logging you securely inside.",
                })
                setUser({
                    ...user.userData,
                    token: user.token,
                })
                setIsLoggedIn(true)
                savingDataToLocalStorage(
                    user.userData
                )

                localStorage.setItem("token", JSON.stringify(user.token));
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

    const refetchUserFromToken = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            toast({
                title: "Validating your credentials",
                description: "Proccessing your local data against the server, please wait.",
            })
            const response = await verifyTokenApi(token) //Refetches user if token is valid
            const user: ILoginResponse = response
            if (user && user.token) {
                toast({
                    title: "Welcome back " + user.userData.firstname + "!",
                    description: "Proccessing, and redirecting you to the dashboard.",
                })
                setUser({
                    ...user.userData,
                    token: user.token,
                })
                setIsLoggedIn(true)
                savingDataToLocalStorage(user.userData)
                localStorage.setItem("token", JSON.stringify(user.token));
                if (pathname === "/") router.push("/s/dashboard/overview")
            } else {
                toast({
                    title: "Session expired",
                    description: "Please login again.",
                })
                setUser(undefined);
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                router.push("/authentication/login")
            }
        }
    }

    const savingDataToLocalStorage = (user: IUser) => {
        localStorage.setItem("user", JSON.stringify({ user }))
    }

    const signOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }

    //Vi skal have logik her der der indeholder noget gem til localstorage, så sitet gemmer man er logget ind og hvem man er
    //Vi skal have noget automatisk tjek på login efter man har loaded localstorage, så den selv checker du stadig har adgang

    React.useEffect(() => {
        //Vi skal have logik her der tjekke
        refetchUserFromToken()

        // eslint-disable-next-line  --- Det gør man for den ikke klager, og den kun kører på render
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                isLoggedIn,
                signOut,
                login
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)
