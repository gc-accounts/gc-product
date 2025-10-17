'use client';
import React, { useEffect, useState } from 'react';


import Navigation from '@/components/Navigation';
import DaHeroSection from '../DaHeroSection';
import WhyChooseSection from '../WhyChooseSection';
import WhyLearn from '../WhyLearn';
import CareersAfter from '../CareersAfter';
import HiringOrganizationSection from '../HiringOrganizationSection';
import DaCurriculum from '../DaCurriculum';
import ProgramOutcomes from '../ProgramOutcomes';
import DABProjects from '../DABProjects';
import HowEnroll from '../HowEnroll';
import DABFeeModule from '../DABFeeModule';
import Certification from '../Certification';
import DaEnrollmentFormSection from '../DaEnrollmentFormSection';
import Testimonials from '../Testimonials';
import DaFaq from '../DaFaq';
import Footer from '@/components/Footer';


import { DABCareersAfterData } from '../data/DABCareersAfterData';
import { DABOutcomesData } from '../data/DABOutcomesData';
import { DACertificateData } from '../data/DACertificateData';
import { DABTestimonialsData } from '../data/DABTestimonialsData';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';
interface Props{
  slug?:string;
}
const DataAnalystBootcamp = ({slug}:Props) => {
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
    <>
      <div className="flex flex-col min-h-screen">
        <Navigation currentPage="data-science-bootcamp" />
        <main className='mt-16'>
          <DaHeroSection basePrice={basePrice} currency={currency} sectionClass="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyChooseSection sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyLearn title='Why Become a Data Analyst?' subText='Market demand, career growth, and earning potential' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <CareersAfter data={DABCareersAfterData}  title='Careers After Bootcamp' subText='Multiple paths to success with competitive salaries' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HiringOrganizationSection title='Trusted by Leading Companies' subText='Our graduates work at Fortune 600+ companies and innovative startups worldwide' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DaCurriculum title="What You'll Learn" subText='3 months of comprehensive, industry-aligned curriculum' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <ProgramOutcomes data={DABOutcomesData}  title='Program Outcomes' subText='Real skills. Real impact. Real career transformation.' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DABProjects title='Build Real-World Projects' subText='Apply your skills to projects used by real companies' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HowEnroll title='How Do I Enroll?' subText='Simple 5-step process to start your data science journey' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DABFeeModule currency={currency} basePrice={basePrice} title='Invest in Your Future at Affordable Prices' subText='The most cost-effective bootcamp without compromising quality' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <Certification sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" data={DACertificateData} />
          <DaEnrollmentFormSection />
          <Testimonials data={DABTestimonialsData} title='Success Stories' subText='Real students, real transformations, real careers' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DaFaq />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DataAnalystBootcamp;
