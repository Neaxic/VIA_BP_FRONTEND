"use client";
import React, { useEffect, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import Table from "../../../../../components/tableAdmin";
import {
  getAllUsers,
} from "../../../../../api/adminApi";

const Tabs = TabsPrimitive.Root;
const TabsList = TabsPrimitive.List;
const TabsTrigger = TabsPrimitive.Trigger;
const TabsContent = TabsPrimitive.Content;

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setUsers(await getAllUsers());
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

    //Need button to change password modal open
    //Need logic for makining new user
    //Need logic for editing permissions
    //Need logic for deleting user

    return [];
  }

  return (
    <div>
      <h1 style={{ fontSize: 24 }}>User access handling.</h1>
      <Tabs defaultValue="User">
        <TabsContent value="User">
          <Table columns={generateColumnsForData(users)} data={users} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
