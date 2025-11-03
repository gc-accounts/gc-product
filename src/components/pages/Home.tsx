'use client';
import React, { useEffect, useState } from 'react';
import useZohoSalesIQ from '../hooks/useZohoSalesIQ';
import Navigation from '@/components/Navigation';
import HomeHeroSection from '@/components/home-page/HomeHeroSection';
import HiringOrganizationSection from '@/components/HiringOrganizationSection';
import ProgramsCardsHome from '@/components/ProgramsCardsHome';
import WhoAreWeSection from '@/components/WhoAreWeSection';
import WhyGreycampusSection from '@/components/WhyGreycampusSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import TransFormSection from '@/components/TransFormSection';
import Footer from '@/components/Footer';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';
import WhyLearn from '../WhyLearn';
import TransformAcademic from '../TransformAcademic';
import OpenStudents from '../OpenStudents';
import IctPartnershipSection from '../IctPartnershipSection';
import HomeJobDrives from '../HomeJobDrives';

interface Props {
  slug?: string;
}

const DataAnalystBootcamp: React.FC<Props> = ({ slug }) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [basePrice, setBasePrice] = useState<number>(5000);

  // 👇 Initialize Zoho SalesIQ chat widget (only runs in browser)
  useZohoSalesIQ();

  const detectUserCountry = async () => {
    try {
      const countryInfo = await getUserCountry();
      setCurrency(countryInfo.currency);
      if (countryInfo.isIndia) {
        setBasePrice(PRICE_CONFIG.INR.basePrice);
      } else {
        setBasePrice(PRICE_CONFIG.USD.basePrice);
      }
    } catch (error) {
      console.error('Country detection failed:', error);
      setCurrency('INR');
      setBasePrice(PRICE_CONFIG.INR.basePrice);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    detectUserCountry();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation currentPage="data-science-bootcamp" />
      <main className="mt-16">
        <HomeHeroSection basePrice={basePrice} currency={currency} sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <HiringOrganizationSection sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <TransformAcademic sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <ProgramsCardsHome basePrice={basePrice} currency={currency} sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <OpenStudents
          title="Open to students from all disciplines"
          subText="Our programs ensure that every student, regardless of their core discipline, gains the essential, high-demand technological layer needed to secure a competitive edge in a global, data-driven economy"
          sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]"
        />
        <WhoAreWeSection sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <IctPartnershipSection sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <HomeJobDrives sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <WhyGreycampusSection sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <WhyLearn title="Career Services" subText="Dedicated support to launch your career." sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <TestimonialsSection sectionClass="bg-gray-50 px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
        <TransFormSection sectionClass="px-[20px] py-[50px] md:px-[30px] md:py-[70px]" />
      </main>
      <Footer />
    </div>
  );
};

export default DataAnalystBootcamp;
