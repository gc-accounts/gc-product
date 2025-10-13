'use client'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import React, { useState } from 'react';

// Define the interface for a single testimonial item
interface TestimonialItem {
    name: string;
    role: string;
    achievement: string;
    quote: string;
    rating: number;
    avatar: string;
}

interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
  data?: TestimonialItem[]; // Use the defined interface for strong typing
}
    
    
    const Testimonials = ({ sectionClass, title, subText, data }: Props) => {
    
    // FIX 1: Add guard clause to ensure data is present and an array
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
      // FIX 2: Use data.length
      setCurrentTestimonial((prev) => (prev + 1) % data.length);
    };

    const prevTestimonial = () => {
      // FIX 2: Use data.length
      setCurrentTestimonial((prev) => (prev - 1 + data.length) % data.length);
    };

    // Auto-play carousel
    React.useEffect(() => {
      // data.length is safe here due to the initial guard clause
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % data.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [data.length]);

    const currentItem = data[currentTestimonial]; // Convenience variable for cleaner access

    return (
       <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p>
        </div>


          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <div
                key={currentTestimonial}
                className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden transition-opacity duration-500"
              >
                {/* Green Header Bar */}
                <div className="h-10 bg-primary-green"></div>

                <div className="p-6 lg:p-8">
                  {/* Avatar (Un-commented and fixed) */}
                  <div className="flex justify-center -mt-16 mb-6">
                    <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-green flex items-center justify-center text-3xl shadow-md">
                      {currentItem.avatar}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-center mb-6">
                    <p className="text-lg text-medium-gray italic leading-relaxed">
                      &ldquo;{currentItem.quote}&rdquo; {/* FIX 3: Use currentItem */}
                    </p>
                  </blockquote>

                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-dark-gray mb-1">
                      {currentItem.name} {/* FIX 3: Use currentItem */}
                    </h3>
                    <p className="text-primary-green font-medium">
                      {currentItem.role} {/* FIX 3: Use currentItem */}
                    </p>
                    {/* Achievement (Un-commented and fixed) */}
                    <p className="text-sm font-bold text-medium-gray mt-1">
                      {currentItem.achievement}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center">
                    {/* FIX 3: Use currentItem */}
                    {[...Array(currentItem.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-gold fill-accent-gold" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 lg:-left-12 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-border-gray hover:bg-primary-green hover:text-white transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 lg:-right-12 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border border-border-gray hover:bg-primary-green hover:text-white transition-all duration-300 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {/* FIX 4: Use data.map */}
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-primary-green' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
export default Testimonials
