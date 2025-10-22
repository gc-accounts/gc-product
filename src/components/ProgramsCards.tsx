  'use client'
import React from 'react';
import { Card, CardContent } from './ui/card';
import { ArrowRight, Check, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  currency?:string;
  basePrice?:number;
}




const ProgramsCards = ({ sectionClass, currency, basePrice  }: Props) => {
   const programs = [
      {
        id: 'data-science',
        title: 'Data Science Bootcamp',
        price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
        duration: [
          '3-month LIVE online classes',
          'Internship Certificate',
        ],
        description: 'Master Python, SQL, ML, and Power BI. Build data pipelines and predictive models for business impact.',
        highlights: [
          'Python & SQL mastery',
          'Machine Learning algorithms',
          'Power BI dashboards',
          'Real-world projects',
          '100% placement assistance'
        ],
        badge: 'Most Popular',
        icon: '📊',
        link: '/data-science-bootcamp'
      },
      {
        id: 'data-analyst',
        title: 'Data Analyst Bootcamp',
        price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
        duration: [
          '3-month LIVE online classes',
          'Internship Certificate',
        ],
        description: 'Transform data into insights. Learn SQL, Excel, Power BI, and Tableau for data-driven decision making.',
        highlights: [
          'SQL & Excel expertise',
          'Power BI & Tableau',
          'Statistical analysis',
          'Business intelligence',
          '100% placement assistance'
        ],
        badge: 'Highest ROI',
        icon: '📈',
        link: '/data-analyst-bootcamp'
      },
      {
        id: 'aiml',
        title: 'AI/ML Bootcamp',
        price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
       duration: [
          '3-month LIVE online classes',
          'Internship Certificate',
        ],
        description: 'Build production AI systems. Deep learning, LLMs, RAG systems, and autonomous agents.',
        highlights: [
          'Deep Learning & Neural Networks',
          'LLMs & Transformers',
          'RAG systems',
          'AI agents',
          '100% placement assistance'
        ],
        badge: 'Cutting Edge',
        icon: '🤖',
        link: '/aiml-bootcamp'
      }
    ];

    return (
    <section className={`${sectionClass ? sectionClass : ''}`} id='programs'>
         <div className="container mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Three comprehensive bootcamps designed for career transformation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {programs.map((program) => (
              <div key={program.id}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-border-gray hover:border-primary-green bg-white relative overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {program.badge}
                    </span>
                  </div>
                  
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="text-6xl mb-6">{program.icon}</div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-dark-gray mb-4">
                      {program.title}
                    </h3>
                    
                    {/* Price */}
                    <div className="text-3xl font-bold text-primary-green mb-2">
                      {program.price}
                    </div>
                    
                      <div className="space-y-2 mb-8">
                      {program.duration.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-primary-green shrink-0" />
                          <p className="text-sm text-medium-gray">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Description */}
                    <p className="text-base text-dark-gray leading-relaxed mb-6 flex-grow">
                      {program.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="space-y-2 mb-8">
                      {program.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary-green shrink-0" />
                          <span className="text-sm text-dark-gray">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Button 
                      className="bg-yellow-1 hover:bg-yellow-2 px-8 py-4 text-lg font-semibold cursor-pointer"
                      onClick={() => window.location.href = program.link}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
    </section>
    );
  };
export default ProgramsCards