"use client"

import { Label } from "../../components/ui/label";
import { useUserContext } from "../contexts/UserContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    //Do some auth checks
    //This is made to act as a proxy layer for everything under /s
    //Like the dashboard.
    //This is where we can do some auth checks, ect.
    const { isLoggedIn } = useUserContext();

    return (
        <>
            {isLoggedIn ? (
                { children }
            ) : (
                <div className="">
                    <Label>Not logged in</Label>
                </div>
            )}
        </>
    )
}
