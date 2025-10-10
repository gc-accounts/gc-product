'use client'
import { CheckCircle } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
  const DsCurriculum = () => {
    const modules = [
      {
        id: 'statistics',
        title: 'Statistics Fundamentals',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Descriptive statistics',
          'Probability theory',
          'Distributions and hypothesis testing',
          'Statistical inference',
          'Application to real-world problems'
        ],
        outcomes: [
          'Understand statistical fundamentals',
          'Perform statistical analysis',
          'Interpret results for business insights'
        ],
        tools: ['Python', 'SciPy', 'Statsmodels'],
        projects: 'None yet (foundation module)'
      },
      {
        id: 'python',
        title: 'Python for Data Wizards',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Python basics and data structures',
          'NumPy and Pandas mastery',
          'Data manipulation and cleaning',
          'File I/O and data formats',
          'Basic visualization with Matplotlib'
        ],
        outcomes: [
          'Master Python for data science',
          'Handle large datasets efficiently',
          'Clean and preprocess data'
        ],
        tools: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
        projects: 'Data cleaning challenge'
      },
      {
        id: 'sql',
        title: 'SQL Mastery',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Database fundamentals',
          'Complex queries and joins',
          'Window functions and CTEs',
          'Query optimization',
          'Database design principles'
        ],
        outcomes: [
          'Write complex SQL queries',
          'Optimize database performance',
          'Design efficient database schemas'
        ],
        tools: ['MySQL', 'SQLite'],
        projects: 'E-commerce database analysis'
      },
      {
        id: 'eda',
        title: 'EDA in Python',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Exploratory data analysis techniques',
          'Statistical visualization',
          'Correlation and causation',
          'Outlier detection and treatment',
          'Data quality assessment'
        ],
        outcomes: [
          'Perform comprehensive EDA',
          'Create compelling visualizations',
          'Identify data quality issues'
        ],
        tools: ['Seaborn', 'Plotly', 'Pandas', 'Matplotlib'],
        projects: 'Customer behavior analysis'
      },
      {
        id: 'powerbi',
        title: 'Power BI',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Power BI interface and basics',
          'Data modeling and relationships',
          'DAX formulas and measures',
          'Interactive dashboards',
          'Report publishing and sharing'
        ],
        outcomes: [
          'Build interactive dashboards',
          'Create business intelligence reports',
          'Share insights with stakeholders'
        ],
        tools: ['Power BI', 'DAX', 'Power Query'],
        projects: 'Sales performance dashboard'
      },
      {
        id: 'ml',
        title: 'Machine Learning',
        duration: '4 weeks',
        difficulty: 4,
        topics: [
          'Supervised and unsupervised learning',
          'Regression and classification algorithms',
          'Model evaluation and validation',
          'Feature engineering and selection',
          'Hyperparameter tuning'
        ],
        outcomes: [
          'Build and deploy ML models',
          'Evaluate model performance',
          'Apply ML to real business problems'
        ],
        tools: ['Scikit-learn', 'TensorFlow'],
        projects: 'Predictive modeling challenge'
      },
      {
        id: 'genai',
        title: 'Generative AI Frontier',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'Large Language Models (LLMs)',
          'Prompt engineering techniques',
          'AI integration in data workflows',
          'Ethical AI considerations',
          'Future of AI in data science'
        ],
        outcomes: [
          'Leverage AI tools effectively',
          'Integrate LLMs in data projects',
          'Stay ahead of AI trends'
        ],
        tools: ['OpenAI API', 'Hugging Face', 'LangChain'],
        projects: 'AI-powered data analysis tool'
      },
      {
        id: 'capstone',
        title: 'Capstone Challenge',
        duration: '4 weeks',
        difficulty: 5,
        topics: [
          'End-to-end project planning',
          'Data pipeline development',
          'Model deployment and monitoring',
          'Business presentation skills',
          'Portfolio development'
        ],
        outcomes: [
          'Complete a full data science project',
          'Present findings to stakeholders',
          'Build a professional portfolio'
        ],
        tools: ['All previous tools', 'Docker', 'AWS', 'Git'],
        projects: 'Industry capstone project'
      }
    ];

    const [activeModule, setActiveModule] = useState('statistics');

    const getDifficultyStars = (difficulty: number) => {
      return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
    };

    return (
      <section id="curriculum" className="py-10 sm:py-15 lg:py-20 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              What You&apos;ll Learn
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              3 months of comprehensive, industry-aligned curriculum
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Module Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeModule === module.id
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
                  className={`transition-all duration-500 ${activeModule === module.id ? 'block' : 'hidden'
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
                              <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
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
                              <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0 mt-0.5" />
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

                        <div className="text-right">
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

export default DsCurriculum