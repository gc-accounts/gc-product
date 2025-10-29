'use client';
import React, { useState } from 'react';

const IBFOFaq = () => {


  // FAQ states
  const [activeFAQCategory, setActiveFAQCategory] = useState('curriculum');
  const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});

  const faqs = {
    curriculum: [
      {
        question: 'Who is this Bootcamp for?',
        answer:
          "This program is ideal for students, graduates, and working professionals from commerce, finance, economics, or business backgrounds who want to build a career in investment banking or financial operations.",
      },
      {
        question: 'What skills will I gain from this Bootcamp?',
        answer:
          "You’ll gain hands-on knowledge in financial markets, trade settlements, reconciliations, derivatives, corporate actions, and compliance frameworks (AML/KYC). You’ll also build strong Excel and reporting skills essential for finance roles.",
      },
      {
        question: 'Will I get placement assistance after completing the program?',
        answer:
          "Yes! You’ll receive 100% placement assistance, including resume building, LinkedIn optimization, mock interviews, and job referrals with our hiring partners in the finance domain.",
      },
      {
        question: ' What certification will I receive?',
        answer:
          "You’ll earn a Certificate of Completion from GreyCampus and a Certificate of Internship upon completing your project simulations, both with verifiable credentials.",
      },
      {
        question: 'What is the duration and format of the Bootcamp?',
        answer:'The Bootcamp runs for 3 months and includes live mentor sessions, self-paced modules, and hands-on projects — designed for working professionals and students alike.',
      },
    ]
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
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
           Everything you need to know before joining the Investment Banking & Finance Operations Bootcamp.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          {/* <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFAQCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFAQCategory === category.id
                    ? 'bg-primary-green text-white shadow-md'
                    : 'bg-gray-200 text-dark-gray hover:bg-medium-gray hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div> */}

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
                      className="w-full px-6 py-4 text-left bg-gray-200 hover:bg-white transition-all duration-300 flex items-center justify-between"
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

export default IBFOFaq;
