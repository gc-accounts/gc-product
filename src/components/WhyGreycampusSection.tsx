'use client'
import React from 'react';
import { Card, CardContent } from './ui/card';

interface Props {
  sectionClass?: string;
}

 const features = [
      {
        icon: '💰',
        title: 'Most Affordable',
        description: 'World-class education at 1/3 the market price. No compromise on quality.'
      },
      {
        icon: '👨‍🏫',
        title: 'Expert Instructors',
        description: 'Learn from engineers with 10+ years at Google, Meta, Amazon, and Microsoft.'
      },
      {
        icon: '🎯',
        title: '100% Job-Focused',
        description: 'Career-first curriculum. Resume building, interview prep, and placement support.'
      },
      {
        icon: '♾️',
        title: 'Live Online Classes',
        description: 'Live weekend classes with continuous support, recordings, and up-to-date materials.'
      },
      {
        icon: '🚀',
        title: 'Project based training',
        description: 'Build real-world projects used by actual companies. Portfolio-worthy work.'
      },
      {
        icon: '✅',
        title: 'Career services',
        description: 'Mock Interviews, Access to job portal, Interview Prep'
      }
    ];

const WhyGreycampusSection = ({ sectionClass  }: Props) => {


    return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
          <div className="container max-w-7xl mx-auto">
                  <div className="text-center mb-8 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                      Why Choose Greycampus?
                    </h2>
                    <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                      Uncompromising quality at unbeatable prices
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                      <div key={index}>
                        <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                          <CardContent className="p-8 h-full flex flex-col">
                            <div className="text-5xl mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-dark-gray mb-4">
                              {feature.title}
                            </h3>
                            <p className="text-medium-gray leading-relaxed grow">
                              {feature.description}
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
export default WhyGreycampusSection