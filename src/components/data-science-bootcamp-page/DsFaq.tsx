'use client';
import React, { useState } from 'react';

const DsFaq = () => {
  const faqCategories = [
    {
      id: 'curriculum',
      name: 'Curriculum & Content',
    },
    {
      id: 'job',
      name: 'Job & Placement',
    },
    {
      id: 'practical',
      name: 'Practical Details',
    },
    {
      id: 'enrollment',
      name: 'Enrollment & Payment',
    },
  ];

  // FAQ states
  const [activeFAQCategory, setActiveFAQCategory] = useState('curriculum');
  const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});

  const faqs = {
    curriculum: [
      {
        question: 'What programming languages will I learn?',
        answer:
          "You will learn Python (primary), SQL. Python is the main language used throughout the bootcamp as it's the industry standard for data science.",
      },
      {
        question: 'Do I need prior programming experience?',
        answer:
          "No prior programming experience is required. We start from the basics and gradually build up to advanced concepts. Our curriculum is designed for complete beginners.",
      },
      {
        question: 'What tools and technologies are covered?',
        answer:
          'We cover Python, SQL, Power BI, Tableau, Jupyter Notebooks, Git, and various machine learning libraries like scikit-learn, pandas, and numpy.',
      },
      {
        question: 'How is the curriculum updated?',
        answer:
          'Our curriculum is updated monthly based on industry trends and feedback from our hiring partners. We ensure you learn the most current tools and techniques.',
      },
    ],
    job: [
      {
        question: 'What is the job placement rate?',
        answer:
          'We have a 100% placement assistance within 3 months of graduation. Our career support team works closely with students to ensure successful job placement.',
      },
      {
        question: 'What types of companies hire your graduates?',
        answer:
          'Our graduates work at top companies including Google, Amazon, Microsoft, Meta, Netflix, and many Fortune 500 companies across various industries.',
      },
      {
        question: 'Do you provide career support after graduation?',
        answer:
          'Yes, we provide lifetime career support including resume reviews, interview preparation, networking opportunities, and job placement assistance.',
      },
      {
        question: 'What salary can I expect after graduation?',
        answer:
          'Our graduates typically see salary increases of 120% on average. Entry-level data science roles start at ₹6-8 LPA, with experienced professionals earning ₹12-20 LPA.',
      },
    ],
    practical: [
      {
        question: 'How long is the bootcamp?',
        answer:
          'The bootcamp is 3 months long, with 8 comprehensive modules covering all aspects of data science from fundamentals to advanced topics.',
      },
      {
        question: 'What is the time commitment required?',
        answer:
          'We recommend 15-20 hours per week for optimal learning. The program is designed to be flexible for working professionals and students.',
      },
      {
        question: 'Are there live sessions or is it self-paced?',
        answer:
          'We offer both live sessions and self-paced learning. You can attend live sessions for real-time interaction or watch recordings at your convenience.',
      },
      {
        question: 'What if I miss a live session?',
        answer:
          'All live sessions are recorded and available for replay. You can access them anytime during the bootcamp and even after graduation.',
      },
    ],
    enrollment: [
      {
        question: 'What is the total cost of the bootcamp?',
        answer:
          'The bootcamp costs ₹5,000 + GST (originally ₹15,000). This includes all course materials, projects, career support, and lifetime access to resources.',
      },
      {
        question: 'Are there any hidden fees?',
        answer:
          'No hidden fees. The price includes everything: course materials, software licenses, career support, and lifetime access to the learning platform.',
      },
      {
        question: 'Do you offer payment plans?',
        answer:
          'Yes, we offer flexible payment plans. You can pay in full or choose from our installment options to make it more affordable.',
      },
      {
        question: 'What is your refund policy?',
        answer:
          'We offer 90%+ placement support within 3 months. Our career team provides resume review, interview prep, mock interviews, and job connections with hiring companies.',
      },
    ],
  };

  const toggleFAQ = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setExpandedFAQs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section id="faq" className="bg-white py-10 sm:py-15 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
            Everything you need to know about the bootcamp
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFAQCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFAQCategory === category.id
                    ? 'bg-primary-green text-white shadow-md'
                    : 'bg-light-gray text-dark-gray hover:bg-medium-gray hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs[activeFAQCategory as keyof typeof faqs]?.map((faq, index) => {
              const key = `${activeFAQCategory}-${index}`;
              const isExpanded = expandedFAQs[key];

              return (
                <div key={index}>
                  <div className="border border-border-gray rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(activeFAQCategory, index)}
                      className="w-full px-6 py-4 text-left bg-light-gray hover:bg-white transition-all duration-300 flex items-center justify-between"
                    >
                      <h3 className="text-base font-semibold text-dark-gray pr-4">{faq.question}</h3>
                      <div
                        className={`transform transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-primary-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 py-4 bg-off-white">
                        <p className="text-sm text-medium-gray leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DsFaq;
