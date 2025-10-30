'use client';
import React, { useEffect, useState } from 'react';


import Navigation from '@/components/Navigation';
import IbfoHeroSection from '../IbfoHeroSection';
import WhyChooseSection from '../WhyChooseSection';
import WhyLearn from '../WhyLearn';
import CareersAfter from '../CareersAfter';
import HiringOrganizationSection from '../HiringOrganizationSection';
import IbfoCurriculum from '../IbfoCurriculum';
import ProgramOutcomes from '../ProgramOutcomes';
import IbfoProjects from '../IbfoProjects';
import HowEnroll from '../HowEnroll';
import Certification from '../Certification';
import IbfoEnrollmentFormSection from '../IbfoEnrollmentFormSection';
import Testimonials from '../Testimonials';
import Footer from '@/components/Footer';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';

import { IbfoCarrersAfterData } from '../data/IbfoCarrersAfterData';

import CareerServices from '../CareerServices';
import IbfoJobDrive from '../IbfoJobDrive';
import JpMorganFold from '../JpMorganFold';
import { IBFOOutcomesData } from '../data/IBFOOutcomesData';
import IBFOFeeModule from '../IBFOFeeModule';
import { IBFOCertificateData } from '../data/IBFOCertificateData';
import { IBFOBTestimonialsData } from '../data/IBFOBTestimonialsData';
import IBFOFaq from '../IBFOFaq';


interface Props{
  slug?:string;
}
const IbfoBootcamp = ({slug}:Props) => {

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
          <IbfoHeroSection basePrice={basePrice} currency={currency}  sectionClass="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <WhyLearn title='Why Learn Investment Banking & Finance Operations?' subText='Global demand, career growth, and lucrative opportunities in the world of finance.' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <WhyChooseSection sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <CareersAfter data={IbfoCarrersAfterData}  title='Careers After Bootcamp' subText='Multiple career paths in banking, financial operations, and investment management.' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          
          <HiringOrganizationSection title='Trusted by Leading Companies' subText='Our graduates work at Fortune 600+ companies and innovative startups worldwide' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <IbfoJobDrive sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          {/* <JpMorganFold/> */}

          <IbfoCurriculum title="What You'll Learn" subText='3 months of comprehensive, industry-aligned curriculum' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <CareerServices title='Career Services' subText='Dedicated support to launch your career.' sectionClass=" bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <ProgramOutcomes data={IBFOOutcomesData}  title='Program Outcomes' subText='Real-world finance skills. Real impact. Real career transformation.' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <IbfoProjects title='Build Real-World Projects' subText='Apply your financial operations knowledge to real-world simulations used by top global banks.' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <HowEnroll title='How Do I Enroll?' subText='Simple 3-step process to start your Generative AI journey' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          
          <IBFOFeeModule currency={currency} basePrice={basePrice}  title='Invest in Your Future at Affordable Prices' subText='The most cost-effective finance bootcamp designed to prepare you for high-demand roles in banking and financial operations.' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />

          <Certification sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" data={IBFOCertificateData} />

          <IbfoEnrollmentFormSection sectionClass='bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]' />

          <Testimonials data={IBFOBTestimonialsData} title='Student Testimonials' subText='The IBFO Bootcamp gave me a real understanding of how global banking operations work. The settlement simulations were incredibly close to what I do now.' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          
          <IBFOFaq />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IbfoBootcamp;
