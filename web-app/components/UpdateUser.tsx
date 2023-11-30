"use client"

import { SetStateAction, useCallback, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Check, ChevronsUpDown, Command } from "lucide-react"
import { CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { cn } from "../lib/utils"
import { IUser } from "../contexts/UserContext"
import { deleteUser } from "../api/adminApi"
import { SelectContent, SelectItem } from "./ui/select"

const roles = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]


interface UpdateUserProps {
    user: IUser
    buttonName?: string
    avaliableRoles?: { value: string, label: string }[]
}

export function UpdateUser({ user, buttonName = "Open", avaliableRoles = roles, ...props }: UpdateUserProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const updateUser = useCallback(async () => {
        console.log("User updated")
        await deleteUser(user.id)
    }, [])

    return (
        <Dialog>
            <DialogTrigger
                onClick={(e) => e.stopPropagation()}
            >{buttonName}</DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit {user?.username}</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                        <br />
                        <br />
                        Only change what you need, leave the rest as is if not relevant.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            defaultValue={user?.username}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            defaultValue="*********"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Roles
                        </Label>
                        <SelectContent position="popper">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}