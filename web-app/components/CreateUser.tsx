"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { createUserApi } from "../api/AuthAPI"
import { IRole } from "../util/UserInterfaces"
import { getAllLookupRoles } from "../api/adminApi"
import { Loader2 } from "lucide-react"
import { sha256 } from "../util/HelperInterfaces"
import { toast } from "./ui/use-toast"

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


interface CreateUserProps {
    buttonName?: string
    onCreated?: () => void //Callback
}

export function CreateUser({ buttonName = "Open", onCreated, ...props }: CreateUserProps) {
    const [allRoles, setAllRoles] = useState<IRole[]>([])
    const [selectedRole, setSelectedRole] = useState<IRole | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, SetUsername] = useState<string>("");
    const [password, SetPassword] = useState<string>("");
    const [firstname, SetFirstname] = useState<string>("");
    const [lastname, SetLastname] = useState<string>("");

    const create = async () => {
        setIsLoading(true);
        if (!selectedRole || !firstname || !lastname || !username || !password) {
            toast({
                title: "Not all fileds are filled out!",
                description: "Please fill them out, to proceed.",
            })
            setIsLoading(false)
            return;
        }

        toast({
            title: "Creating user",
            description: "Communicating with server, please wait.",
        })
        const hashedPassword = await sha256(password);
        console.log("Hashed Password:", hashedPassword);


        if (selectedRole && selectedRole.userRolesLookUpId) {
            const result = await createUserApi(username, hashedPassword, firstname, lastname, +selectedRole.userRolesLookUpId);

            if (result === "SUCCESS") {
                toast({
                    title: "User created!",
                    description: "New user should be visable in list soon.",
                })
                onCreated && onCreated()
            } else {
                toast({
                    title: "Error creating user!",
                    description: "Server responded with: " + result,
                })
            }
        }

        setIsLoading(false);
    };

    const fetchRoles = useCallback(async () => {
        setAllRoles(await getAllLookupRoles())
    }, [])

    useEffect(() => {
        fetchRoles();
    }, [])

    return (
        <Dialog>
            <DialogTrigger
                onClick={(e) => e.stopPropagation()}
            >
                <Button variant="outline" className="ml-4">
                    {buttonName}
                </Button>
            </DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Register new account</DialogTitle>
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
                            Name:
                        </Label>
                        <Input
                            id="text"
                            placeholder="Firstname"
                            type="Text"
                            autoCapitalize="none"
                            autoComplete="password"
                            onChange={(e) => SetFirstname(e.target.value)}
                            autoCorrect="off"
                        />
                        <Input
                            id="text"
                            placeholder="Lastname"
                            type="Text"
                            autoCapitalize="none"
                            autoComplete="password"
                            onChange={(e) => SetLastname(e.target.value)}
                            autoCorrect="off"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="Gavin@hooli.com"
                            type="email"
                            autoCapitalize="none"
                            className="col-span-3"
                            autoComplete="email"
                            autoCorrect="off"
                            onChange={(e) => SetUsername(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="************"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            onChange={(e) => SetPassword(e.target.value)}
                            autoCorrect="off"
                            className="col-span-3"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Roles
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={(e) => setSelectedRole(allRoles.find(a => a.roleName === e))} defaultValue={allRoles && allRoles.length > 0 ? allRoles[allRoles.length - 1].roleName : "User"}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Roles" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allRoles && allRoles.map((role, index) => (
                                        <SelectItem key={index + ", " + role.roleName} value={role.roleName}>
                                            {role.roleName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                        </div>

                    </div>
                    <div className="items-center text-right gap-4">
                        {selectedRole && (
                            <Label htmlFor="name" className="text-right">
                                Short role description: {selectedRole.description}
                            </Label>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => create()}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </>
                        ) : (
                            <>
                                Create
                            </>
                        )}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}