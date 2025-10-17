'use client';
import React, { useEffect, useState } from 'react';


import Navigation from '@/components/Navigation';
import DsHeroSection from '../DsHeroSection';
import WhyChooseSection from '../WhyChooseSection';
import WhyLearn from '../WhyLearn';
import CareersAfter from '../CareersAfter';
import HiringOrganizationSection from '../HiringOrganizationSection';
import DsCurriculum from '../DsCurriculum';
import ProgramOutcomes from '../ProgramOutcomes';
import DSBProjects from '../DSBProjects';
import HowEnroll from '../HowEnroll';
import DSBFeeModule from '../DSBFeeModule';
import Certification from '../Certification';
import DsEnrollmentFormSection from '../DsEnrollmentFormSection';
import Testimonials from '../Testimonials';
import DsFaq from '../DsFaq';
import Footer from '@/components/Footer';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';

import { DSBCareersAfterData } from '../data/DSBCareersAfterData';
import { DSBOutcomesData } from '../data/DSBOutcomesData';
import { DSCertificateData } from '../data/DSCertificateData';
import { DSBTestimonialsData } from '../data/DSBTestimonialsData';


interface Props{
  slug?:string;
}
const DataScienceBootcamp = ({slug}:Props) => {

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
          <DsHeroSection basePrice={basePrice} currency={currency}  sectionClass="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyChooseSection sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyLearn title='Why Learn Data Science?' subText='Market demand, growth potential, and career opportunities' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <CareersAfter data={DSBCareersAfterData}  title='Careers After Bootcamp' subText='Multiple paths to success with competitive salaries' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HiringOrganizationSection title='Trusted by Leading Companies' subText='Our graduates work at Fortune 600+ companies and innovative startups worldwide' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DsCurriculum title="What You'll Learn" subText='3 months of comprehensive, industry-aligned curriculum' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <ProgramOutcomes data={DSBOutcomesData}  title='Program Outcomes' subText='Real skills. Real impact. Real career transformation.' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DSBProjects title='Build Real-World Projects' subText='Apply your skills to projects used by real companies' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HowEnroll title='How Do I Enroll?' subText='Simple 5-step process to start your data science journey' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DSBFeeModule currency={currency} basePrice={basePrice}  title='Invest in Your Future at Affordable Prices' subText='The most cost-effective bootcamp without compromising quality' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <Certification sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" data={DSCertificateData} />
          <DsEnrollmentFormSection />
          <Testimonials data={DSBTestimonialsData} title='Success Stories' subText='Real students, real transformations, real careers' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <DsFaq />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DataScienceBootcamp;
