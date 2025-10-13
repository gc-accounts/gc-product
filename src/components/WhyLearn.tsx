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
        icon: "📈",
        title: "High Demand, Higher Pay",
        description: "3x more job openings than available candidates. Companies competing for talent.",
      },
      {
        icon: "🤖",
        title: "Future-Proof Career",
        description: "AI and ML driving business decisions across all industries. Secure your future.",
      },
      {
        icon: "💼",
        title: "Ample Job Opportunities",
        description: "The demand for data professionals is booming — over 11 million openings expected globally by 2026.",
      }
    ]
  },
  {
    id: 2,
    url: 'data-analyst-bootcamp',
    insights: [
      {
              icon: "📈",
              title: "High Demand, Higher Pay",
              description: "More job openings than qualified candidates. Companies competing for talent.",
            },
             {
              icon: "💼",
              title: "Ample Job Opportunities",
              description: "The demand for data professionals is booming — over 11 million openings expected globally by 2026.",
            },
            {
              icon: "🚀",
              title: "Clear Career Growth",
              description: "Progress from Analyst → Senior Analyst → Analytics Manager → Director",
            }
    ]
  },
   // START: Third Bootcamp Data Added
  {
    id: 3,
    url: 'aiml-bootcamp',
    insights: [
      {
        icon: "💰",
        title: "Highest Paid Tech Role",
        description: "40% more salary than software engineers. Most valuable tech skill.",
      },
      {
        icon: "💼",
        title: "Ample Job Opportunities",
        description: "The demand for AI/ML professionals is booming — over 22 million openings expected globally by 2026.",
      },
      {
        icon: "🚀",
        title: "Future of Tech",
        description: "AI will define the next decade. Get ahead of the curve.",
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

const WhyLearn = ({ sectionClass, title, subText, url }: Props) => {
  // FIX: Use usePathname to automatically detect the current URL path.
  const pathname = usePathname();

  // 1. Determine the slug to search for. 
  // If the 'url' prop is passed, use it.
  // Otherwise, extract the last segment of the current pathname.
  const pathSegment = url || pathname.split('/').pop() || '';

  // 2. Choose which data set to use based on the pathSegment or default to the first.
  const current = data.find(d => d.url === pathSegment) || data[0];

  return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
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

export default WhyLearn;
