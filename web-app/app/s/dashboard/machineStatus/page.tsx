"use client";
import React from "react";
import { MachineListView } from "../../../../components/MachineListView";

export default function Page() {
  return (
    <>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>
        Total list all of machines
      </h1>
      <MachineListView />
    </>
  );
}
