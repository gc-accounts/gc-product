import React from 'react'
import DsForm from './DsForm';
const DsEnrollmentFormSection = () => {
  
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
        text: '18 months career support and career guidance.'
      }
    ];


    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                  Your Data Science Career Starts Here
              </h2>
              
              <div className="space-y-4 lg:space-y-6">
                {taglines.map((tagline, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0">{tagline.icon}</div>
                    <p className="text-lg text-dark-gray leading-relaxed">
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