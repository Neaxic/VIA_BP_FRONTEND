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
import { Card } from "../../../../../components/ui/card";
import { GraphWrapper } from "../../../../../components/graph-wrapper";
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
import React, { useEffect, useState } from "react";
import { IProblemMachine, initialMachine } from "../../../../../util/MachinesInterfaces";
import TimeSchedule from "../../../../../components/TimeSchuled";
import { getMachineOverviewByMachineLast24 } from "../../../../../api/MachineApi";
import { Badge } from "../../../../../components/ui/badge";

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
  const { machine, refreshMachine, setMachineId, machineStatistics } = useMachineContext();

  const tableData =
    machineStatistics && machineStatistics.frequentErrors &&
    machineStatistics.frequentErrors.map((item: any, index) => ({
      productlookupid: item.productlookupid,
      count: item.count,
    }));

  const tableDataForBatch =
    machineStatistics && machineStatistics.historyBatch &&
    machineStatistics.historyBatch.map((item: any, index) => ({
      batchNo: item.batchNo,
      oee: item.oee,
      mostFreqent: item.mostFreqent,
      endtime: item.endtime,
    }));

  useEffect(() => {
    if (machine?.machineName === undefined || machine?.machineName === "") {
      setMachineId(params.slug);
    }

    //eslint-disable-next-line
  }, []);

  //Refresh logic her, grundt useren er her på siden - hvis han forlader stopper useeffecten
  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshMachine();
    }, 10000); //10 sek pt
    return () => clearInterval(interval);
  }, [refreshMachine]);

  return (
    <>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
        Heres todays current overview for machine {`"`}
        {machine?.machineName}
        {`"`}
      </h1>

      {machine && +machine.status != 1 ? (
        <Card className="w-full mb-4 p-4 border-red-600 bg-red-700">
          Attention! This machine is currently down. Error{" "}
          {machine.statusCode?.statusCodeID}.{" "}
        </Card>
      ) : (
        <Card className="w-full mb-4 p-4 border-green-600 bg-green-700">
          Currently everything is running accordingly.
        </Card>
      )}

      <div className="flex gap-2 ">
        <Card className="w-5/12 p-4">
          <h1 style={{ fontSize: 24 }}>Statistics for last 24 hrs</h1>
          <p>{machineStatistics?.breakdownCount} Breakdown(s) in the last 24hr</p>
          {machineStatistics ? (
            <p>
              Error {machineStatistics.lastBreakdown?.statusCode} was last seen{" "}
              {machineStatistics.lastBreakdown?.timesince} minutes ago
            </p>
          ) : (
            <p>Loading...</p>
          )}
          <p>A total downtime of {machineStatistics?.downtimePercent.toFixed(2)}%</p>
        </Card>
        <Card className="w-full h-full p-4">
          <h1 style={{ fontSize: 24 }}>Machine Uptime Last 24 Hours</h1>
          {machineStatistics ? (
            <TimeSchedule machineData={machineStatistics?.machineData} />
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </div>


      <div className="flex gap-2 mt-4">
        <Card className="p-4 w-full">
          <GraphWrapper title={"The latests frequency of errors"}>
            <div className="pl-4">
              <Badge className="mr-2 bg-primary">Error frequency</Badge>
              <Badge className="mr-2 bg-blue-500">Avarage</Badge>
            </div>
            {machineStatistics ? (
              < ResponsiveContainer width="100%" className="mt-4" height={350}>
                <RadarChart data={machineStatistics?.errorCodeFrequency}>
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
                    className="fill-blue-500 stroke-blue-500"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <p>Loading...</p>
            )}
          </GraphWrapper>
        </Card>
      </div >
      <Card className="p-4 mt-2">
        <h1>All batches and OEE</h1>
        <Table columns={tableColumns1} data={tableDataForBatch || []} />
      </Card>
      <Card className="p-4 mt-2">
        <h1>All mistakes</h1>
        <Table columns={tableColumns} data={tableData || []} />
      </Card>
    </>
  );
}
