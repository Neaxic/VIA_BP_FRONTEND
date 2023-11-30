"use client"

import { useCallback } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { deleteUser } from "../api/adminApi"

interface DeleteUserProps {
    user: any //Kender ikke user endnu
    buttonName?: string
    onDelete?: () => void
}

export function DeleteUser({ user, buttonName = "Open", onDelete, ...props }: DeleteUserProps) {


    const deletUserConfirm = useCallback(async () => {
        console.log("User deleted")
        await deleteUser(user.id)
    }, [])

    return (
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>{buttonName}</AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                        <br />
                        <br />
                        You are about to delete: {user?.username}, forever
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        onDelete()
                        deletUserConfirm()
                    }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}