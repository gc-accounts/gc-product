'use client'

import React from 'react'
import { BookOpen, Briefcase, Target, ShieldCheck } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import DaForm from './DaForm'
import Link from 'next/link'

interface Props {
  sectionClass?: string;
}

const DaHeroSection = ({ sectionClass}: Props) => {
return (
  <section className={`${sectionClass ? sectionClass : ''}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
              Master Data Analytics at{' '}
              <span className="text-gradient">Just ₹5,000</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-medium-gray leading-relaxed">
              Job aligned curriculum. Real career transformation. Affordable pricing.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Project based learning
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Learn from industry experts
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  100% Job assistance
                </span>
              </div>
               <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Internship certificate
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href={'/course-checkout/data-analyst-bootcamp'}>
                <Button
                  size="lg"
                  className="bg-primary-green hover:bg-secondary-green text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                >
                  Enroll Now
                </Button>
              </Link>

              {/* Download Brochure Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                  >
                    Download Brochure
                  </Button>
                </DialogTrigger>

                <DialogContent
                  className="max-w-[90vw] sm:max-w-[28rem] md:max-w-[32rem] w-full rounded-2xl p-0 overflow-hidden"
                >
                  <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
                    <DialogTitle className="text-lg sm:text-xl font-semibold text-dark-gray text-center w-full">
                      Download Brochure
                    </DialogTitle>
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
                      aria-label="Close"
                      onClick={() => document.body.click()}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-[85vh] overflow-y-auto px-6 pb-6 pt-2">
                    <DaForm isModal={true} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-2">
          <DaForm />
        </div>
      </div>
    </div>
  </section>
   );
};
export default DaHeroSection