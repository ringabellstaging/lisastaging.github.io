import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 
export default function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="items-center p-10 md:p-20 md:pt-10 w-full">
      <div className="">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>
      {children}
    </div>
  )
}