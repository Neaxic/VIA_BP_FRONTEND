"use client";
import React from "react";
import { Label } from "../../../../components/ui/label";
import { Card } from "../../../../components/ui/card";

interface MachineCardProps {
  name: string;
  isRunning: boolean;
  errorCount: number;
  acceptedCount: number;
  rejectCount: number;
  plannedProductionTime: number;
  totalPossibleCount: number;
}

function MachineCard({
  name,
  isRunning,
  errorCount,
  acceptedCount,
  rejectCount,
  plannedProductionTime,
  totalPossibleCount,
}: MachineCardProps) {
  const cardStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "10px",
    padding: "10px",
    border: "1px solid black",
    width: "100%",
  };

  const sectionStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    border: "1px solid black",
  };

  const runningStyle = {
    ...sectionStyle,
    backgroundColor: isRunning ? "green" : "red",
  };

  const availability =
    ((acceptedCount + rejectCount) * 60) / plannedProductionTime;
  const performance = (acceptedCount - rejectCount) / totalPossibleCount;
  const quality = (acceptedCount - rejectCount) / acceptedCount;

  const oee = (availability * performance * quality * 100).toFixed(2); // OEE i procet et eller andet er forkert

  return (
    <div style={cardStyle}>
      <Label className="mb-2 text-lg ml-2">
        {name} - OEE: {oee}%
      </Label>
      <div style={runningStyle}></div>
      <div style={sectionStyle}>Errors: {errorCount}</div>
      <div style={sectionStyle}>Accepted: {acceptedCount}</div>
      <div style={sectionStyle}>Rejected: {rejectCount}</div>
      <div style={sectionStyle}>Rejected: {rejectCount}</div>
      <div style={sectionStyle}>Rejected: {rejectCount}</div>
      <div style={sectionStyle}>Rejected: {rejectCount}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Card className="w-full p-2">
        <Label className="mb-2 text-lg ml-2">Machine 1</Label>
        <MachineCard
          isRunning={true}
          errorCount={5}
          acceptedCount={100}
          rejectCount={10}
          name={"test"}
          plannedProductionTime={100}
          totalPossibleCount={150}
        />
      </Card>
      <Card className="w-full p-2">
        <Label className="mb-2 text-lg ml-2">Machine 2</Label>
        <MachineCard
          isRunning={false}
          errorCount={2}
          acceptedCount={150}
          rejectCount={5}
          name={"test2"}
          plannedProductionTime={100}
          totalPossibleCount={100}
        />
      </Card>
    </>
  );
}
