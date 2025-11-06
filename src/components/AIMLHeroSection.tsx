'use client'

import React, { useState } from 'react'
import { BookOpen, Briefcase, Target, ShieldCheck, X } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AimlForm from './AimlForm'
import Link from 'next/link'
import Image from 'next/image'
import useZohoSalesIQ from './hooks/useZohoSalesIQ'

interface Props {
  sectionClass?: string
  basePrice?: number
  currency?: string
}

const AIMLHeroSection = ({ sectionClass, basePrice, currency }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Initialize Zoho SalesIQ chat widget
  useZohoSalesIQ()

  return (
    <section className={`py-16 md:py-24 ${sectionClass || ''}`}>
      <div className="container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-20 items-center">

          {/* ---------- Left Content ---------- */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-dark-gray leading-tight">
                Master AI/ML at{' '}
                <span className="text-gradient font-extrabold">
                  Just {currency === 'INR' ? '₹5,000' : `$${basePrice}`}
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-medium-gray leading-relaxed">
                Cutting-edge AI curriculum. Real career transformation. Affordable pricing.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <Feature icon={<Target />} text="Production-ready AI projects" />
              <Feature icon={<BookOpen />} text="Learn from industry professionals" />
              <Feature icon={<Briefcase />} text="100% placement assistance" />
              <Feature icon={<ShieldCheck />} text="Get dual certificate" />
            </div>

            {/* CTA Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Link href={'/course-checkout/aiml-bootcamp'}>
                <Button
                  size="lg"
                  className="bg-yellow-1 hover:bg-yellow-2 px-8 py-4 text-lg font-semibold cursor-pointer shadow-lg"
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

                <DialogContent className="max-w-[90vw] sm:max-w-112 md:max-w-128 w-full rounded-2xl p-0 overflow-hidden">
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

          {/* ---------- Right Side Image ---------- */}
          <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px]">
            <Image
              src="https://strapi.odinschool.com/uploads/AIML_1_427ec343a4.webp"
              alt="AI ML Illustration"
              fill
              priority
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Reusable Feature Component ----------
const Feature = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-start space-x-3">
    <div className="text-primary-green mt-0.5">{icon}</div>
    <span className="text-sm sm:text-base text-dark-gray leading-relaxed">{text}</span>
  </div>
)

export default AIMLHeroSection
