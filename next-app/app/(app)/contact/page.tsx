'use client'
import {Contact} from '@/components/Contact';
import Image from 'next/image';
export default function ContactPage(){
  return (
    <main className="flex flex-col row-start-2 items-center w-full h-full">
      <Contact/>
      <div className="relative w-full h-[400px] mt-8">
        <Image
          src="/images/img8.jpg"
          alt="Contact background"
          fill
          className="object-cover"
        />
      </div>
    </main>
  )
}