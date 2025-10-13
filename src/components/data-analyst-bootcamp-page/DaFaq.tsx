'use client'
import React, { useState } from 'react'

  const DaFaq = () => {
    const faqCategories = [
      {
        id: 'curriculum',
        name: 'Curriculum & Content'
      },
      {
        id: 'job',
        name: 'Job & Placement'
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
          question: 'Do I need any programming experience to join?',
          answer: 'No! This bootcamp is designed for beginners. We start with fundamentals and gradually progress. Even if you haven\'t coded before, you\'ll feel comfortable with our hands-on approach.'
        },
        {
          question: 'How is the curriculum updated?',
          answer: 'We update our curriculum monthly based on industry trends and feedback. You\'ll have lifetime access to the latest materials. Your learning never becomes outdated.'
        },
        {
          question: 'What if I\'m from a non-technical background?',
          answer: 'Perfect! Many of our successful graduates come from non-technical backgrounds (finance, marketing, HR). We make complex concepts simple and relatable.'
        },
        {
          question: 'Will I learn the latest tools and technologies?',
          answer: 'Absolutely. We cover the latest and most in-demand tools: Excel, SQL, Python, Power BI. Each tool is taught with real-world applications.'
        }
      ],
      job: [
        {
          question: 'What is the job placement rate?',
          answer: '95% of our students get placed within 3 months of completing the bootcamp. We have partnerships with 500+ companies including Google, Amazon, Microsoft, and others.'
        },
        {
          question: 'What roles can I get after this bootcamp?',
          answer: 'Data Analyst, Business Analyst, Analytics Engineer, BI Developer, Financial Analyst, Marketing Analyst, and more. The specific role depends on your interests and background.'
        },
        {
          question: 'What\'s the average salary after placement?',
          answer: 'Entry-level positions range from ₹6L - 8L annually, with 95% average salary increase for career changers. Senior roles can pay ₹10L-15L+.'
        },
        {
          question: 'Do you provide job guarantee?',
          answer: 'We offer 95% placement support within 3 months. If you don\'t get placed, we provide continued support at no extra cost.'
        }
      ],
      practical: [
        {
          question: 'How long is the bootcamp?',
          answer: 'The standard program is 3 months (4 months). However, we offer flexible schedules: intensive (12 weeks) or part-time (20 weeks).'
        },
        {
          question: 'How many hours per week do I need to dedicate?',
          answer: 'Full-time: 20-25 hours per week. Part-time: 10-15 hours weekly. This includes lectures, projects, and self-study.'
        },
        {
          question: 'Can I study while working full-time?',
          answer: 'Yes! Many of our students work full-time.'
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'We offer 90%+ placement support within 3 months. Our career team provides resume review, interview prep, mock interviews, and job connections with hiring companies.'
        }
      ],
      enrollment: [
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept credit cards, debit cards, net banking, UPI, and EMI options (interest-free installments).'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees. The price you see (₹5,000 + GST) is all-inclusive. No extra charges.'
        },
        {
          question: 'Can I get a scholarship or discount?',
          answer: 'Yes! We offer scholarships for underprivileged students, group discounts, and referral bonuses. Contact us for details.'
        },
        {
          question: 'What if I need to defer my enrollment?',
          answer: 'You can defer your start date for up to 3 months without any penalty. Contact our team to arrange this.'
        }
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


export default DaFaq