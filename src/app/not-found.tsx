// src/app/not-found.tsx

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <Navigation />

      {/* 404 Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
         <section className='px-[20px] py-[50px] md:px-[30px] md:py-[70px]'>
        <div className="container max-w-7xl mt-10">
          <div className='border border-gray-200 md:p-6 p-4 rounded-lg shadow-md text-center'>
          <img src="https://strapi.odinschool.com/uploads/space_6128c5834b.png" className='mx-auto mb-4 md:w-[200px] md:h-[200px] w-[150px] h-[150px]' width={200} height={200} alt="not found" />
          <h1 className="section-title mb-2">Page Not Found</h1>
          {/* <p className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
          Page Not Found
        </p> */}
        <p className="md:text-base text-sm mb-6 text-gray-700">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center delay-200 mt-10">
          <Link href='/' className="cursor-pointer">
            <Button
              size="lg"
            >
              Back to Home <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
          </div>
        
        </div>
      </section>
      
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
