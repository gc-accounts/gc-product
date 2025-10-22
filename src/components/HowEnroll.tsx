'use client'
import React from 'react'
import { Card, CardContent } from './ui/card';

const steps = [
  {
    number: 1,
    icon: '📝',
    title: 'Sign Up',
    description: 'Fill out the quick registration form. Takes less than a minute.'
  },
  {
    number: 2,
    icon: '🎓',
    title: 'Enroll',
    description: 'Pay the fees, and get access to the learning portal and class schedule.'
  },
  {
    number: 3,
    icon: '🚀',
    title: 'Start Learning!',
    description: 'Join your live online classes, build portfolio projects, and get career-ready.'
  }
];

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}
const HowEnroll = ({ sectionClass, title, subText }: Props) => {


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

          <div className="max-w-5xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div>
                    <Card className="w-80 h-fit hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-gray">
                      <CardContent className="p-5 h-full flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                          {step.number}
                        </div>
                        <div className="text-2xl mb-3">{step.icon}</div>
                        <h3 className="text-base font-bold text-dark-gray mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs text-medium-gray leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Connector Line */}
                  {/* {index < steps.length - 1 && (
                    <div className="absolute top-8 left-full w-12 h-0.5 bg-primary-green transform translate-x-6 z-0">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary-green border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1"></div>
                    </div>
                  )} */}

                </div>
              ))}
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  <Card className="flex-1 hover:shadow-lg transition-all duration-300 border border-border-gray">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{step.icon}</div>
                        <div>
                          <h3 className="text-base font-bold text-dark-gray mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-medium-gray leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vertical Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-6 bg-primary-green transform translate-y-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default HowEnroll;