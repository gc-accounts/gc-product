'use client'
import { CheckCircle } from 'lucide-react';
import React from 'react'
import { useState, useEffect } from 'react'; // Added useEffect
import { IBFOCurriculumData } from './data/IBFOCurriculumData';
interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}

const IbfoCurriculum = ({ sectionClass, title, subText }: Props) => {
  const [activeModule, setActiveModule] = useState('Overview of Financial Markets and Investment Banking');
  const [isClient, setIsClient] = useState(false); // Added client state

  // Add useEffect to handle client-side only operations
  useEffect(() => {
    setIsClient(true);
    
    // Clean up fdprocessedid attributes if they exist
    const cleanupAttributes = () => {
      if (typeof document !== 'undefined') {
        document.querySelectorAll('[fdprocessedid]').forEach(el => {
          el.removeAttribute('fdprocessedid');
        });
      }
    };
    
    cleanupAttributes();
    
    // Run cleanup after a short delay to catch any dynamically added attributes
    const timeoutId = setTimeout(cleanupAttributes, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

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

        <div className="max-w-6xl mx-auto">
          {/* Module Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
            {IBFOCurriculumData.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeModule === module.id
                    ? 'bg-primary-green text-white shadow-md'
                    : 'bg-gray-200 text-dark-gray hover:bg-medium-gray hover:text-white'
                }`}
                suppressHydrationWarning // Added to prevent hydration warnings
              >
                {module.title}
              </button>
            ))}
          </div>

          {/* Module Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden">
            {IBFOCurriculumData.map((module) => (
              <div
                key={module.id}
                className={`transition-all duration-500 ${
                  activeModule === module.id ? 'block' : 'hidden'
                }`}
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-2">
                        {module.title}
                      </h3>
                      <div className="flex items-center space-x-4">
                       {module.duration && <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {module.duration}
                        </span> } 
                        <span className="text-sm text-medium-gray">
                          Difficulty: {getDifficultyStars(module.difficulty)} ({module.difficulty}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-dark-gray mb-3">Topics Covered</h4>
                      <ul className="space-y-2">
                        {module.topics.map((topic, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 shrink-0"></div>
                            <span className="text-dark-gray text-sm leading-relaxed">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-dark-gray mb-3">Key Outcomes</h4>
                      <ul className="space-y-2">
                        {module.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary-green shrink-0 mt-0.5" />
                            <span className="text-dark-gray text-sm leading-relaxed">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border-gray">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* <div>
                        <h4 className="text-lg font-semibold text-dark-gray mb-2">Tools & Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.tools.map((tool, index) => (
                            <span
                              key={index}
                              className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div> */}

                      <div className="">
                        <h4 className="text-lg font-semibold text-dark-gray mb-2">Projects</h4>
                        <p className="text-medium-gray text-sm">{module.projects}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IbfoCurriculum;