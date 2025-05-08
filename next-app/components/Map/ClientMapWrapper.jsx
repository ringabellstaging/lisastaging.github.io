'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const PostMap = dynamic(() => import('./Map'), { ssr: false });

export default function ClientMapWrapper({ posts }) {
  const [data, setData] = useState(posts);

  // Optional: could refetch or transform client-side
  useEffect(() => {
    setData(posts);
  }, [posts]);

  return <PostMap posts={data} />;
}