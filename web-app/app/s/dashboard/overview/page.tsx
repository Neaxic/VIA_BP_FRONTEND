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
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
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
        <Card className="w-full p-3 flex flex-col">
          <Label>Produced in last 24hr</Label>
        </Card>
      </div>

      <Card className="w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

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
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <Line
                type="monotone"
                dataKey="total"
                stroke="undefined"
                strokeWidth={3}
                className="stroke-primary"
              />
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
