'use client'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
  sectionClass?: string;
}


const TestimonialsSection = ({ sectionClass  }: Props) => {

        const testimonials = [
          {
            name: 'Amit Sharma',
            role: 'Data Scientist at ADA',
            achievement: '₹4L → ₹11L (+175%)',
            quote: 'The Data Science bootcamp changed my life. The hands-on projects and expert mentorship helped me secure a Data Scientist role at ADA soon after completing the program.',
            rating: 5,
            avatar: '👨‍💼'
          },
          {
            name: 'Priya Gupta',
            role: 'Data Analyst at Flipkart',
            achievement: 'First tech role after CA',
            quote: 'Coming from a non-tech background, I was nervous. But the curriculum was clear, practical, and beginner-friendly. Today, I analyze data at Flipkart and genuinely enjoy my work.',
            rating: 5,
            avatar: '👩‍💻'
          },
          {
            name: 'Rohit Patel',
            role: 'ML Engineer at Amazon',
            achievement: '₹8L → ₹16L (+100%)',
            quote: 'The AI/ML bootcamp gave me production-ready skills. The LLM and RAG modules gave me a huge edge during interviews. I landed an ML Engineer position at Amazon shortly after.',
            rating: 5,
            avatar: '👨‍🔬'
          },
          {
            name: 'Sneha Das',
            role: 'Business Analyst at Accenture',
            achievement: 'Career switch in 3 months',
            quote: 'I was stuck in a marketing role. The Data Analytics bootcamp opened new opportunities for me. Now I work as a Business Analyst at Accenture.',
            rating: 5,
            avatar: '👩‍📊'
          },
          {
            name: 'Vikram Singh',
            role: 'AI Software Engineer at Prolifics',
            achievement: '₹10L → ₹20L (+100%)',
            quote: 'The depth of the AI/ML curriculum is unmatched. The computer vision and deployment modules prepared me exceptionally well for my role at Prolifics.',
            rating: 5,
            avatar: '👨‍💼'
          },
          {
            name: 'Ananya Verma',
            role: 'Senior Data Analyst at Lowe’s',
            achievement: 'Promoted twice in 1 year',
            quote: 'The Data Science bootcamp gave me the confidence and skills to lead analytics initiatives. It played a major role in shaping my career growth at Lowe’s.',
            rating: 5,
            avatar: '👩‍💻'
          },
          {
            name: 'Karthik Reddy',
            role: ' AI/ ML Specialist at Capgemini ',
            achievement: 'From backend to AI leadership',
            quote: 'The AI/ML bootcamp taught me not just coding, but product thinking. Today, I contribute to AI solutions at Capgemini with a strong foundation.',
            rating: 5,
            avatar: '👨‍🔬'
          },
          {
            name: 'Divya Malhotra',
            role: 'Senior Research Analyst at GlobalData',
            achievement: '₹5L → ₹9L (+80%)',
            quote: 'The SQL and visualization modules were game-changing. The dashboards I built during the program helped me stand out in interviews and secure a role at GlobalData.',
            rating: 5,
            avatar: '👩‍📊'
          }
        ];

          const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
        const nextTestimonial = () => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        };
    
        const prevTestimonial = () => {
          setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        };
    
        // Auto-play carousel
        React.useEffect(() => {
          const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
          }, 5000);
          return () => clearInterval(interval);
        }, [testimonials.length]);


    return (
    <section className={`${sectionClass ? sectionClass : ''}`}>
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
               Student Outcomes That Speak for Themselves
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
               A glimpse into the real results our programs deliver.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <div 
                key={currentTestimonial}
                className="bg-white rounded-2xl shadow-xl border border-border-gray overflow-hidden"
              >
                {/* Green Header Bar */}
                <div className="h-12 bg-primary-green"></div>
                
                <div className="p-8">
                  {/* Avatar */}
                  {/* <div className="flex justify-center -mt-10 mb-6">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-primary-green flex items-center justify-center text-3xl">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                  </div> */}
                  
                  {/* Quote */}
                  <blockquote className="text-center mb-6">
                    <p className="text-base text-medium-gray italic leading-relaxed">
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </p>
                  </blockquote>
                  
                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-dark-gray mb-1">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-primary-green font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                    {/* <p className="text-sm font-bold text-primary-green mt-1">
                      {testimonials[currentTestimonial].achievement}
                    </p> */}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-gold fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary-green' : 'bg-light-gray'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
    </section>
    );
  };
export default TestimonialsSection