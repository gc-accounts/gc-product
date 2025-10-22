  'use client'
import React from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  currency?:string;
  basePrice?:number;
}

const DABFeeModule = ({ sectionClass, title, subText, currency, basePrice  }: Props) => {
    const cohorts = [
   { 
        startDate: "31 October 2025", 
        status: "Open", 
        color: "bg-primary-green", 
        spots: "Available: 15/20" 
      },
    { startDate: "29 November, 2025", status: "Limited", color: "bg-accent-gold", spots: "Available: 16/30" },
      // { 
      //   startDate: "Mar 10, 2025", 
      //   status: "Closed", 
      //   color: "bg-gray-500", 
      //   spots: "Fully Booked" 
      // }
    ];

    return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container mx-auto">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p>
        </div>

          
          {/* Main Pricing Card */}
          <div className="mx-auto mb-12 lg:mb-16 max-w-5xl">
            <Card className="bg-white shadow-lg border-0 relative overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-6 lg:mb-8 text-center">
                  Data Analyst Bootcamp
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-8">
                  {[
                    "3 months of comprehensive curriculum",
                    "9 modules covering all aspects",
                    "3 capstone projects",
                    "Mentorship sessions",
                    "Job Assistance",
                    "Certificate of completion",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-green shrink-0 mt-0.5" />
                      <span className="text-dark-gray text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-red-500 line-through text-lg">
                      {/* ₹15,000 */}
                      {currency === 'INR' ? '₹15,000' : '$250'}
                    </span>
                    <span className="text-red-500 line-through text-lg">
                      + GST
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-4xl lg:text-5xl font-bold text-primary-green">
                    {currency === 'INR' ? '₹5,000' : `$${basePrice}`}
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-primary-green">
                      + GST
                    </span>
                  </div>
                
                </div>
                
                <div className="space-y-3">
                  <Link href={'/course-checkout/data-analyst-bootcamp'}>
                  <Button className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 text-lg font-semibold h-12 cursor-pointer">
                    Enroll Now
                  </Button>
                  </Link>
                  {/* <Button variant="outline" className="w-full border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white py-3 text-lg font-semibold h-12">
                    Enquire Now
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cohort Dates */}
          <div className="text-center mb-8 lg:mb-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-2 lg:mb-2">
              Upcoming Cohorts
            </h3>
            {/* <p className="text-medium-gray leading-relaxed">
              Choose a cohort date that works for you
            </p> */}
          </div>
          
          <div className="flex justify-center max-w-[550px] mx-auto">
            {cohorts.map((cohort, index) => (
              <Card key={index} className={`${cohort.color} text-white border-0 hover:shadow-lg transition-all duration-300 h-full  w-fit mx-auto`}>
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="bg-white text-primary-green px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
                    {cohort.status}
                  </div>
                  <div className="text-lg font-bold mb-2">
                    Start: {cohort.startDate}
                  </div>
                  <div className="text-sm mb-2">
                    3 months
                  </div>
                  <div className="text-xs opacity-90 leading-relaxed">
                    {cohort.spots}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };
export default DABFeeModule