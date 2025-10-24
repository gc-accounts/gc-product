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
    url: '/',
    insights: [
      {
        icon: "🌍",
        title: "Pervasive Market Relevance",
        description:
          "The influence of data science and AI is now evident across all fields of work, including construction, manufacturing, and electronics.",
      },
      {
        icon: "💡",
        title: "Competitive Edge",
        description:
          "An understanding of these emerging technologies will give students an immediate edge in the competitive job market, securing better roles across all industries.",
      },
      {
        icon: "📈",
        title: "Universal Application",
        description:
          "Deep analytics and AI agents are used for multiple use cases across all areas of work. These powerful tools offer solutions for a broad spectrum of real-world challenges.",
      },
      {
        icon: "🎓",
        title: "Accessibility & Foundation",
        description:
          "The program is fully accessible to all streams of engineering (5th to 8th semesters eligible), and concepts are taught from the basics specifically for the benefit of non-IT branches.",
      },
    ],
  },
];


interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  url?: string;
}

const OpenStudents = ({ sectionClass, title, subText, url }: Props) => {
  // Use usePathname to automatically detect the current URL path.
  const pathname = usePathname();
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

export default OpenStudents;
