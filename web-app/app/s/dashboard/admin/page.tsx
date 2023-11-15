"use client";
import React, { useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Table from "../../../../components/tableAdmin";
import TabButtons from "../../../../components/tabButtons";
import {
  getAllUsers,
  getAllMEH,
  getAllMachines,
  getAllBatchs,
  getAllErrorCodes,
  getAllStatusCodeApi,
} from "../../../../api/adminApi";

const Tabs = TabsPrimitive.Root;
const TabsList = TabsPrimitive.List;
const TabsTrigger = TabsPrimitive.Trigger;
const TabsContent = TabsPrimitive.Content;

export default function Page() {
  const [users, setUsers] = useState([]);
  const [mehs, setMehs] = useState([]);
  const [machines, setMachines] = useState([]);
  const [batchs, setBatchs] = useState([]);
  const [errorCodes, setErrorCodes] = useState([]);
  const [statusCodes, setStatusCodes] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setUsers(await getAllUsers());
      //setMehs(await getAllMEH());
      setMachines(await getAllMachines());
      setBatchs(await getAllBatchs());
      setErrorCodes(await getAllErrorCodes());
      setStatusCodes(await getAllStatusCodeApi());
    }

    fetchData();
  }, []);

  function generateColumnsForData(data: string | any[]) {
    if (data && data.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
      }));
    }
    return [];
  }

  return (
    <div>
      <Tabs defaultValue="User">
        <TabsList aria-label="Manage data tabs">
          <TabsTrigger value="User">Register User</TabsTrigger>
          <TabsTrigger value="ErrorCodes">Register Error Codes</TabsTrigger>
          <TabsTrigger value="Status">Register Status</TabsTrigger>
          <TabsTrigger value="Batch">Register Batch</TabsTrigger>
          <TabsTrigger value="Machine">Register Machine</TabsTrigger>
          <TabsTrigger value="MEH">Register MEH</TabsTrigger>
        </TabsList>
        <TabsContent value="User">
          <TabButtons />
          <Table columns={generateColumnsForData(users)} data={users} />
        </TabsContent>
        <TabsContent value="ErrorCodes">
          <TabButtons />
          <Table
            columns={generateColumnsForData(errorCodes)}
            data={errorCodes}
          />
        </TabsContent>
        <TabsContent value="Status">
          <TabButtons />
          <Table
            columns={generateColumnsForData(statusCodes)}
            data={statusCodes}
          />
        </TabsContent>
        <TabsContent value="Batch">
          <TabButtons />
          <Table columns={generateColumnsForData(batchs)} data={batchs} />
        </TabsContent>
        <TabsContent value="Machine">
          <TabButtons />
          <Table columns={generateColumnsForData(machines)} data={machines} />
        </TabsContent>
        <TabsContent value="MEH">
          <TabButtons />
          <Table columns={generateColumnsForData(mehs)} data={mehs} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
