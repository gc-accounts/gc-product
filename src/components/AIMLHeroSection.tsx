'use client'

import React, { useState } from 'react'
import { BookOpen, Briefcase, Target, ShieldCheck, X } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AimlForm from './AimlForm'
import Link from 'next/link'

interface Props {
  sectionClass?: string;
  basePrice?:number;
  currency?:string;
}

const AIMLHeroSection = ({ sectionClass, basePrice, currency  }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return(
  <section className={`${sectionClass ? sectionClass : ''}`}>
    <div className="container max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
              Master AI/ML at{' '}
              {/* <span className="text-gradient">Just ₹5,000</span> */}
              <span className="text-gradient">Just {currency === 'INR' ? '₹5,000' : `$${basePrice}`}</span>

            </h1>

            <p className="text-base sm:text-lg md:text-xl text-medium-gray leading-relaxed">
              Cutting-edge AI curriculum. Real career transformation. Affordable pricing.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Production-ready AI projects
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Learn from industry professionals
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  100% placement assistance
                </span>
              </div>
               <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Get dual certificate
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href={'/course-checkout/aiml-bootcamp'}>
                <Button
                  size="lg"
                  className="bg-yellow-1 hover:bg-yellow-2 px-8 py-4 text-lg font-semibold cursor-pointer"
                >
                  Enroll Now
                </Button>
              </Link>

              {/* Download Brochure Modal */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white cursor-pointer"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Download Brochure
                  </Button>
                </DialogTrigger>

                <DialogContent
                  className="max-w-[90vw] sm:max-w-112 md:max-w-128 w-full rounded-2xl p-0 overflow-hidden"
                >
                  <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
                    <DialogTitle className="text-lg sm:text-xl font-semibold text-dark-gray text-center w-full">
                      Download Brochure
                    </DialogTitle>
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
                      aria-label="Close"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="max-h-[85vh] overflow-y-auto px-6 pb-6 pt-2">
                    <AimlForm isModal={true} onClose={() => setIsDialogOpen(false)} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-2">
          <AimlForm />
        </div>
      </div>
    </div>
  </section>
   );
};

export default AIMLHeroSection