"use client"

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem } from "./ui/select"
import { IUser } from "../util/UserInterfaces"

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
                        Make changes to your profile here. Click save when youre done.
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
                        <Select>
                            <SelectContent position="popper">
                                <SelectItem value="next">Next.js</SelectItem>
                                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                <SelectItem value="astro">Astro</SelectItem>
                                <SelectItem value="nuxt">Nuxt.js</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}