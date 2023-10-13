import * as React from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { CalendarIcon, Settings } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "../lib/utils"
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

interface graphWrapperProps {
    enableSettings?: boolean
    children?: React.ReactNode
}

export function GraphWrapper({ children, enableSettings = true, ...props }: graphWrapperProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

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
                                <SheetTitle>Power vs production graph</SheetTitle>
                                <SheetDescription>
                                    Conviently change settings for the graph in question.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="pt-12">
                                <Label>Last data recived</Label>
                                <Button variant={"outline"} className="w-[300px] justify-start text-left font-normal">
                                    {format(new Date(), "y LLL dd, HH:mm:ss")}
                                </Button>
                            </div>
                            <div className="pt-6">
                                <Label>Oldest data recived</Label>
                                <Button variant={"outline"} className="w-[300px] justify-start text-left font-normal">
                                    {format(new Date(), "y LLL dd, HH:mm:ss")}
                                </Button>
                            </div>
                            <div className="pt-6">
                                <Label className="p-1">Date interval</Label>
                                <div className={"grid gap-2"}>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[300px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "LLL dd, y")} -{" "}
                                                            {format(date.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(date.from, "LLL dd, y")
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
            {children}

        </>
    )
}