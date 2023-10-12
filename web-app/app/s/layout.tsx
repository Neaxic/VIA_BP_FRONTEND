"use client"

import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState } from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    //Do some auth checks
    //This is made to act as a proxy layer for everything under /s
    //Like the dashboard.
    //This is where we can do some auth checks, ect.
    const [openDialog, setOpenDialog] = useState(false);
    const { isLoggedIn } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        //Only on mount, fix hyrdation issues
        setTimeout(() => {
            setOpenDialog(true);
        }, 100)
    }, []);

    return (
        <>
            {isLoggedIn ? (
                <>
                    {children}
                </>
            ) : (
                <div className="">
                    <AlertDialog open={openDialog}>
                        <AlertDialogContent open={true}>
                            <AlertDialogHeader>
                                <AlertDialogTitle>You do not have access</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a restricted, and protected url. You must be logged in to access this page.
                                    Contact your administrator if you believe this is a mistake.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => router.push("/")}>Okay, i give up</AlertDialogCancel>
                                <AlertDialogAction onClick={() => router.push("/authentication/login")}>Login
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </>
    )
}
