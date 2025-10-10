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
    <section className={`${sectionClass ? sectionClass : 'my-32'}`}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Block */}
          <div className="md:col-span-6 col-span-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              {data.heading}
            </h2>
            <p className="section-description-1 mb-6">{data.subheading}</p>

            <ul className="space-y-6">
              {data.features.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-primary-50 rounded-md p-2">
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
          </div>

          {/* Right Certificate Image */}
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
        </div>
      </div>
    </section>
  );
};

export default Certification;
