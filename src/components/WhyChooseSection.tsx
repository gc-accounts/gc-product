'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';
interface Props {
  sectionClass?: String;
}
const WhyChooseSection = ({ sectionClass}: Props) => {

      const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
      const [basePrice, setBasePrice] = useState<number>(5000);
      
  
      const detectUserCountry = async () => {
        try {
          const countryInfo = await getUserCountry();
          setCurrency(countryInfo.currency);
          
          // Set price based on country
          if (countryInfo.isIndia) {
            setBasePrice(PRICE_CONFIG.INR.basePrice);
          } else {
            setBasePrice(PRICE_CONFIG.USD.basePrice);
          }
          
          console.log('🌍 Country detected:', countryInfo);
        } catch (error) {
          console.error('Country detection failed:', error);
          // Fallback to INR
          setCurrency('INR');
          setBasePrice(PRICE_CONFIG.INR.basePrice);
        }
      };
  
  
    useEffect(() => {
      window.scrollTo(0, 0);
      detectUserCountry();
    }, []);



  return (
  <section id="why-choose" className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container mx-auto">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
            Why Choose Greycampus?
          </h2>
          <p className="text-sm lg:text-base text-medium-gray mx-auto leading-relaxed">
            Affordable education meets world-class quality
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: '💰',
              title: 'Most Affordable',
              description: `High-quality education at ${currency === 'INR' ? '₹5,000' : `$${basePrice}`}`

            },
            {
              icon: '👨‍🏫',
              title: 'Expert Instructors',
              description: '10+ years industry experience. Real-world projects taught'
            },
            {
              icon: '🎯',
              title: '100% Job Focused',
              description: 'Resume building, interview prep, placement support'
            },
            {
              icon: '🕐',
              title: 'Flexible Learning',
              description: '3-months LIVE online classes. Learn at your speed'
            },
             {
              icon: "🧠",
              title: "Project-Based Learning",
              description: "Gain hands-on experience through real-world projects that help you build a strong, job-ready portfolio."
            },
            {
              icon: '✅',
              title: 'Career Assistance',
              description: '100% assistance until career starts'
            }
          ].map((feature, index) => (
            <div key={index}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-primary-green">
                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
   );
};
export default WhyChooseSection