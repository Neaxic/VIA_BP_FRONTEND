"use client";

import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
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
  Scatter,
  ScatterChart,
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

const dataScatter = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const dataLineBarArea = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: 'Page D',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: 'Page E',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: 'Page F',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
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
        <Card className="w-full p-2">
          <ResponsiveContainer width="100%" className="mt-4" height={350}>
            <ComposedChart
              width={500}
              height={400}
              data={dataLineBarArea}
            >
              <CartesianGrid />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              <Scatter dataKey="cnt" fill="red" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
        <Card className="w-full p-2 ">
          <ResponsiveContainer width="100%" className="mt-4" height={350} >
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Tooltip />
              <Scatter name="A school" data={dataScatter} className="fill-primary" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
        <Card className="w-full p-2">
          <ResponsiveContainer width="100%" className="mt-4" height={350}>
            <RadarChart data={dataRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Tooltip />
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
