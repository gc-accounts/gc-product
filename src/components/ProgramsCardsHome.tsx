'use client'
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';
import { ArrowRight, Check, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import HomeForm from './home-page/HomeForm';

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  currency?: string;
  basePrice?: number;
}

const ProgramsCardsHome = ({ sectionClass, currency, basePrice }: Props) => {
  // Separate state for each modal
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const programs = [
    {
      id: 'data-science',
      title: 'Internship cum Training Program in Data Science',
      price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
      duration: ['12 weeks | Hybrid | Total Hours: 125'],
      description: 'This program is designed to prepare students for roles such as Data Scientist, Machine Learning Engineer, Research Analyst, and Data Consultant, with hands-on exposure to Python, SQL, Power BI, and AI tools.',
      highlights: [
        'Applied Statistics & Python for Data Science',
        'SQL for Data Management',
        'Machine Learning Models & Capstone Projects',
        'Generative AI Applications',
        'Industry-Aligned Curriculum',
      ],
      badge: 'Most Popular',
      icon: '📊',
      link: '/data-science-bootcamp',
    },
    {
      id: 'data-analytics',
      title: 'Internship cum Training Program in Data Analytics',
      price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
      duration: ['12 weeks | Hybrid | Total Hours: 125'],
      description: 'This program is designed to prepare students for roles such as Data Analyst, Business Analyst, Business Intelligence Developer, and Product Analyst, helping them translate data into actionable business insights.',
      highlights: [
        'Excel & SQL for Business Insights',
        'Power BI and Data Visualization',
        'Exploratory Data Analysis & Reporting',
        'Data Storytelling & Dashboard Design',
        'Real-World Analytics Projects',
      ],
      badge: 'High Demand',
      icon: '📈',
      link: '/data-analyst-bootcamp',
    },
    {
      id: 'ai-ml',
      title: 'Internship cum Training Program in AI and ML',
      price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
      duration: ['12 weeks | Hybrid | Total Hours: 125'],
      description: 'This program is designed to prepare students for roles such as AI Engineer, ML Engineer, Data Scientist, and AI Research Associate, focusing on intelligent systems, LLMs, and deployment frameworks.',
      highlights: [
        'Python for AI Applications',
        'Supervised & Unsupervised Learning',
        'Language Models & Fine-Tuning (LORA, RAG)',
        'AI Agents & Deployment',
        'Project-Based Learning',
      ],
      badge: 'Cutting Edge',
      icon: '🤖',
      link: '/aiml-bootcamp',
    }
  ];

  return (
    <section className={`${sectionClass ?? ''}`} id="programs">
      <div className="container max-w-7xl mx-auto">
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
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-primary-green text-white px-3 py-1 rounded-full text-xs font-semibold">{program.badge}</span>
                </div>
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-6xl mb-6">{program.icon}</div>
                  <h3 className="text-2xl font-bold text-dark-gray mb-4">{program.title}</h3>
                  <div className="space-y-2 mb-8">
                    {program.duration.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary-green shrink-0" />
                        <p className="text-sm text-medium-gray">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-dark-gray leading-relaxed mb-6 grow">{program.description}</p>
                  <div className="space-y-2">
                    {program.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary-green shrink-0" />
                        <span className="text-sm text-dark-gray">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4">

          <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-1 bg-yellow-1 hover:bg-yellow-2 px-8 py-4 text-lg font-semibold cursor-pointer"
                onClick={() => setIsContactModalOpen(true)}
              >
                Contact Us
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] sm:max-w-112 md:max-w-128 w-full rounded-2xl p-0 overflow-hidden">
              <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
                <DialogTitle className="text-lg sm:text-xl font-semibold text-dark-gray text-center w-full">Contact Us</DialogTitle>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
                  aria-label="Close"
                  onClick={() => setIsContactModalOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[85vh] overflow-y-auto px-6 pb-6 pt-2">
                <HomeForm />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isBrochureModalOpen} onOpenChange={setIsBrochureModalOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white cursor-pointer px-8 py-4 text-lg font-semibold"
                onClick={() => setIsBrochureModalOpen(true)}
              >
                Download Brochure
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] sm:max-w-112 md:max-w-128 w-full rounded-2xl p-0 overflow-hidden">
              <div className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4">
                <DialogTitle className="text-lg sm:text-xl font-semibold text-dark-gray text-center w-full">Download Brochure</DialogTitle>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
                  aria-label="Close"
                  onClick={() => setIsBrochureModalOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[85vh] overflow-y-auto px-6 pb-6 pt-2">
                <HomeForm isModal={true} onClose={() => setIsBrochureModalOpen(false)} />
              </div>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </section>
  );
};
export default ProgramsCardsHome;
