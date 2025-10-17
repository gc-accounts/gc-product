'use client'
import React from 'react'


const companies = [
      "https://strapi.odinschool.com/uploads/Meesho_100x40_individual_81f680e677.webp",
      "https://strapi.odinschool.com/uploads/prolifics_100_X40_Individual_02765c8bbc.webp",
      "https://strapi.odinschool.com/uploads/Ensoft100_X40_105ed0f32a.webp",
      "https://strapi.odinschool.com/uploads/Deloitte_100_X40_1_1_ca02ecb519.webp",
      "https://strapi.odinschool.com/uploads/Tatvic_100_X40_92af98eb92.webp",
      "https://strapi.odinschool.com/uploads/genpact_100_X40_280d97151b.webp",
      "https://strapi.odinschool.com/uploads/Pepsico100_X40_a3d789f2d4.webp",
      "https://strapi.odinschool.com/uploads/Synchrony_INDIVIDUAL_100_X40_6cc77d6f53.webp",
      "https://strapi.odinschool.com/uploads/TCS_100_X40_Individual_7ceeb6c515.webp",
      "https://strapi.odinschool.com/uploads/Cognizant_100_X40_1_20f9d634ed.webp",
      "https://strapi.odinschool.com/uploads/sutherland100_X40_d68abd31db.webp",
      "https://strapi.odinschool.com/uploads/swiggy_100x40_indv_2fad998515.webp",
      "https://strapi.odinschool.com/uploads/Infosys_100_X40_285cf1a2c6.webp",
      "https://strapi.odinschool.com/uploads/IBM_100_X40_a4922015b6.webp",
      "https://strapi.odinschool.com/uploads/JKTECH_100_X40_5229c19c27.webp",
      "https://strapi.odinschool.com/uploads/Saarthi_Individual_100_x40_39ee46a45c.webp",
      "https://strapi.odinschool.com/uploads/Tech_Mahindra100_X40_769822fb36.webp",
      "https://strapi.odinschool.com/uploads/Bodhtree_INDIVIDUAL_100_X40_e4c952b088.webp",

    ];


interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}
const HiringOrganizationSection = ({ sectionClass, title, subText }: Props) => {

    return (
       <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container mx-auto">

        {/* <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
          </p>
        </div> */}
          
          <div className="overflow-hidden">
            <div className="flex space-x-8 animate-scroll">
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="flex-shrink-0 w-40 h-20 bg-off-white rounded-lg flex items-center justify-center border border-border-gray hover:border-primary-green transition-colors group">
                  <img src={company} alt="logo" />
                  {/* <span className="text-sm font-semibold text-dark-gray group-hover:text-primary-green transition-colors">{company}</span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

export default HiringOrganizationSection