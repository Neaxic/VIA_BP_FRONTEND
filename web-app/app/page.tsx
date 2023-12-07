"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/s/dashboard");
    }, 800);
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:bg-red-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:bg-red-800 before:dark:opacity-10 after:dark:bg-red-500 after:dark:via-[#ff0141] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          src="/velux_logo.png"
          alt="Next.js Logo"
          width={240}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

      </div>
    </main>
  );
}
