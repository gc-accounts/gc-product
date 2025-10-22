'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {Earth, Building2, LaptopMinimalCheck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Item } from '@radix-ui/react-select';
import ContactUsForm from '../ContactUsForm';
import VideoSection from '../VideoSection';
import TransFormSection from '../TransFormSection';



// Simple counter hook without animations
const useCounter = (end: number) => {
  const [count] = useState(end);
  const ref = useRef<HTMLDivElement>(null);

  return { count, ref };
};


const trainingPrograms = [
    {
        id: 1,
        title: "New Hire Training",
        description:
            "Align the skills of your new hires to the business requirements at the earliest; reduce the time to project deployment.",
        imageUrl: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/image_asset_aa885af99b.jpeg`,
    },
    {
        id: 2,
        title: "Pre-Hire Training",
        description:
            "Hiring freshers from colleges? Get them trained even before their first day at your company and get them to be productive from Day 1.",
        imageUrl: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/image_asset_4_5726ef9458.webp`,
    },
    {
        id: 3,
        title: "Executive upskilling",
        description:
            "Upskill your team in the latest tools and technologies using dynamic experiential methodologies to boost their efficiency and performance.",
        imageUrl: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/image_asset_2_de9cdb598d.webp`,
    },
    {
        id: 4,
        title: "Leadership Training",
        description:
            "Build leaders and take your organisation to new heights with custom-built leadership training programs.",
        imageUrl: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/image_asset_3_acb0543820.webp`,
    },
];


const howWork = [
      {
           id: 1,
        step: 'Step-1',
            title: "Need Analysis",
            content:"We analyse and understand the training needs to establish outcome-focused requirements.",
        },
        {
               id: 2,
        step: 'Step-2',
            title: "Customisation",
            content:
                "Our subject matter experts work with your technical team to build custom training programs aligned to the established needs.",
        },
        {
              id: 3,
        step: 'Step-3',
            title: "Delivery",
            content:
                "Expert trainers deploy hands-on training as per the training plan; learners are given access to a robust LMS with multiple learning resources.",
        },
        {
               id: 4,
        step: 'Step-4',
            title: "Assessments and Reports",
            content:
                "Assessments in multiple variants are built into every training program. Progress reports of the training along with a comprehensive assessment report are submitted.",
        },

];

const programHighlights = [
  {
    id: 1,
    title: "Flexible Training Delivery",
    description: "Flexible training delivery models – Live online, in-person and hybrid"
  },
  {
    id: 2,
    title: "Customized Training Programs",
    description: "Fully customised training programs aligned with specific outcomes"
  },
  {
    id: 3,
    title: "Comprehensive LMS Access",
    description: "Access to feature-rich Learning Management System for all delivery models"
  },
  {
    id: 4,
    title: "Live Support & Expert Interaction",
    description: "Live online sessions and doubt clarification support for real time interaction with industry experts"
  },
  {
    id: 5,
    title: "Industry Expert Instruction",
    description: "Industry experts as instructors to provide a very hands-on practical training experience"
  },
  {
    id: 6,
    title: "Practical Application",
    description: "Labs, projects, capstones and simulators for practice and reinforced learning"
  }
];

const expertiseAreas = [
  "Data Analytics",
  "Adoption of Generative AI",
  "Full Stack Development",
  "Digital Marketing",
  "Performance Management",
  "Innovation Mindset",
  "Data Visualisation",
  "Business Analytics",
  "Cyber Security",
  "Six Sigma",
  "Leadership",
  "Communication skills",
  "AI and ML",
  "Data Engineering",
  "Cloud Computing",
  "Project Management",
  "Design Thinking",
  "Team Building and Management",
  "Quality Management",
  "and more...",
];


