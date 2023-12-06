"use client";

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { useRouter } from "next/router";
import { Card } from "../../../../../components/ui/card";
import { GraphWrapper } from "../../../../../components/graph-wrapper";
import { useUserContext } from "../../../../../contexts/UserContext";
import { useMachineContext } from "../../../../../contexts/MachineContext";

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

export default function Page({ params }: { params: { slug: string } }) {
  const { machine } = useMachineContext();
  const { user } = useUserContext();

  return (
    <>
      <h1 className="mt-12 mb-2 font-bold" style={{ fontSize: 24 }}>Heres todays current overview</h1>
      <Card className="w-full mb-4 p-4 border-red-600 bg-red-700">
        Attention! 1 machine is currently down. Error E201 was issued last 02:31 hr(s). <span style={{ textDecoration: "underline" }}>See more</span>
      </Card>
      <Card className="w-full mb-4 p-4 border-green-600 bg-green-700">
        Currently everything is running accordingly.
      </Card>
      <Card className="w-full mb-4 p-4 border-yellow-600 bg-yellow-700">
        Attention! 1 machine is currently under maintenence.
      </Card>

      <div style={{ display: "flex", gap: 8 }}>
        <Card className="p-4">
          <h1 style={{ fontSize: 24 }}>Welcome back!</h1>
          <h1 style={{ fontSize: 32, fontWeight: "bold" }}>{user?.username}</h1>
          <p style={{ fontSize: 14 }}>Last seen: 21/02/2020 13:30 GMT+1</p>
          <p style={{ fontSize: 14 }}>Your role: {user && user?.userRoles && user.userRoles[user?.userRoles?.length - 1].roleName}</p>
        </Card>
      </div>

      <div className="flex gap-2">
        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>Machine breakdown</h1>
          <p>Currently 3 of 4 machines running</p>
          <p>3 Breakdown(s) in the last 24hr</p>
          <p>Error x was last seen y</p>
        </Card>
        <Card className="w-full p-4">
          <h1 style={{ fontSize: 24 }}>The most problematic machine</h1>
          <p>Machine 002 is the most problematic</p>
          <p>2 Breakdown(s) in the last 24hr</p>
          <p>Error x was last seen y times</p>
          <p>A total downtime of 28%</p>
        </Card>
      </div>

      <div className="flex gap-2 mt-4">
        <Card className="p-4 w-full">
          <GraphWrapper title={"The latests frequency of errors"}>
            <ResponsiveContainer width="100%" className="mt-4" height={350}>
              <RadarChart data={dataRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar name="Mike" dataKey="A" className="fill-primary stroke-primary" fillOpacity={0.5} />
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
                <Radar name="Mike" dataKey="A" className="fill-primary stroke-primary" fillOpacity={0.5} />
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
                <Radar name="Mike" dataKey="A" className="fill-primary stroke-primary" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </GraphWrapper>
        </Card>
      </div>



      <Card className="p-4 mt-2">
        <h1>Latest OEE numbers</h1>
      </Card>
    </>
  );
}
