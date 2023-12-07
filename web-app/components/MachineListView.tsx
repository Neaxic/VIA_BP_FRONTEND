import * as React from "react"
import { useMachineContext } from "../contexts/MachineContext";
import { FrequentProductErrorData, OeeData } from "../util/HelperInterfaces";
import { getCurrentOeeFromBatch, getMostFrequentStatusForBatch } from "../api/MachineApi";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card } from "./ui/card";

interface MachineListViewProps {
    totalAmount?: number;
}

export function MachineListView({ totalAmount, ...props }: MachineListViewProps) {
    const { machines, setMachine } = useMachineContext();
    const [oeeData, setOeeData] = React.useState<OeeData>({});
    const [frequentProductErrorData, setFrequentProductErrorData] =
        React.useState<FrequentProductErrorData>({});
    const fail = "Ingen Aktive Ordre";

    let count = 0;

    const fetchOeeData = async (batchNo: number) => {
        try {
            const oee = await getCurrentOeeFromBatch(batchNo);
            const frequentProductError = await getMostFrequentStatusForBatch(batchNo);
            setOeeData((prevData) => ({ ...prevData, [batchNo]: oee }));
            setFrequentProductErrorData((prevData) => ({
                ...prevData,
                [batchNo]: frequentProductError,
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            setOeeData((prevData) => ({ ...prevData, [batchNo]: fail }));
            setFrequentProductErrorData((prevData) => ({
                ...prevData,
                [batchNo]: fail,
            }));
        }
    };

    React.useEffect(() => {
        machines.forEach((machine) => {
            const batchNo = machine.batches?.[0]?.batchNo;
            if (batchNo) {
                fetchOeeData(batchNo);
            }
        });
    }, [machines]);

    return (
        <div>
            {machines.map((machine) => {
                count++;
                if (totalAmount && count > totalAmount) {
                    return (<></>);
                }
                return (
                    <Card
                        key={machine.machineID}
                        className="p-4 mb-4"
                        style={{
                            borderColor: machine.status ? "lightgreen" : "red",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            <div>
                                <h2>Machine Name: {machine.machineName}</h2>
                                <p>Description: {machine.description}</p>
                                <p>
                                    Current OEE: {oeeData[machine.batches?.[0]?.batchNo] ?? fail}
                                </p>
                                <p>
                                    Most Frequent Product Error On Batch:
                                    {" "}
                                    {frequentProductErrorData[machine.batches?.[0]?.batchNo]
                                        ? `${frequentProductErrorData[machine.batches?.[0]?.batchNo]
                                            .errorLookUpId
                                        } (Count: ${frequentProductErrorData[machine.batches?.[0]?.batchNo]
                                            .count
                                        })`
                                        : fail}
                                </p>
                                <p>
                                    Current Batch:
                                    {" "}
                                    {machine.batches?.length > 0
                                        ? machine.batches[0].batchNo
                                        : fail}
                                </p>
                                <p>
                                    Produced:
                                    {" "}
                                    {machine.batches?.length > 0
                                        ? machine.batches[0].productsMade
                                        : fail}
                                </p>
                                <p>
                                    Need to produce:
                                    {" "}
                                    {machine.batches?.length > 0
                                        ? machine.batches[0].batchSize
                                        : fail}
                                </p>
                                <Button className="mt-2" variant={"outline"} onClick={() => setMachine(machine)}>
                                    <Link href={"./machine/" + machine.machineID}>See more</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}