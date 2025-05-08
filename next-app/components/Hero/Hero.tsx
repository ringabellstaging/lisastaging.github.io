'use client'
import { useEffect, useState,useRef } from 'react';
import {createTextMorpher} from '@/lib/utils'
import { Confetti, type ConfettiRef } from "@/components/magicui/confetti";
import Truck from './Truck'
import '../hero.scss'

const heroSection = {
  header1: "GTA STAGING",
  header2: "LISA STAGING",
  subheader1: "SOLUTION",
  subheader2: `\u{1F3E0} \u{2728}`,
  text1: "We transform homes into market-ready showpieces, elevating their appeal and maximizing selling potential through expert design and top-tier furniture logistics.",
  text2: "Explore the impact we've made across Toronto…",
}

function HeroDescription(){
  return (
    <div className="hero-description mt-2 w-fit sm:w-[calc(40vw-18px)] max-w-vw sm:text-left">
      <p className="break-word sm:text-left">{heroSection.text1}</p>
    </div>
  )
}

function HeroHeader(){
  const original = heroSection.header1
  const target = heroSection.header2
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
    })();
  }, [original,target]);

  return (
    <div className="hero-heading flex flex-col w-fit">
        <h1>{header}</h1>
        <div className="relative h-[1em] w-full">
          <h1 
            className={`absolute left-0 top-0 w-full transition-all duration-500 ease-in-out transform ${
              loading ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            {heroSection.subheader1}
          </h1>
          <h1 
            className={`absolute left-0 top-0 w-full transition-all inline-block duration-500 ease-in-out transform text-[clamp(36px,4vw,60px)] ${
              loading ? 'opacity-0 scale-90' : 'opacity-100 scale-100' 
            }`}
          >
            {heroSection.subheader2}
          </h1>
        </div>
    </div>
  )
}

function Hero(){
  const confettiRef = useRef<ConfettiRef>(null);
  return (
    <div className="relative w-full min-h-[calc(50svh+20px)] md:min-h-[calc(55svh)] h-fit overflow-hidden justify-items-center ietms-center hero "id='hero'>
      <div className="absolute pt-5 top-0 w-full h-fit object-cover justify-items-center ietms-center"
        onMouseEnter={() => confettiRef.current?.fire({})}>
        <div className="container justify-items-center items-center h-full h-fit">
          <Truck/>
        </div>
      </div>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 bottom-0 z-50 size-full pointer-events-none"
      />
      <div className="absolute inset-0 bg-black/70 z-20 sm:pointer-events-none" />
      <div className="pt-10 lg:px-10 absolute z-30 flex flex-col text-white px-4 text-center pointer-events-none
        w-full h-full items-centers justify-end sm:justify-between" >
        <div className='flex flex-col justify-center sm:justify-center items-center sm:text-left sm:items-start m:pl-12 pb-10 sm:pb-0 sm:pt-0'>
        <HeroHeader/>
        <HeroDescription/>
        </div>
        <p className="text-base sm:text-lg mb-2 md:mb-6">{heroSection.text2}</p>
      </div>
    </div>
  )
}

export {
  HeroDescription,
  HeroHeader,
  Hero
} 