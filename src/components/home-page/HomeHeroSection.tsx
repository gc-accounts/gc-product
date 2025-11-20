'use client'

import React from 'react'
import { Cpu, BookOpen, Target, Building  } from 'lucide-react'
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
     <section id='homeHero' className={`${sectionClass ? sectionClass : ''} bg-linear-to-br from-off-white via-white to-green-50 flex items-center relative overflow-hidden`}>
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl"></div>
    </div>

    <div className="container max-w-7xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
              High-Impact <br/><span className="text-gradient">Internship Program <br/>with Training</span>
            </h1>

            <p className="text-base sm:text-xl text-medium-gray leading-relaxed max-w-8xl">
              Equip your students with in-demand skills and recognized internship certificates that strengthen placement readiness and academic outcomes.
            </p>

<div className="space-y-4">
  {/* Designed with In-demand tools */}
  <div className="flex items-start space-x-3">
    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
      <Cpu className="w-4 h-4 text-primary-green" />
    </div>
    <div>
      <span className="text-base font-semibold text-dark-gray">Designed with in-demand tools & real-world projects</span>
    </div>
  </div>

  {/* Dual Certification */}
  <div className="flex items-start space-x-3">
    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
      <BookOpen className="w-4 h-4 text-primary-green" />
    </div>
    <div>
      <span className="text-base font-semibold text-dark-gray">Dual Certification: Internship + Skill Certification</span>
    </div>
  </div>

  {/* Access to Placement Portal */}
  <div className="flex items-start space-x-3">
    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
      <Target className="w-4 h-4 text-primary-green" />
    </div>
    <div>
      <span className="text-base font-semibold text-dark-gray">Dedicated Placement Portal for student career support
      </span>
    </div>
  </div>

  {/* 400+ Hiring Partners */}
  <div className="flex items-start space-x-3">
    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
      <Building className="w-4 h-4 text-primary-green" />
    </div>
    <div>
      <span className="text-base font-semibold text-dark-gray">400+ Hiring Partners enabling strong career outcomes</span>
    </div>
  </div>
</div>


            {/* Explore Bootcamps Button */}
            {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-yellow-1 hover:bg-yellow-2 px-8 py-4 text-lg font-semibold cursor-pointer"
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Bootcamps
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div> */}
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
