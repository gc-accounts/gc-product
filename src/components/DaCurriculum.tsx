'use client'
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react'

  const modules = [
      {
        id: 'statistics',
        title: 'Applied Statistics for Data Science',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Descriptive and inferential statistics',
          'Probability distributions',
          'Hypothesis testing for business decisions',
          'Statistical inference and confidence intervals'
        ],
        outcomes: [
          'Understand statistical fundamentals',
          'Perform statistical analysis',
          'Interpret results for business insights'
        ],
        tools: ['Python', 'SciPy', 'Statsmodels']
      },
      {
        id: 'sql',
        title: 'Advanced SQL for Data Analysis',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Complex queries and window functions',
          'Query optimization',
          'Real databases and performance tuning',
          'Analytics SQL patterns'
        ],
        outcomes: [
          'Write optimized queries',
          'Performance tuning',
          'Analytics SQL expertise'
        ],
        tools: ['MySQL']
      },
      {
        id: 'powerbi1',
        title: 'Power BI – Data Integration & Power Query',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Data import and ETL processes',
          'Power Query transformations',
          'Data modeling basics',
          'Data pipeline creation'
        ],
        outcomes: [
          'Transform and model data',
          'Create data pipelines',
          'Power Query mastery'
        ],
        tools: ['Power BI', 'Excel', 'Power Query']
      },
      {
        id: 'powerbi2',
        title: 'Power BI – Modeling, DAX & Visual Analytics',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'DAX formulas and measures',
          'Dashboard design principles',
          'BI concepts and best practices',
          'Advanced visualizations'
        ],
        outcomes: [
          'Create advanced dashboards',
          'DAX expertise',
          'BI thinking and design'
        ],
        tools: ['Power BI', 'DAX']
      },
      {
        id: 'eda',
        title: 'Exploratory Data Analysis (EDA) Techniques',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Data visualization techniques',
          'Pattern recognition methods',
          'Insight extraction strategies',
          'Professional visualization standards'
        ],
        outcomes: [
          'Find patterns in data',
          'Create professional visualizations',
          'Extract actionable insights'
        ],
        tools: ['Python', 'Matplotlib', 'Seaborn', 'Plotly']
      },
      {
        id: 'python',
        title: 'Python for Data Analysis',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Pandas mastery for data manipulation',
          'NumPy operations and arrays',
          'Data cleaning and preprocessing',
          'Python data analysis workflows'
        ],
        outcomes: [
          'Data manipulation expertise',
          'Preprocessing mastery',
          'Python analytics proficiency'
        ],
        tools: ['Python', 'Pandas', 'NumPy']
      },
      {
        id: 'ml',
        title: 'Machine Learning & Feature Engineering',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'Predictive analytics fundamentals',
          'Feature selection techniques',
          'Model evaluation methods',
          'Business outcome prediction'
        ],
        outcomes: [
          'Build ML models',
          'Predict business outcomes',
          'Feature engineering expertise'
        ],
        tools: ['Scikit-learn', 'Python', 'ML libraries']
      },
      {
        id: 'genai',
        title: 'Generative AI Applications',
        duration: '1 week',
        difficulty: 2,
        topics: [
          'LLMs for analytics workflows',
          'AI-powered insights generation',
          'Prompt engineering for data analysis',
          'ChatGPT for analytics tasks'
        ],
        outcomes: [
          'Leverage AI for productivity',
          'ChatGPT for analytics',
          'AI integration in workflows'
        ],
        tools: ['OpenAI APIs', 'ChatGPT', 'LLMs']
      },
      {
        id: 'capstone',
        title: 'Capstone Project – End-to-End Data Solution',
        duration: '1 week',
        difficulty: 4,
        topics: [
          'Real-world analysis projects',
          'Presentation and communication',
          'Portfolio building',
          'Job-ready skills demonstration'
        ],
        outcomes: [
          'Portfolio-ready project',
          'Job-ready skills',
          'End-to-end solution delivery'
        ],
        tools: ['All learned tools', 'Presentation skills']
      }
    ];

    interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}

    const DaCurriculum = ({ sectionClass, title, subText }: Props) => {
  
    const [activeModule, setActiveModule] = useState('statistics');

    const getDifficultyStars = (difficulty: number) => {
      return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
    };

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
          
          <div className="max-w-6xl mx-auto">
            {/* Module Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeModule === module.id
                      ? 'bg-primary-green text-white shadow-md'
                      : 'bg-gray-200 text-dark-gray hover:bg-medium-gray hover:text-white'
                  }`}
                >
                  {module.title}
                </button>
              ))}
            </div>
            
            {/* Module Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden">
              {modules.map((module) => (
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
                          <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {module.duration}
                          </span>
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
                        <div>
                          <h4 className="text-lg font-semibold text-dark-gray mb-2">Tools & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.tools.map((tool, index) => (
                              <span key={index} className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                                {tool}
                              </span>
                            ))}
                          </div>
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

export default DaCurriculum