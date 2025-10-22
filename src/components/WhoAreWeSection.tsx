  'use client'
import React from 'react';

interface Props {
  sectionClass?: string;
}


const WhoAreWeSection = ({ sectionClass  }: Props) => {


    return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
           <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Empowering Careers Through Affordable Education
              </h2>
              <p className="text-base text-medium-gray leading-relaxed">
                Bridging the gap between ambition and opportunity
              </p>
              
              <div className="space-y-6">
                <p className="text-base text-medium-gray leading-relaxed">
                  With the rise in demand for AI and ML skills, we understand the challenge of getting affordable courses to every corner of the world. That's why Greycampus is dedicated to making world-class tech education accessible to everyone. We've designed our bootcamps to combine deep industry expertise, a practical, cutting-edge curriculum, and personalized mentorship—all delivered at prices that won't break the bank.
                </p>
                <p className="text-base text-medium-gray leading-relaxed">
                  We've trained over 50,000+ students who have successfully transformed their careers at leading companies worldwide.
                </p>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">50,000+</div>
                  <div className="text-sm text-medium-gray">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">85%</div>
                  <div className="text-sm text-medium-gray">NPS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">400+</div>
                  <div className="text-sm text-medium-gray">Hiring associations</div>
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
          <div className="relative">
            <div className="relative">
              {/* Abstract illustration representing transformation */}
              <div className="w-full h-96 bg-linear-to-br from-primary-green/20 to-accent-blue/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-primary-green/30 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-12 h-12 bg-accent-blue/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-accent-gold/30 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-8 right-8 w-14 h-14 bg-primary-green/30 rounded-full animate-pulse delay-500"></div>
                
                {/* Central icon */}
                <div className="text-8xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  };
export default WhoAreWeSection