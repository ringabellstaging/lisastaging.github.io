
import { getAllPosts } from '@/lib/posts';
import {Hero} from '@/components/Hero/Hero';
import ClientMapWrapper from '@/components/Map/ClientMapWrapper';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="flex flex-col gap-[16px] md:gap-[32px] row-start-2 items-center sm:items-start w-full h-full">
      <Hero/>
      <ClientMapWrapper posts={posts}/>
    </main>
  );
}
