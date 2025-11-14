  'use client'
import Image from 'next/image';
import React from 'react';

interface Props {
  sectionClass?: string;
}


const WhoAreWeSection = ({ sectionClass  }: Props) => {


    return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
           <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Why Partner with GreyCampus
              </h2>
          
              
              <div className="space-y-6">
                <p className="text-base text-medium-gray leading-relaxed">
                  Since 2014, GreyCampus has been at the forefront of skill-based education — helping institutions and learners stay ahead of emerging technologies.
                   Our Internship cum Training (ICT) Programs bring together academic rigor, industry insights, and project-based learning to ensure every student graduates career-ready.
                </p>
                <p className="text-base text-medium-gray leading-relaxed">
                  We’ve empowered over 50,000+ students worldwide through programs designed with real-world relevance and guided by expert mentors from academia and industry.
                </p>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="">
                  <div className="text-3xl font-bold text-primary-green mb-2">50,000+</div>
                  <div className="text-sm text-medium-gray">Students Trained</div>
                </div>
                <div className="">
                  <div className="text-3xl font-bold text-primary-green mb-2">85%</div>
                  <div className="text-sm text-medium-gray">NPS (Industry-Leading Satisfaction)</div>
                </div>
                <div className="">
                  <div className="text-3xl font-bold text-primary-green mb-2">10+</div>
                  <div className="text-sm text-medium-gray">Years of Expertise in Career-Focused Education</div>
                </div>
              </div>
              
              {/* <Button 
                variant="outline" 
                className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
              >
                Read Our Story
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button> */}
            </div>
          </div>
          
          {/* Right Content - Visual */}
          <div className="relative w-full h-full">
                  <Image 
                  src={'https://strapi.odinschool.com/uploads/GC_Home_8ec8094e0f.webp'}
                  alt='who are we bg'
                  fill
                  className='object-cover'
                  />
          </div>
        </div>
      </div>
    </section>
    );
  };
export default WhoAreWeSection