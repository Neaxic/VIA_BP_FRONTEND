"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 5000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
    total2: Math.floor(Math.random() * 5000) + 500,
  },
];

const dataRadar = [
  {
    subject: "Math",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Chinese",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "English",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Geography",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Physics",
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: "History",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default function Page() {
  return (
    <>
      <h1>Hello, overview page!</h1>
      <div className="flex gap-4">
        <Card className="w-full p-4 flex flex-col">
          <Label>Current production status</Label>
          <Label className="text-xl pt-2">Current production status</Label>
          <Label className="pt-2">Current production status</Label>
        </Card>
        <Card className="w-full p-3 flex flex-col">
          <Label>Production stops in last 24hr</Label>
        </Card>
        <Card className="w-full p-2">
          <ResponsiveContainer width="100%" className="mt-4" height={350}>
            <RadarChart data={dataRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Mike" dataKey="A" className="fill-primary stroke-primary" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>



      <div className="flex w-full gap-4 mt-6">
        <Card className="w-full p-2">
          <Label className="mb-2 text-lg ml-2">Revenue</Label>
          <ResponsiveContainer width="100%" className="mt-4" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <Bar
                dataKey="total"
                className="fill-primary"
                radius={[4, 4, 0, 0]}
              />
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="w-full p-2">
          <Label className="mb-2 text-lg ml-2">Revenue</Label>
          <ResponsiveContainer width="100%" className="mt-4" height={350}>
            <LineChart data={data}>
              <XAxis
                dataKey="name"
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="total"
                stroke="undefined"
                strokeWidth={3}
                className="stroke-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div className="mt-4">
        <Card className="w-full p-2">
          <Label className="mb-2 text-lg ml-2">Revenue vs Privous best</Label>
          <ResponsiveContainer width="100%" className="mt-4" height={350}>
            <LineChart data={data}>
              <XAxis
                dataKey="name"
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
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="undefined"
                strokeWidth={3}
                className="stroke-primary"
              />
              <ReferenceLine y={9800} label="Max" stroke="red" />
              <Line
                type="monotone"
                dataKey="total2"
                stroke="undefined"
                strokeWidth={3}
                className="stroke-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
