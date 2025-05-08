
'use client'
import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export const HouseGallerySkeleton = () => (
  <div className="grid ggrid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className="h-auto max-w-full rounded-lg" />
    ))}
  </div>
);

export function HouseDialog({imageUrl}) {
  return (
    <DialogContent className="max-w-screen md:max-w-[90vw] p-0">
      <DialogTitle className='hidden'/>
      <DialogDescription className='hidden'/>
      <div className="w-full h-full relative">
        <Image
          src={imageUrl}
          alt="Staging preview"
          width={1600}
          height={900}
          className="w-full h-auto object-contain rounded"
          priority
        />
      </div>
    </DialogContent>
  )
}

export function HouseGallery({images,houseId}) {
  const [selected, setSelected] = useState(null);

  return (
    <Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => 
        <DialogTrigger asChild key={index}>
          <div 
            className="cursor-pointer overflow-hidden rounded-lg relative group/card overflow-hidden"
            onClick={() => setSelected(`/images/${houseId}/${image}`)}
          >
            <Image
              src={`/images/${houseId}/${image}`}
              alt="Image Preview"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
            <div className="absolute w-full h-full top-0 left-0 transition duration-300
              group-hover/card:bg-black group-hover/card:opacity-80 "
            />
          </div>
        </DialogTrigger>
      )}
      </div>
      {selected && <HouseDialog imageUrl={selected}/>}
    </Dialog>
  );
}