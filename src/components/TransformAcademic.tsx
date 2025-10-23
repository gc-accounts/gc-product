'use client'
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Goal, Brain, Laptop2, BadgeCheck } from 'lucide-react';

interface Props {
  sectionClass?: string;
}

const features = [
  {
    icon: <Goal className="w-12 h-12 text-primary-green" />,
    title: 'Outcome-Driven',
    description: 'Students graduate with skills that directly map to in-demand roles in Data Science and AI.',
  },
  {
    icon: <Brain className="w-12 h-12 text-primary-green" />,
    title: 'Applied Learning',
    description: 'Hands-on projects and case studies from real industry problems.',
  },
  {
    icon: <Laptop2 className="w-12 h-12 text-primary-green" />,
    title: 'Hybrid Flexibility',
    description: 'A mix of live sessions, mentoring, and guided campus workshops for maximum engagement.',
  },
  {
    icon: <BadgeCheck className="w-12 h-12 text-primary-green" />,
    title: 'Dual Certification',
    description: 'Endorsed internship and training credentials that add measurable value to your institution’s outcomes.',
  },
];

const TransformAcademic = ({ sectionClass }: Props) => {
  return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
            Transforming Potential into Professional Assets
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
            Our Internship cum Training (IcT) programs are designed to seamlessly complement your strong academic foundation, embedding a layer of current, real-world professional competency that ensures students are job-ready specialists upon graduation.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <div key={index}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="mb-6">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-dark-gray mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-medium-gray leading-relaxed grow">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4">
            <img
              className="w-full h-auto rounded-md"
              src="https://strapi.greycampus.com/uploads/GC_c5f03b9e0f.webp"
              alt="Transforming Potential"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformAcademic;
