"use client";

import { useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteUser } from "../api/adminApi";
import { toast } from "./ui/use-toast";

interface DeleteUserProps {
  user: any; //Kender ikke user endnu
  buttonName?: string;
  onDelete?: () => void;
}

export function DeleteUser({
  user,
  buttonName = "Open",
  onDelete,
  ...props
}: DeleteUserProps) {
  const deletUserConfirm = useCallback(async () => {
    console.log("User deleted");
    const resp = await deleteUser(user.userId);
    if (resp === true) {
      toast({
        title: "Delted user successfully!",
        description: "User has been deleted.",
      })
      onDelete && onDelete();
    } else {
      toast({
        title: "Failed to delete user!",
        description: "Please try again later.",
      })
    }

  }, [onDelete, user.userId]);

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={(e) => e.stopPropagation()}>
        {buttonName}
      </AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            <br />
            <br />
            You are about to delete: {user?.username}, forever
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deletUserConfirm();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
