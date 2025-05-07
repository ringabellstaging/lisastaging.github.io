'use client'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import HeroSection from "@/components/Truck/Truck";
import Image from "next/image";
import {createTextMorpher} from '@/lib/utils'

const PostMap = dynamic(() => import('@/components/Map/Map'), { ssr: false });

export default function Home() {
  const original = "GTA STAGING";
  const target = "LISA STAGING";
  const [header, setHeader] = useState(original);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      await createTextMorpher({
        from: original,
        to: target,
        onUpdate: setHeader,
        delay: 1000,
        frameDelay: 100,
      });
      setLoading(false)
      // Do something after
    })();
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen min-screen w-full">
      <header>

      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full h-full">
      <div className="relative w-full min-h-[calc(60svh+20px)] h-fit overflow-hidden justify-items-center ietms-center">
        <div
          className="absolute inset-0 w-full h-fit object-cover justify-items-center ietms-center"
        ><HeroSection/>
        </div>
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
        <div className="pt-50 absolute z-20 flex flex-col text-white px-4 text-center sm:text-left pointer-events-none
          w-full h-full justify-center sm:justify-center items-center sm:items-start sm:pl-12 pb-8 sm:pb-0 sm:pt-0" >
          <div className="hero-heading flex flex-col w-fit">
            <h1>{header}</h1>
            <div className="relative h-[1em] w-full">
              <h1 
                className={`absolute left-0 top-0 w-full transition-all duration-500 ease-in-out transform ${
                  loading ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                SOLUTIONS
              </h1>
              <h1 
                className={`absolute left-0 top-0 w-full transition-all inline-block duration-500 ease-in-out transform text-[clamp(36px,4vw,60px)] ${
                  loading ? 'opacity-0 scale-90' : 'opacity-100 scale-100' 
                }`}
              >
                {`\u{1F3E0} \u{2728}`}
              </h1>
            </div>
          </div>
          <div className="hero-description mt-2 w-fit sm:w-[calc(40vw-18px)] max-w-vw sm:text-left">
            <p className="break-word sm:text-left">We transform homes into market-ready showpieces, elevating their appeal and maximizing selling potential through expert design and top-tier furniture logistics.</p>
          </div>
        </div>
        <div className="absolute z-20 flex flex-col text-white px-4 text-center pointer-events-none 
                  w-full h-full justify-end ">
          <p className="mt-2 text-base sm:text-lg mb-6">
          Explore the impact we've made across Toronto…</p>
        </div>
      </div>
      <PostMap/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
