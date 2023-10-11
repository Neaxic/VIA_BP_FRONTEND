"use client"

import { Button } from "@/components/ui/button";
import { usePageContext } from "@/contexts/PageContext";

export default function Page() {
    const { getHints } = usePageContext()

    return (
        <>
            <h1>Hello, Home page!</h1>
            <Button onClick={getHints}>Get Hints</Button>
        </>);
}