'use client'
import React from 'react';
import { Handshake, BookOpen, Users, CheckCircle2, Briefcase } from 'lucide-react';

const partnershipSteps = [
  {
    icon: <Handshake className="w-10 h-10 text-primary-green mb-3" />,
    title: "Onboarding",
    description:
      "GreyCampus collaborates with your institution to formalize the partnership, finalize student batches, and align the program calendar with your semester plan.",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-primary-green mb-3" />,
    title: "Orientation & Enrollment",
    description:
      "Students are introduced to the program structure, learning platform, and expectations through an orientation session jointly hosted by GreyCampus and the college.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary-green mb-3" />,
    title: "Hybrid Learning Delivery",
    description:
      "Live weekend sessions led by industry experts, weekday mentorship and project guidance, plus on-campus workshops, ensure a balanced and engaging learning journey.",
  },
  {
    icon: <CheckCircle2 className="w-10 h-10 text-primary-green mb-3" />,
    title: "Project Evaluation & Certification",
    description:
      "Once students complete capstone projects, they are awarded Internship & Course Completion Certificates from GreyCampus Edutech Pvt Ltd.",
  },
];

const postProgramBenefit = {
  icon: <Briefcase className="w-10 h-10 text-primary-green mb-3" />,
  title: "Post-Program Benefit:",
  description: (
    <>
      All successful participants gain <span className="text-primary-green font-medium">exclusive access to the GreyCampus Placement Portal</span>,
      enabling them to apply for internships and full-time opportunities with our network of <span className="font-semibold">400+ hiring partners</span>.
    </>
  ),
};

interface Props {
  sectionClass?: string;
}

const IctPartnershipSection = ({ sectionClass }: Props) => (
  <section className={sectionClass ? sectionClass : ''}>
    <div className="container mx-auto max-w-7xl px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-4">
          Seamless Integration. Maximum Impact.
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-medium-gray leading-relaxed max-w-5xl mx-auto">
          Our Internship cum Training (ICT) Programs are designed for effortless adoption by colleges—
          from onboarding to student certification and post-training career enablement.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 flex-1 gap-6 mb-8 lg:mb-0">
          {partnershipSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-border-gray p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {step.icon}
              <h4 className="text-md font-semibold text-dark-gray mb-2 border-b border-border-gray w-full pb-2">{step.title}</h4>
              <p className="text-medium-gray text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        {/* Benefit Box */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="bg-[#E6F8F1] border border-primary-green rounded-lg p-6 flex flex-col items-center text-center shadow-md h-full min-h-[220px]">
            {postProgramBenefit.icon}
              <h4 className="text-lg font-bold text-primary-green mb-1">{postProgramBenefit.title}</h4>
              <p className="text-dark-gray text-sm leading-relaxed">{postProgramBenefit.description}</p>

          </div>
        </div>
      </div>
    </div>
  </section>
);

export default IctPartnershipSection;
