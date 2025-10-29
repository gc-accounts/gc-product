'use client'
import React from 'react'
import { Card, CardContent } from './ui/card';


  const projects = [
      {
        title: '💹 Insider Trading & Market Surveillance',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Simulate how global banks monitor suspicious trading activity and detect insider trading risks using compliance systems.',
        techStack: [],
        learnings: [
          'Understand trade surveillance mechanisms and red-flag indicators',
          'Learn how compliance teams investigate unusual trading patterns',
          'Apply KYC and AML principles in monitoring financial transactions'
        ],
        outcome: 'Compliance alert report and case analysis on insider trading scenarios',
        gradient: 'from-primary-green to-accent-blue'
      },
      {
        title: '💳 Clearing & Settlement Breakdown',
        duration: '3 weeks',
        difficulty: 4,
        description: 'Resolve a simulated trade settlement failure while applying global recovery and reconciliation protocols used in investment banks.',
        techStack: [],
        learnings: [
          'Learn trade life cycle from execution to settlement',
          'Apply fail recovery and exception handling processes',
          'Understand SWIFT messaging and settlement reporting standards'
        ],
        outcome: 'End-to-end settlement workflow report with reconciliation summary',
        gradient: 'from-accent-blue to-primary-green'
      },
      {
        title: '📈 Corporate Actions Management',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Manage complex corporate actions such as mergers, stock splits, and dividends while ensuring smooth reconciliation and communication.',
        techStack: [],
        learnings: [
          'Understand various types of corporate actions and their implications',
          'Learn reconciliation and record-keeping for corporate events',
          'Handle event communication and lifecycle tracking'
        ],
        outcome: 'Corporate action lifecycle documentation and event summary report',
        gradient: 'from-accent-gold to-primary-green'
      }
    ];


interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}
const IbfoProjects = ({ sectionClass, title, subText }: Props) => {

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

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green overflow-hidden">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${project.gradient} p-6 text-white relative`}>
                    <h3 className="text-base lg:text-xl font-semibold">
                      {project.title}
                    </h3>
                    {/* <div className="flex items-center space-x-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐{'⭐'.repeat(project.difficulty - 1)}☆{'☆'.repeat(5 - project.difficulty)} ({project.difficulty}/5)
                      </span>
                    </div> */}
                  </div>

                  <CardContent className="p-6 h-fit flex flex-col">
                    <p className="text-dark-gray text-sm leading-relaxed mb-6 grow">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      {
                        project.techStack.length > 0 && 
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
                      }
             

                      <div>
                        <h4 className="text-sm font-semibold text-dark-gray mb-2">Key Learnings</h4>
                        <ul className="space-y-1">
                          {project.learnings.map((learning, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-primary-green rounded-full mt-2 shrink-0"></div>
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
export default IbfoProjects;