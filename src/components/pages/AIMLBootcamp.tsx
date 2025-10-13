'use client';
import React, { useEffect } from 'react';


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
import EnrollmentFormSection from '../EnrollmentFormSection';
import Testimonials from '../Testimonials';
import AimlFaqs from '../AimlFaqs';
import Footer from '@/components/Footer';


import { AIMLCareersAfterData } from '../data/AIMLCareersAfterData';
import { AIMLOutcomesData } from '../data/AIMLOutcomesData';
import { AIMLCertificateData } from '../data/AIMLCertificateData';
import { AIMLTestimonialsData } from '../data/AIMLTestimonialsData';

interface Props{
  slug?:string;
}
const AIMLBootcamp = ({slug}:Props) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navigation currentPage="data-science-bootcamp" />
        <main className='mt-16'>
          <AIMLHeroSection sectionClass="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyChooseSection sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <WhyLearn title='Why Become an AI/ML Engineer?' subText='Fastest growing field with highest earning potential' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <CareersAfter data={AIMLCareersAfterData}  title='Careers After Bootcamp' subText='Multiple paths to success with competitive salaries' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HiringOrganizationSection title='Trusted by Leading Companies' subText='Our graduates work at Fortune 600+ companies and innovative startups worldwide' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AimlCurriculum title="What You'll Learn" subText='3 months of comprehensive, industry-aligned curriculum' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <ProgramOutcomes data={AIMLOutcomesData}  title='Program Outcomes' subText='Real skills. Real impact. Real career transformation.' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AIMLProjects title='Build Production AI Systems' subText='Apply your skills to projects used by real companies' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <HowEnroll title='How Do I Enroll?' subText='Simple 5-step process to start your data science journey' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <AIMLFeeModule title='Invest in Your Future at Affordable Prices' subText='The most cost-effective bootcamp without compromising quality' sectionClass="bg-white px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
          <Certification sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" data={AIMLCertificateData} />
          <EnrollmentFormSection />
          <Testimonials data={AIMLTestimonialsData} title='Success Stories' subText='Real students, real transformations, real careers' sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
           <AimlFaqs/>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AIMLBootcamp;
