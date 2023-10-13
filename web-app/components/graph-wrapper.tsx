import * as React from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Settings } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

interface graphWrapperProps {
    enableSettings?: boolean
    children?: React.ReactNode
}

export function GraphWrapper({ children, enableSettings = true, ...props }: graphWrapperProps) {
    return (
        <>
            <div className="flex justify-between p-3">
                <Label className="text-lg">Settings</Label>
                {enableSettings && (
                    <Sheet>
                        <SheetTrigger>
                            <Button variant={"outline"} >
                                <Settings size={18} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
            {children}

        </>
    )
}