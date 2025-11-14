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
    title: 'Outcome-Driven Learning',
    description:
      'Students acquire job-aligned competencies that map directly to high-demand roles across Data Science, AI, Analytics, Finance, and more.',
  },
  {
    icon: <Brain className="w-12 h-12 text-primary-green" />,
    title: 'Applied Learning',
    description:
      'Hands-on projects and case studies from real industry problems.',
  },
  {
    icon: <Laptop2 className="w-12 h-12 text-primary-green" />,
    title: 'Applied, Industry-Relevant Training',
    description:
      'Hands-on projects, case studies, and tool-based learning expose students to real industry workflows and challenges.',
  },
  {
    icon: <BadgeCheck className="w-12 h-12 text-primary-green" />,
    title: 'Hybrid Delivery for Maximum Adoption',
    description:
      'A balanced blend of live sessions, mentoring, and guided workshops ensures high student participation and engagement.',
  },
  {
    icon: <BadgeCheck className="w-12 h-12 text-primary-green" />,
    title: 'Dual Certification for Institutional Credibility',
    description:
      'Students earn both internship and training credentials — enhancing your institution’s academic value and external perception.',
  },
];

const TransformAcademic = ({ sectionClass }: Props) => {
  return (
    <section className={`${sectionClass ?? ''} overflow-x-hidden`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
             Strengthen Your Institution’s Academic Value with Industry-Integrated Internship Programs
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-4xl">
            Our Internship cum Training (IcT) programs seamlessly integrate with your existing curriculum, adding a layer of real-world professional capability that elevates student outcomes and institutional performance.
          </p>
        </div>

        {/* Responsive two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left section (cards) */}
          <div className="lg:col-span-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
  {features.map((feature, index) => (
    <Card
      key={index}
      className={`h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white 
      ${index === features.length - 1 ? "sm:col-span-2" : ""}`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold text-dark-gray mb-2">
          {feature.title}
        </h3>
        <p className="text-medium-gray leading-relaxed grow">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  ))}
</div>

          </div>

          {/* Right image section */}
          <div className="lg:col-span-4">
            <img
              className="w-full h-auto rounded-md object-cover"
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
