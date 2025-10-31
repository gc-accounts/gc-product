import React from 'react'
import AIMLForm from './AimlForm';

  interface Props {
  sectionClass?: string;
}
const AimlEnrollmentFormSection = ({ sectionClass }: Props) => {

    const taglines = [
      {
        icon: '🔬',
        text: 'Cutting-edge AI curriculum at affordable prices'
      },
      {
        icon: '👨‍💻',
        text: 'Learn from engineers at Google, Meta, Amazon'
      },
      {
        icon: '🏆',
        text: 'Build production-grade AI projects'
      },
      {
        icon: '💰',
        text: '90%+ placement at ₹12L-18L range'
      },
      {
        icon: '♾️',
        text: 'Lifetime mentorship and career support'
      }
    ];

    return (
       <section className={`${sectionClass ? sectionClass : ''}`}>
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-6 lg:mb-8">
                Your AI/ML Career Starts Here
              </h2>
              
              <div className="space-y-4 lg:space-y-6">
                {taglines.map((tagline, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl shrink-0">{tagline.icon}</div>
                    <p className="text-base text-dark-gray leading-relaxed">
                      {tagline.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Form */}
            <div className="mt-8 lg:mt-0">
                      <AIMLForm/>

            </div>
          </div>
        </div>
      </section>
    );
  };

export default AimlEnrollmentFormSection