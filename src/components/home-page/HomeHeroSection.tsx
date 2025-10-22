'use client'

import React from 'react'
import { BookOpen, Briefcase, Target, DollarSign, Rocket, Award } from 'lucide-react'
import { Button } from '../ui/button'

import { 
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import HomeForm from './HomeForm'



interface Props {
  sectionClass?: String;
  currency?:string;
  basePrice?:number;
}


  const HomeHeroSection = ({ sectionClass, currency, basePrice}: Props) => {
return (
     <section className={`${sectionClass ? sectionClass : ''} bg-linear-to-br from-off-white via-white to-green-50 flex items-center relative overflow-hidden`}>
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl"></div>
    </div>

    <div className="container max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
              Transform Your Career with{' '}
              <span className="text-gradient">Affordable Tech Bootcamps</span>
            </h1>

            <p className="text-base sm:text-xl text-medium-gray leading-relaxed max-w-8xl">
              Master Data Science, Analytics, and AI/ML at {currency === 'INR' ? '₹5,000' : `$${basePrice}`}. Real skills. Real careers. Real transformation.
            </p>

            <div className="space-y-4">
              {/* Most Affordable */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4 text-primary-green" />
                </div>
                <div>
                  <span className="text-base font-semibold text-dark-gray">Most Affordable</span>
                </div>
              </div>

              {/* Industry-Ready */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Rocket className="w-4 h-4 text-primary-green" />
                </div>
                <div>
                  <span className="text-base font-semibold text-dark-gray">Industry-Ready</span>
                </div>
              </div>

              {/* 100% Placement Assistance - changed icon to Target */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-primary-green" />
                </div>
                <div>
                  <span className="text-base font-semibold text-dark-gray">100% Placement Assistance</span>
                </div>
              </div>

              {/* Certifications & Internship - changed icon to Award */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-primary-green" />
                </div>
                <div>
                  <span className="text-base font-semibold text-dark-gray">Certifications & Internship</span>
                </div>
              </div>
            </div>

            {/* Explore Bootcamps Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-yellow-1 hover:bg-yellow-2 px-8 py-4 text-lg font-semibold cursor-pointer"
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Bootcamps
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Content - Form */}
        <div className="mt-8 lg:mt-0">
          <HomeForm />
        </div>
      </div>
    </div>
  </section>
   );
};

export default HomeHeroSection
