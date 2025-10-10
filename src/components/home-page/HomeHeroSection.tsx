'use client'

import React from 'react'
import { BookOpen, Briefcase, Target } from 'lucide-react'
import { Button } from '../ui/button'

import { 
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import HomeForm from './HomeForm';



const HomeHeroSection = () => (

   <section className="min-h-screen bg-gradient-to-br from-off-white via-white to-green-50 flex items-center py-10 sm:py-15 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
                Transform Your Career with{' '}
                <span className="text-gradient">Affordable Tech Bootcamps</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-medium-gray leading-relaxed max-w-8xl">
                Master Data Science, Analytics, and AI/ML at ₹5,000. Real skills. Real careers. Real transformation.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-dark-gray">Most Affordable</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-dark-gray">100% Placement Assistance</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">🚀</span>
                  </div>
                  <div>
                    <span className="text-base font-semibold text-dark-gray">Industry-Ready</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary-green hover:bg-secondary-green text-white px-8 py-4 text-lg font-semibold"
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
)

export default HomeHeroSection
