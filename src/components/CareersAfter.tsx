'use client'
import React from 'react';
import { Card, CardContent } from './ui/card';

interface CareerItem {
  title: string;
  salary?: string; // Optional property
  companies: string | string[]; // Allow string or array for flexibility
  responsibilities: string[];
  skills: string[]; // This is the crucial property for the component
  // Note: If you cannot immediately change the data file, you might temporarily add skills_tools here:
  // skills_tools?: string[];
}

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  data?: CareerItem[];
}

const CareersAfter = ({ sectionClass, title, subText, data }: Props) => {

  // Added check for 'data' prop to prevent error if it's undefined
  if (!data) {
    return null;
  }

  return (
    <section className={sectionClass}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.map((item, index) => (
            <div key={index}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green">
                <CardContent className="p-6 h-full flex flex-col">
                  <h3 className="text-lg lg:text-xl font-bold text-dark-gray mb-2">
                    {/* Assuming item.role in data is intended for item.title */}
                    {item.title} 
                  </h3>
                  {item.salary && (
                    <p className="text-sm font-semibold text-primary-green mb-2">{item.salary}</p>
                  )}
                  {/* Handle item.companies which could be an array or string */}
                  <p className="text-xs text-medium-gray italic mb-4">
                    {Array.isArray(item.companies) ? item.companies.join(', ') : item.companies}
                  </p>
                  <div className="space-y-2 mb-4 flex-grow">
                    {item.responsibilities.map((resp: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-dark-gray leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* FIX: Add guard clause to check if item.skills is defined before mapping */}
                    {/* Also, ensure the data object uses 'skills' and not 'skills_tools' */}
                    {item.skills && item.skills.map((skill: string, idx: number) => (
                      <span key={idx} className="bg-primary-green text-white text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersAfter;