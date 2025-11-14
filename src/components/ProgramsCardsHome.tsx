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
      description: 'Prepares students for roles such as Data Analyst, Research Analyst, Junior Data Scientist, and Data Consultant — supported by hands-on exposure to Python, SQL, Power BI, and AI tools.',
      highlights: [
        'Applied Statistics & Python',
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
      description: 'Designed for students moving into Business Analyst, Data Analyst, BI Developer, and Product Analyst roles, with a focus on turning data into actionable insights.',
      highlights: [
        'Excel & SQL for Insights',
        'Power BI & Data Visualization',
        'Exploratory Data Analysis & Reporting',
        'Dashboard Design & Storytelling',
        'Real-World Analytics Projects',
      ],
      badge: 'High Demand',
      icon: '📈',
      link: '/data-analyst-bootcamp',
    },
    {
      id: 'ai-ml',
      title: 'Internship cum Training Program in AI & ML',
      price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
      duration: ['12 weeks | Hybrid | Total Hours: 125'],
      description: 'Equips students for emerging roles such as AI Engineer, ML Engineer, and AI Research Associate, with training on intelligent systems and deployment frameworks.',
      highlights: [
        'Python for AI Applications',
        'Supervised & Unsupervised Learning',
        'LLMs, RAG, and Model Fine-Tuning',
        'AI Agents & Deployment',
        'Project-Based Learning',
      ],
      badge: 'Cutting Edge',
      icon: '🤖',
      link: '/aiml-bootcamp',
    },
     {
      id: 'IBFO',
      title: 'Internship cum Training Program in Investment Banking & Finance Operations',
      price: currency === 'INR' ? '₹5,000 + GST' : `$${basePrice}`,
      duration: ['12 weeks | Hybrid | Total Hours: 125'],
      description: 'Develops job-ready talent for global banking and finance operations by simulating real-world processes across trading, settlements, risk, and corporate actions.',
      highlights: [
        'Financial Markets & Investment Banking Fundamentals',
        'Trade Life Cycle, Settlements & Reconciliation',
        'Derivatives, Collateral, and Corporate Actions',
        'Asset Management & Compliance (AML/KYC)',
        'Industry-Aligned, Project-Based Curriculum',
      ],
      badge: 'High Demand',
      icon: '💼',
      link: '/investment-banking-bootcamp',
    }
  ];

  return (
    <section className={`${sectionClass ?? ''}`} id="programs">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
           Modern Internship Programs Built for Today’s Job Market
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-4xl">
            Equip your learners with industry-aligned Internship cum Training (IcT) programs that map directly to emerging job roles. Each program integrates practical tools, structured learning, and employer-relevant project work.
          </p>
        </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
  {programs.map((program) => (
    <div key={program.id}>
      <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border-gray hover:border-primary-green bg-white relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-primary-green text-white px-3 py-1 rounded-full text-xs font-semibold">
            {program.badge}
          </span>
        </div>
        <CardContent className="p-6 h-full flex flex-col">
          <div className="text-5xl mb-4">{program.icon}</div>
          <h3 className="text-lg md:text-xl font-bold text-dark-gray mb-3">
            {program.title}
          </h3>
          <div className="space-y-1 mb-5">
            {program.duration.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-primary-green shrink-0" />
                <p className="text-sm text-medium-gray">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-dark-gray leading-relaxed mb-4 grow">
            {program.description}
          </p>
          <div className="space-y-1">
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


        <div className="mt-10 flex sm:flex-row flex-col justify-center gap-4">

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
