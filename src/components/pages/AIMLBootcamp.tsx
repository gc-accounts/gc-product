'use client';
import React, { useEffect, useState } from 'react';


import Navigation from '@/components/Navigation';
import AIMLHeroSection from '../AIMLHeroSection';
import WhyChooseSection from '../WhyChooseSection';
import WhyLearn from '../WhyLearn';
import CareersAfter from '../CareersAfter';
import HiringOrganizationSection from '../HiringOrganizationSection';
import AimlCurriculum from '../AimlCurriculum';
import ProgramOutcomes from '../ProgramOutcomes';
import AIMLProjects from '../AIMLProjects';
import HowEnroll from '../HowEnroll';
import AIMLFeeModule from '../AIMLFeeModule';
import Certification from '../Certification';
import AimlEnrollmentFormSection from '../AimlEnrollmentFormSection';
import Testimonials from '../Testimonials';
import AimlFaqs from '../AimlFaqs';
import ToolsMasterSection from '../ToolsMasterSection';
import Footer from '@/components/Footer';


import { AIMLCareersAfterData } from '../data/AIMLCareersAfterData';
import { AIMLOutcomesData } from '../data/AIMLOutcomesData';
import { AIMLCertificateData } from '../data/AIMLCertificateData';
import { AIMLTestimonialsData } from '../data/AIMLTestimonialsData';
import { AimlToolsData } from '../data/AimlToolsData';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';
import AimlJobDrives from '../AimlJobDrives';
interface Props{
  slug?:string;
}
const AIMLBootcamp = ({slug}:Props) => {

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
          <AIMLHeroSection basePrice={basePrice} currency={currency} sectionClass="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyLearn title='Why Become an AI/ML Engineer?' subText='Fastest growing field with highest earning potential' sectionClass=" px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyChooseSection sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <CareersAfter data={AIMLCareersAfterData}  title='Careers After Bootcamp' subText='Multiple paths to success with competitive salaries' sectionClass=" px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AimlJobDrives sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HiringOrganizationSection title='Trusted by Leading Companies' subText='Our graduates work at Fortune 600+ companies and innovative startups worldwide' sectionClass=" px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AimlCurriculum title="What You'll Learn" subText='3 months of comprehensive, industry-aligned curriculum' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <ToolsMasterSection tools={AimlToolsData} sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]"/>
          <ProgramOutcomes data={AIMLOutcomesData}  title='Program Outcomes' subText='Real skills. Real impact. Real career transformation.' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AIMLProjects title='Build Production AI Systems' subText='Apply your skills to projects used by real companies' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HowEnroll title='How Do I Enroll?' subText='Simple 5-step process to start your data science journey' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AIMLFeeModule basePrice={basePrice} currency={currency} title='Invest in Your Future at Affordable Prices' subText='The most cost-effective bootcamp without compromising quality' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <Certification sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" data={AIMLCertificateData} />
          <AimlEnrollmentFormSection sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <Testimonials data={AIMLTestimonialsData} title='Success Stories' subText='Real students, real transformations, real careers' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
           <AimlFaqs/>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AIMLBootcamp;
