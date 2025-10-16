'use client'
import React, { useState } from 'react'

  const AimlFaqs = () => {
    const faqCategories = [
      {
        id: 'curriculum',
        name: 'Curriculum & Content'
      },
      {
        id: 'career',
        name: 'Career & Placement'
      },
      {
        id: 'practical',
        name: 'Practical Details'
      },
      {
        id: 'enrollment',
        name: 'Enrollment & Payment'
      }
    ];

      // FAQ states
      const [activeFAQCategory, setActiveFAQCategory] = useState('curriculum');
      const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});

    const faqs = {
      curriculum: [
      {
        question: 'How long is the bootcamp?',
        answer:
          "The bootcamp is 3 months long, with 10 comprehensive modules covering all aspects of data science from fundamentals to advanced topics.",
      },
      {
        question: 'What is the time commitment required?',
        answer:
          "We recommend 15-20 hours per week for optimal learning. The program is designed to be flexible for working professionals and students.",
      },
      {
        question: 'What kind of placement assistance is available?',
        answer:
          "We provide 100% Placement assistance to all students who complete the Bootcamp, meeting the expected performance standards and continue to offer this assistance up until two years following the bootcamp's start date.",
      },
      {
        question: 'What if I miss a live session?',
        answer:
          'We offer 3-months LIVE online classes. All live sessions are recorded and available for replay. You can access them anytime during the bootcamp and even after bootcamp completion upto 2 years.',
      },
        {
        question: 'Is there a refund policy for this AI and ML Bootcamp?',
        answer:'As per our refund policy, fee amounts once paid are non-refundable.',
      },
    ]
    };

    const toggleFAQ = (category: string, index: number) => {
      const key = `${category}-${index}`;
      setExpandedFAQs(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };

    return (
      <section id="faq" className="py-10 sm:py-15 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Everything you need to know about the AI/ML bootcamp
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            {/* <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFAQCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeFAQCategory === category.id
                      ? 'bg-primary-green text-white shadow-md'
                      : 'bg-light-gray text-dark-gray hover:bg-medium-gray hover:text-white'
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
                        className="w-full px-6 py-4 text-left bg-light-gray hover:bg-white transition-all duration-300 flex items-center justify-between"
                      >
                        <h3 className="text-base font-semibold text-dark-gray pr-4">
                          {faq.question}
                        </h3>
                        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="px-6 py-4 bg-off-white">
                          <p className="text-sm text-medium-gray leading-relaxed">
                            {faq.answer}
                          </p>
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

export default AimlFaqs