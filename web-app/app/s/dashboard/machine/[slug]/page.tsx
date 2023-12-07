"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useRouter } from "next/router";
import { Card } from "../../../../../components/ui/card";
import { GraphWrapper } from "../../../../../components/graph-wrapper";
import { useUserContext } from "../../../../../contexts/UserContext";
import { useMachineContext } from "../../../../../contexts/MachineContext";
import Table from "../../../../../components/tableAdmin";
import {
  getMostFrequentStatusForMachine,
  getHistoryBatchData,
  getMachineUpTime24HourProcentage,
  getNumBreakdowns24hrByMachineId,
  getLastBreakdown,
  getMostCommonMachineErrorsAndTheirFrequency,
} from "../../../../../api/MachineApi";
import React, { use, useEffect, useState } from "react";
import { IProblemMachine } from "../../../../../util/MachinesInterfaces";

const dataRadar = [
  {
    subject: "Error 1",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Error 2",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Error 3",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Error 4",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Error 5",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "Error 6",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const tableColumns = [
  { field: "productlookupid", headerName: "productlookupid" },
  { field: "count", headerName: "count" },
];
const tableColumns1 = [
  { field: "batchNo", headerName: "batchNo" },
  { field: "oee", headerName: "oee" },
  { field: "mostFreqent", headerName: "mostFreqentMistakeOnProduct" },
  { field: "endtime", headerName: "endtime" },
];

export default function Page({ params }: { params: { slug: number } }) {
  const [frequentErrors, setFrequentErrors] = useState([]);
  const [historyBatch, sethistoryBatch] = useState([]);
  const [downtime, setDowntime] = useState(0);
  const [brekadownCnt, setBreakdownCount] = useState(0);
  const [lastBreakdown, setLastBreakdown] = useState<IProblemMachine["lastBreakdown"] | undefined>(undefined);
  const [machineerrorcodefreq, setmachineerrorcodefreq] = useState<{ subject: string, A: number, fullMark: number }[]>([]);
  const { machine } = useMachineContext();
  const { user } = useUserContext();

  const tableData =
    frequentErrors &&
    frequentErrors.map((item, index) => ({
      productlookupid: item.productlookupid,
      count: item.count,
    }));

  const tableDataForBatch =
    historyBatch &&
    historyBatch.map((item, index) => ({
      batchNo: item.batchNo,
      oee: item.oee,
      mostFreqent: item.mostFreqent,
      endtime: item.endtime,
    }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uptime = await getMachineUpTime24HourProcentage(params.slug);
        const data = await getMostFrequentStatusForMachine(params.slug);
        const dataBatch = await getHistoryBatchData(params.slug);
        const brekadownCnt = await getNumBreakdowns24hrByMachineId(params.slug);
        const lastBreakdown: {
          statusCode: number;
          timesince: number;
        }[] =
          await getLastBreakdown(params.slug);
        const errorcodefreq: { errorName: string, frequency: number }[] = await getMostCommonMachineErrorsAndTheirFrequency(params.slug);
        const transformed = errorcodefreq.map((error) => {
          return {
            subject: error.errorName,
            A: error.frequency,
            fullMark: 300,
          }
        });

        setmachineerrorcodefreq(transformed);
        setFrequentErrors(data);
        sethistoryBatch(dataBatch);
        setDowntime(100 - +uptime);
        setBreakdownCount(brekadownCnt);
        setLastBreakdown(lastBreakdown[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.slug]);

  return (
    <>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
        Heres todays current overview for machine {`"`}{machine?.machineName}{`"`}
      </h1>

      {machine && +machine.status != 1 && (
        <Card className="w-full mb-4 p-4 border-red-600 bg-red-700">
          Attention! This machine is currently down. Error{" "}{machine.statusCode?.statusCodeID}.{" "}
        </Card >
      )
      }


      <div className="flex gap-2">
        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>Statistics for last 24 hrs</h1>
          <p>{brekadownCnt} Breakdown(s) in the last 24hr</p>
          <p>Error {lastBreakdown?.statusCode} was last seen {lastBreakdown?.timesince} minutes ago</p>
          <p>A total downtime of {downtime.toFixed(2)}%</p>
        </Card>
      </div>

      <div className="flex gap-2 mt-4">
        <Card className="p-4 w-full">
          <GraphWrapper title={"The latests frequency of errors"}>
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <RadarChart data={machineerrorcodefreq}>
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
        <Card className="p-4 w-full">
          <GraphWrapper title={"Production from the last 24hr"}>
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <RadarChart data={dataRadar}>
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
        <Card className="p-4 w-full">
          <GraphWrapper title={"Production from the last 24hr"}>
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <RadarChart data={dataRadar}>
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
      <Card className="p-4 mt-2">
        <h1>All batches and OEE</h1>
        <Table columns={tableColumns1} data={tableDataForBatch} />
      </Card>
      <Card className="p-4 mt-2">
        <h1>All mistakes</h1>
        <Table columns={tableColumns} data={tableData} />
      </Card>
    </>
  );
}
