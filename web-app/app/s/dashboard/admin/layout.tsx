"use client"

import { useEffect, useState } from "react";
import { useUserContext } from "../../../../contexts/UserContext"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [accessAllowed, setAccessAllowed] = useState<boolean>(false);
    const { user } = useUserContext();

    useEffect(() => {
        if (!user) return;
        setAccessAllowed(user.roles.some(e => e.roleName === "Admin"));
    }, [user])

    return (
        <>
            {!accessAllowed ? <div>Access denied. You are not an authroized administrator.</div> : (
                <div className="hidden md:block">
                    {children}
                </div>
            )}
        </>
    )
}
