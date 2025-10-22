'use client'
import React from 'react';
// FIX: Import the necessary hook from Next.js navigation system
import { usePathname } from 'next/navigation'; 
import { Card, CardContent } from './ui/card';

// Define interfaces for better type safety
interface Insight {
  icon: string;
  title: string;
  description: string;
}

interface BootcampData {
  id: number;
  url: string;
  insights: Insight[];
}

const data: BootcampData[] = [
  {
    id: 1,
    url: 'data-science-bootcamp',
    insights: [
      {
        icon: "🎯",
        title: "Interview Preparation",
        description: "Sessions focused on technical questions and behavioral interviews for data and AI roles.",
      },
      {
        icon: "💼",
        title: "Access to Job Portal",
        description: "Exclusive access to a curated job board with verified openings from top companies.",
      },
      {
        icon: "💬",
        title: "Mock Interviews",
        description: "Mock interviews to provide detailed, actionable feedback to sharpen your confidence and skills.",
      },
      {
        icon: "✨",
        title: "AI Resume Builder",
        description: "Optimize your profile and create a polished, ATS-friendly resume that stands out.",
      }
    ]
  }
];

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  // NOTE: The 'url' prop is now optional, as the component tries to determine it internally.
  // It can still be used to override the internal URL detection if needed.
  url?: string;
}

const CareerServices = ({ sectionClass, title, subText, url }: Props) => {
  // Use usePathname to automatically detect the current URL path.
  const pathname = usePathname();

  // Determine the slug to search for. 
  // If the 'url' prop is passed, use it.
  // Otherwise, extract the last segment of the current pathname.
  const pathSegment = url || pathname === '/' ? '/' : pathname.split('/').pop() || '';

  // Choose which data set to use based on the pathSegment or default to the first.
  const current = data.find(d => d.url === pathSegment) || data[0];

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

        <div className={`grid ${current.insights.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 lg:gap-8`}>
          {current.insights.map((insight, index) => (
            <div key={index}>
              <Card className={`bg-white border border-border-gray hover:border-primary-green transition-all duration-300 h-full`}>
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="text-3xl mb-3">{insight.icon}</div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-sm lg:text-base text-medium-gray leading-relaxed">
                    {insight.description}
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

export default CareerServices;
