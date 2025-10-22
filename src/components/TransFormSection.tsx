'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import HomeForm from './home-page/HomeForm';

interface Props {
  sectionClass?: string;
}


const TransFormSection = ({ sectionClass  }: Props) => {


    return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
           <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-5">
              <div className='md:col-span-6 col-span-12'>
                     <div className=" space-y-8">
                    <div className="space-y-6">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                        Ready to Transform Your Career?
                      </h2>
                      <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                        Join thousands of professionals who&apos;ve already taken the leap with our affordable, industry-focused bootcamps.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                       {/* <Button 
                                        size="lg" 
                                        className="bg-primary-green hover:bg-secondary-green text-white px-8 py-4 text-lg font-semibold"
                                        onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                                      >
                                        Explore Bootcamps
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                      </Button> */}
                      {/* <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-4 text-lg font-semibold"
                        onClick={() => window.location.href = '/about'}
                      >
                        Learn About Us
                      </Button> */}
                    </div>
                    </div>
              </div>
              <div className='md:col-span-6 col-span-12'>
                <HomeForm />
              </div>
            </div>
                 
                </div>
    </section>
    );
  };
export default TransFormSection