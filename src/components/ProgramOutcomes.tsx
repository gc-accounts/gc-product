'use client'
import React from 'react'
import { Card, CardContent } from './ui/card';

// Define the interface for a single outcome item
interface OutcomeItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  data?: OutcomeItem[]; // Use the specific interface array
}

const ProgramOutcomes = ({ sectionClass, title, subText, data }: Props) => {

  // FIX: Add guard clause to ensure data is present and is an array before mapping
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container max-w-7xl mx-auto">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p>
        </div>

          {/* Grid changed to 4 columns for common layout practice (10 items means 2 rows of 5 or 3 rows of 4/4/2) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {data.map((outcome, index) => (
              <div key={index}>
                <Card className={`bg-white h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 ${outcome.color} border border-border-gray rounded-lg`}>
                  <CardContent className="p-5 h-full flex flex-col items-start">
                    {/* The icon is centered visually by the items-start on the CardContent */}
                    <div className="text-3xl mb-3">{outcome.icon}</div>
                    <h3 className="text-lg font-semibold text-dark-gray mb-3">
                      {outcome.title}
                    </h3>
                    <p className="text-sm text-medium-gray leading-relaxed grow">
                      {outcome.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default ProgramOutcomes;
