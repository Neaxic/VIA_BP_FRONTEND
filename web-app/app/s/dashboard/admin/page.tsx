"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import TabButtons from "../../../../components/tabButtons";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../../../../lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export default function Page() {
  return (
    <div>
      <Tabs>
        <TabsList>
          <TabsTrigger value={"1"}>Register User</TabsTrigger>
          <TabsTrigger value={"2"}>Register Error Codes</TabsTrigger>
          <TabsTrigger value={"3"}>Register Status</TabsTrigger>
          <TabsTrigger value={"4"}>Register Batch</TabsTrigger>
          <TabsTrigger value={"5"}>Register Machine</TabsTrigger>
          <TabsTrigger value={"6"}>Register MEH</TabsTrigger>
        </TabsList>
        <TabsContent value={"1"}>
          <h1>registerUser</h1>
          <TabButtons />
        </TabsContent>

        <TabsContent value={"2"}>registerErrorCodes</TabsContent>
        <TabsContent value={"3"}>registerStatus</TabsContent>
        <TabsContent value={"4"}>registerBatch</TabsContent>
        <TabsContent value={"5"}>registerMachine</TabsContent>
        <TabsContent value={"6"}>registerMEH</TabsContent>
      </Tabs>
    </div>
  );
}
