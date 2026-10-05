import type { Metadata } from 'next';
import {Contact} from '@/components/Contact';
import Image from 'next/image';
import { contactInfo } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Contact Us for a Home Staging Quote',
  description: `Request a home staging quote for your Toronto or GTA property. Call ${contactInfo.englishPhone}, email ${contactInfo.email}, or contact our Stouffville team.`,
};

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
