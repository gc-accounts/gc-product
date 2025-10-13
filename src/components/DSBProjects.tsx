'use client'
import React from 'react'
import { Card, CardContent } from './ui/card';


  const projects = [
      {
        title: 'Retail Sales Analytics',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Analyze 1M+ transactions from an e-commerce platform. Extract insights on customer behavior, product performance, and seasonal trends. Create interactive dashboards for business teams.',
        techStack: ['Python', 'SQL', 'Power BI', 'Pandas'],
        learnings: [
          'Data pipeline creation',
          'SQL optimization',
          'Dashboard design'
        ],
        outcome: 'Interactive dashboard, insights report, 20-page analysis',
        gradient: 'from-primary-green to-accent-blue'
      },
      {
        title: 'Client Churn Risk Analysis',
        duration: '3 weeks',
        difficulty: 4,
        description: 'Build a machine learning model to predict customer churn for a telecom company. Use advanced feature engineering and ensemble methods to achieve 85%+ accuracy.',
        techStack: ['Python', 'Scikit-learn', 'Pandas'],
        learnings: [
          'Feature engineering techniques',
          'Model ensemble methods',
          'Business impact measurement'
        ],
        outcome: 'Production-ready ML model, business recommendations, ROI analysis',
        gradient: 'from-accent-blue to-primary-green'
      },
      {
        title: 'Housing Market Analytics',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Develop a comprehensive model to predict property prices using location, amenities, and market data. Create a web application for real estate agents.',
        techStack: ['Python', 'Flask', 'Plotly'],
        learnings: [
          'Web application development',
          'Geospatial data analysis',
          'Model deployment'
        ],
        outcome: 'Web app, API endpoints, market analysis report',
        gradient: 'from-accent-gold to-primary-green'
      }
    ];


interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}
const DSBProjects = ({ sectionClass, title, subText }: Props) => {

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

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green overflow-hidden">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${project.gradient} p-6 text-white relative`}>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐{'⭐'.repeat(project.difficulty - 1)}☆{'☆'.repeat(5 - project.difficulty)} ({project.difficulty}/5)
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6 h-fit flex flex-col">
                    <p className="text-dark-gray text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-dark-gray mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-primary-green text-white px-2 py-1 rounded text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-dark-gray mb-2">Key Learnings</h4>
                        <ul className="space-y-1">
                          {project.learnings.map((learning, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-dark-gray leading-relaxed">{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border-gray">
                        <h4 className="text-sm font-bold text-primary-green mb-1">Outcome</h4>
                        <p className="text-xs text-dark-gray leading-relaxed">
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

      </section>
    );
  };
export default DSBProjects;