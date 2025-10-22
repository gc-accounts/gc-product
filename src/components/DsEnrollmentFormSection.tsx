import React from 'react'
import DsForm from './DsForm';

  interface Props {
  sectionClass?: string;
}
const DsEnrollmentFormSection = ({ sectionClass }: Props) => {



  const taglines = [
      {
        icon: '💡',
        text: 'Affordable education. World-class quality.'
      },
      {
        icon: '👨‍🏫',
        text: 'Learn from industry experts with 10+ years experience.'
      },
      {
        icon: '📁',
        text: 'Build a portfolio of real-world projects.'
      },
      {
        icon: '💼',
        text: '100% placement assistance.'
      },
      {
        icon: '♾️',
        text: 'Career support and career guidance.'
      }
    ];


    return (
      <section className={`${sectionClass ? sectionClass : ''}`}>
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                  Your Data Science Career Starts Here
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
                      <DsForm/>

            </div>
          </div>
        </div>
      </section>
    );
  };

export default DsEnrollmentFormSection