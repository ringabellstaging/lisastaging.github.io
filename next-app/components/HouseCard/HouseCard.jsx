"use client";
import Link from "next/link";
 
export default function CardDemo({post}) {
  return (
    <div className="w-full h-full group/card p-1">
      <Link href={`/${post.id}`} className="block">
        <div
          className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-sm mx-auto backgroundImage flex flex-col justify-between p-4 bg-cover"
          style={{ backgroundImage: `url(${post.highlight_image})`, backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', }}
        >
          {/* <div className="absolute w-full h-[30%] bottom-0 left-0 transition duration-300
            bg-gradient-to-t from-black/50 to-transparent
            group-hover/card:bg-black group-hover/card:opacity-80 group-hover/card:bg-none"
          /> */}
          <div className="absolute w-full h-full bottom-0 left-0 transition duration-300
            group-hover/card:bg-black group-hover/card:opacity-80 group-hover/card:bg-none"
          />
          <div className="flex flex-row items-center space-x-4 z-10">
            {post?.image &&
            <img
              height="100"
              width="100"
              alt="Lisa Staging"
              src={post.image}
              className="h-12 w-12 rounded-full border-2 object-cover"
            />}
            {/* <div className="flex flex-col">
              <p className="font-normal text-base text-gray-50 relative z-10">
                Manu Arora
              </p>
              <p className="text-sm text-gray-400">2 min read</p>
            </div> */}
          </div>
          <div className="text content">
            <h1 className="font-bold text-xl md:text-2xl text-gray-50 drop-shadow-lg relative z-10">
            {post?.tags && post?.tags[0]}
            </h1>
            <p className="font-normal text-sm text-gray-50 drop-shadow-sm relative z-10 my-4 whitespace-pre-line">
              {post?.text}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}