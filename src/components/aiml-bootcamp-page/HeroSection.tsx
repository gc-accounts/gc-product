'use client'

import React from 'react'
import { BookOpen, Briefcase, Target } from 'lucide-react'
import { Button } from '../ui/button'
// import ReusableForm from '../common/ReusableForm'
import AimlForm from './AimlForm'
const HeroSection = () => (
  <section className="min-h-screen bg-gradient-hero flex items-center py-16 sm:py-20 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
        {/* Left Content - 60% */}
        <div className="lg:col-span-3 space-y-6 lg:space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
              Master AI/ML at{' '}
              <span className="text-gradient">Just ₹5,000</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-medium-gray leading-relaxed">
              Cutting-edge AI curriculum. Real career transformation. Affordable pricing.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Production-ready AI projects
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  Learn from AI engineers at Google, Meta, Amazon
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-dark-gray leading-relaxed">
                  90%+ placement at ₹12L-18L range
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                size="lg"
                className="bg-primary-green hover:bg-secondary-green text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
                onClick={() =>
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Enroll Now
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-2">
            <AimlForm/>
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection
