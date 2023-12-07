"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { useUserContext } from "../../../../contexts/UserContext";
import { getAllProductsMadeInTheLast24Hours, getMostCommonMachineErrorsAndTheirFrequency, getMostCommonProductErrorsAndTheirFrequency, getMostFrequentStatusForMachine, getNumberOfProductsMadeInTheLast24HoursPrHour, getProductsMadeEachDay30DayInterval } from "../../../../api/MachineApi";
import { useMachineContext } from "../../../../contexts/MachineContext";
import Link from "next/link";
import { MachineListView } from "../../../../components/MachineListView";
import { Label } from "../../../../components/ui/label";
import { GraphWrapper } from "../../../../components/graph-wrapper";
import { Bar, BarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IErrorFreq, IProductErrorFreq, IProductProduced } from "../../../../util/MachinesInterfaces";

export default function Page() {
  const { machines, mostProblematicMachine, totalBreakdownCount, setMachine, runningCount } = useMachineContext();
  const { user } = useUserContext();
  const [machineerrorcodefreq, setMachineerrorcodefreq] = useState<{ subject: string, A: number, fullMark: number }[]>([]);
  const [productErrorFreq, setProductErrorFreq] = useState<{ subject: string, A: number, fullMark: number }[]>([]);
  const [calculateAvgErrorFeq, setCalculateAvgErrorFeq] = useState<number>(0);
  const [productsProducedPrDay, setProductsProducedPrDay] = useState<IProductProduced[]>([]);
  const [productsProduced24hr, setProductsProduced24hr] = useState<IProductProduced[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const errorcodefreq: IErrorFreq[] = await getMostCommonMachineErrorsAndTheirFrequency();
        const calculateAvgErrorFeqTmp = errorcodefreq.reduce((acc, curr) => {
          return acc + curr.frequency;
        }, 0) / errorcodefreq.length;

        setCalculateAvgErrorFeq(calculateAvgErrorFeqTmp)

        const transformedError = errorcodefreq.map((error) => {
          return {
            subject: error.errorName,
            A: error.frequency,
            B: calculateAvgErrorFeqTmp,
            fullMark: 300,
          }
        });



        const productErrorFreqtmp: IProductErrorFreq[] = await getMostCommonProductErrorsAndTheirFrequency();
        const transformedProduct = productErrorFreqtmp.map((error) => {
          return {
            subject: error.productErrorname,
            A: error.frequency,
            fullMark: 300,
          }
        });
        setProductErrorFreq(transformedProduct)
        setMachineerrorcodefreq(transformedError);


        //Bar charts data
        const productsProducedPrDay: IProductProduced[] = await getProductsMadeEachDay30DayInterval();
        setProductsProducedPrDay(productsProducedPrDay)

        const productsProduced24hr: IProductProduced[] = await getNumberOfProductsMadeInTheLast24HoursPrHour();
        setProductsProduced24hr(productsProduced24hr)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <Card className="p-4">
          <h1 style={{ fontSize: 24 }}>Welcome back!</h1>
          <h1 style={{ fontSize: 32, fontWeight: "bold" }}>{user?.firstname} {user?.lastname}</h1>
          <p style={{ fontSize: 14 }}>Access since: {new Date(user?.createDate).toLocaleString()}</p>
        </Card>
      </div>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
        Heres todays current overview
      </h1>

      {machines && machines.map((machine, index) => {
        if (+machine.status != 1) {
          return (
            <Card key={"i: " + index + "m" + machine.status} className="w-full mb-4 p-4 border-red-600 bg-red-700">
              Attention! {machine.machineName} machine is currently down. Error{" "}
              {machine.statusCode?.statusCodeID}.{" "}
              <Link className="underline" onClick={() => setMachine(machine)} href={"./machine/" + machine.machineID}>
                See more
              </Link>
            </Card >
          );
        }
        return (<></>)
      })}

      {runningCount === machines.length && (
        <Card className="w-full mb-4 p-4 border-green-600 bg-green-700">
          Currently everything is running accordingly.
        </Card>
      )}

      {/* <Card className="w-full mb-4 p-4 border-red-600 bg-red-700">
        Attention! 1 machine is currently down. Error E201 was issued last 02:31
        hr(s). <span style={{ textDecoration: "underline" }}>See more</span>
      </Card> */}

      {/* <Card className="w-full mb-4 p-4 border-yellow-600 bg-yellow-700">
        Attention! 1 machine is currently under maintenence.
      </Card> */}

      <div className="flex gap-2">
        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>All machines breakdown</h1>
          <p>Currently {runningCount} of {machines.length} machines running</p>
          <p>{totalBreakdownCount} Breakdown(s) in the last 24hr</p>
        </Card>

        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>The most problematic machine</h1>
          <p>Machine {`"`}{mostProblematicMachine?.machineName}{`"`} is the most problematic</p>
          <p>A total downtime of {mostProblematicMachine?.downtimePercentage}%</p>
          <p>{mostProblematicMachine?.breakdownAmount} Breakdown(s) in the last 24hr</p>
          <p>Error {mostProblematicMachine?.lastBreakdown?.statusCode} was last seen {mostProblematicMachine?.lastBreakdown?.timesince} minutes ago.</p>
        </Card>
      </div>
      <div className="flex gap-2 mt-4">
        <Card className="p-4 w-full">
          <GraphWrapper title={"The latests frequency of errors for all machines"}>
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <RadarChart data={machineerrorcodefreq}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar
                  name="Actual amount"
                  dataKey="A"
                  className="fill-primary stroke-primary"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Avarage"
                  dataKey="B"
                  className="fill-red-300 stroke-red-300"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </GraphWrapper>
        </Card>
        <Card className="p-4 w-full">
          <GraphWrapper title={"The latests frequency of errors for all machines"}>
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <RadarChart data={productErrorFreq}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar
                  name="Mike"
                  dataKey="A"
                  className="fill-primary stroke-primary"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </GraphWrapper>
        </Card>

      </div>
      <div className="flex gap-2 mt-4">
        <Card className="w-full p-4">
          <GraphWrapper title="Products produced for entire production last month ">
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <BarChart data={productsProducedPrDay}>
                <XAxis
                  dataKey="Date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="ProductsMade"
                  className="fill-primary"
                  radius={[4, 4, 0, 0]}
                />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
              </BarChart>
            </ResponsiveContainer>
          </GraphWrapper>
        </Card>
        <Card className="w-full p-4">
          <GraphWrapper title="Products produced for entire production last 24hr">
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <BarChart data={productsProduced24hr}>
                <XAxis
                  dataKey="Date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Bar
                  dataKey="ProductsMade"
                  className="fill-primary"
                  radius={[4, 4, 0, 0]}
                />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
              </BarChart>
            </ResponsiveContainer>
          </GraphWrapper>
        </Card>
      </div>
      <div>
        <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
          Small list of machines
        </h1>
        <MachineListView totalAmount={2} />
      </div>
    </>
  );
}