const clientLogos = [
    {
        id: 1, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Deloitte_logo_e2409d806c.webp`, alt: "Deloitte" },
    {
        id: 2, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Ola_Cabs_logo_svg_aa02f2a83f.webp`, alt: "OLA" },
    { id: 3, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/wipro_logo_ea6b7b53ad.webp`, alt: "Wipro" },
    { id: 4, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/ADP_logo_0646b41923.webp`, alt: "ADP" },
    { id: 5, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/oxfam_logo_cc5d2bfaea.webp`, alt: "Oxfam" },
    { id: 6, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/DFS_Group_logo_b92b48f364.webp`, alt: "DFS" },
    { id: 7, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Neuland_Master_Logo_Tagline_RGB_ec62ab7a10.webp`, alt: "Neuland" },
    { id: 8, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/indian_navy_976a76f2a2.webp`, alt: "Indian Navy" },
    { id: 9, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/trantor_OG_TAG_LOGO_688b6490c8.webp`, alt: "Trantor" },
    { id: 10, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Johnson_Johnson_Logo_3b008f861c.webp`, alt: "Johnson & Johnson" },
    {
        id: 11, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/ABBOTT_LOGO_9962c9da42.webp`, alt: "Abbott" },
    { id: 12, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Saudi_Aramco_Logo_c6fffda38f.webp`, alt: "Aramco" },
    { id: 13, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Mahindra_Finance_logo_Vector_f3f4e65400.webp`, alt: "Mahindra Finance" },
    { id: 14, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Pfizer_Logo_PNG_45de4f0469.webp`, alt: "Pfizer" },
    { id: 15, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Coca_Cola_Logo_1934_99c7d82293.webp`, alt: "Coca Cola" },
    { id: 16, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/hewlett_packard_logo_png_transparent_f81f754775.webp`, alt: "HP" },
    { id: 17, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Otis_Logo_1fce5aec28.webp`, alt: "OTIS" },
    {
        id: 18, src: `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/uploads/Sabre_web_logo_1c88f786bd.webp`, alt: "Sabre Industries" },
];



export default function Corporate() {
  // Counter hooks
  const studentsCount = useCounter(50000);
  const placementCount = useCounter(95);
  const salaryCount = useCounter(120);
  const partnersCount = useCounter(500);
  const ratingCount = useCounter(4.9);
  const yearsCount = useCounter(7);

  return (
    <div className="min-h-screen">
      <Navigation currentPage="corporate" />

      <main className="pt-16">

          <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-linear-to-br from-off-white to-green-50">
          <div className="container max-w-7xl mx-auto">

            <div className="grid md:grid-cols-12 gap-5 md:gap-8">
              <div className='col-span-6'>
                <VideoSection />
              </div>
              <div className='col-span-6'>
                <ContactUsForm />
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 2: OUR STORY */}
        <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-white">
          <div className="container max-w-7xl mx-auto">
            <div className="md:grid md:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT CONTENT */}
              <div className="md:col-span-4 col-span-12">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                    Creating Impact Through Professional Trainings Globally Since 2014
                  </h2>
                  <div className="space-y-6">
                    <p className="md:text-base text-sm text-medium-gray ">
                      Winner of Deloitte Fastest 50 Awards for the fastest growing company in India four years in a row - 2015, 2016, 2017 and 2018.
                    </p>
                  </div>
                </div>
              </div>
              

              <div className="md:col-span-8 col-span-12">
                   <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 md:mt-0 mt-4">
                          {[
                            {
                              icon: <Earth className='text-primary-green' size={40} />,
                              title: 'Learners from 40+ countries',
                              description: ''
                            },
                            {
                              icon: <Building2 className='text-primary-green' size={40} />,
                              title: 'Across 1000+ Organizations',
                              description: ''
                            },
                            {
                              icon: <LaptopMinimalCheck className='text-primary-green' size={40} />,
                              title: 'Spending 1M+ hours on our platform and courses',
                              description: ''
                            },


                          ].map((feature, index) => (
                            <div key={index}>
                              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-primary-green">
                                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                                  <div className="text-4xl mb-4">{feature.icon}</div>
                                  <h3 className="text-xl font-semibold text-dark-gray mb-3">
                                    {feature.title}
                                  </h3>
                                  <p className="text-medium-gray  grow">
                                    {feature.description}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                        </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR VALUES */}
        <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-linear-to-br from-off-white to-green-50">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Custom Training for Your Organization
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto  max-w-8xl">
                We design tailored training solutions to match your company’s unique goals and needs.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                {
                    trainingPrograms.map((item)=>{
                        return(
                                 <Card key={item.id} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="md:p-5 p-4 h-full flex flex-col">
                  <div className="text-5xl mb-6">
                    <img src={item.imageUrl} className='w-full h-auto rounded-md' alt={item.title} />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-medium-gray  grow">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
                        )
                    })
                }
            </div>
          </div>
        </section>

        {/* SECTION 4: IMPACT & STATS */}
        <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-white">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                How we work
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto  max-w-4xl">
                We analyze your needs, design tailored training, and deliver programs to achieve effective results for your organization.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
                {
                    howWork.map((item, index)=>{
                        return(

            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-gray">
                                  <CardContent className="p-5 h-full flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                      {item.id}
                                    </div>
                                    {/* <div className="text-2xl mb-3">{step.icon}</div> */}
                                    <h3 className="text-base font-bold text-dark-gray mb-2">
                                      {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-medium-gray">
                                      {item.content}
                                    </p>
                                  </CardContent>
                                </Card>
                        )
                    })
                }
       





            </div>
          </div>
        </section>

        {/* SECTION 5: OUR TEAM */}
        <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-linear-to-br from-off-white to-green-50">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Program Highlights
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto  max-w-8xl">
                 Each program is fully customized to align with your goals and includes access to comprehensive learning platforms
              </p>
            </div>

              <div className="grid lg:grid-cols-3 gap-5 lg:gap-8">
                        {programHighlights.map((project, index) => (
                          <div key={index}>
                            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green overflow-hidden">
                              {/* Header with gradient */}
                              <div className={`bg-primary-green p-6 text-white relative`}>
                                <h3 className="text-lg lg:text-xl font-semibold">
                                  {project.title}
                                </h3>
                              </div>
            
                              <CardContent className="p-6 h-fit flex flex-col">
                                <p className="text-dark-gray text-sm leading-relaxed grow">
                                  {project.description}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
          </div>
        </section>


    <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-linear-to-br from-off-white to-green-50">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Some of our areas of expertise
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto  max-w-8xl">
                 Each program is fully customized to align with your goals and includes access to comprehensive learning platforms
              </p>
            </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {expertiseAreas.map((item, index) => (
                            <Card key={index} className={`bg-white border border-border-gray hover:border-primary-green transition-all duration-300 h-full`}>
                                          <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                                            {/* <div className="text-3xl mb-3">{insight.icon}</div> */}
                                            <h3 className="text-sm md:text-base font-semibold text-dark-gray ">
                                              {item}
                                            </h3>
                                          </CardContent>
                                        </Card>
                        ))}
                      </div>
          </div>
        </section>


         <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px] bg-white">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Our Enterprise Clients
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto  max-w-8xl">
                 Each program is fully customized to align with your goals and includes access to comprehensive learning platforms
              </p>
            </div>

              <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                        {clientLogos.map((item) => (
                            <Card key={item.id} className={`bg-white border border-border-gray hover:border-primary-green transition-all duration-300 h-full`}>
                                          <CardContent className="p-4 text-center h-full flex flex-col justify-center">
                                            <div className="text-sm md:text-base font-semibold text-dark-gray ">
                                                <img src={item.src} className='w-22 mx-auto h-auto' alt="logo" />
                                            </div>
                                          </CardContent>
                                        </Card>
                        ))}
                      </div>
          </div>
        </section>

        <TransFormSection sectionClass='px-[20px] py-[50px] md:px-[30px] md:py-[70px]' />





      </main>

      <Footer />
    </div>
  );
}