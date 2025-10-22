'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface FeatureItem {
  id: number;
  iconLabel: string;
  title: string;
  description: string;
}

interface CertificateData {
  heading: string;
  subheading: string;
  features: FeatureItem[];
  certificateImage: string;
}

interface CertificateProps {
  sectionClass?: string;
  data?: CertificateData;
}

const Certification = ({ sectionClass, data }: CertificateProps) => {
  const pathname = usePathname();
  const allowedPaths = [
    '/ai-course-with-machine-learning',
    '/ai-course-with-machine-learning-for-graduates',
  ];
  const showDiv = allowedPaths.includes(pathname);

  if (!data) return null;

  return (
    <section className={sectionClass}>
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            Get Dual Certification
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {data.subheading}
          </p>
        </div>

         <ul className="space-y-6 grid grid-cols-12 mb-4">
              {data.features.map((item) => (
                <li key={item.id} className="flex items-center gap-4 col-span-4">
                  <div className="shrink-0 bg-primary-50 rounded-md p-2">
                    <img
                      src={item.iconLabel}
                      alt={`${item.title} icon`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          <div className="md:col-span-6 col-span-1 flex justify-center">
            <div>
              <img
                src={data.certificateImage}
                alt="GreyCampus Data Science Certificate"
                width={400}
                height={300}
                className="w-full h-auto border border-gray-300 rounded-2xl"
              />

              {showDiv && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-900">Get Dual Certification:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      <p className="text-sm text-gray-600">Course Completion certificate from GreyCampus</p>
                    </li>
                    <li>
                      <p className="text-sm text-gray-600">Diploma from Jain Online University</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-6 col-span-1 flex justify-center">
            <div>
              <img
                src='https://strapi.odinschool.com/uploads/Internship_cert_62660ee8c4.webp'
                alt="GreyCampus Data Science Certificate of Internship"
                width={400}
                height={300}
                className="w-full h-auto border border-gray-300 rounded-2xl"
              />

              {showDiv && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-900">Get Dual Certification:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      <p className="text-sm text-gray-600">Course Completion certificate from GreyCampus</p>
                    </li>
                    <li>
                      <p className="text-sm text-gray-600">Diploma from Jain Online University</p>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
