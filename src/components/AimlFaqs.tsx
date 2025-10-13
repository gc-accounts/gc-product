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
          question: 'What if I\'m new to AI/ML?',
          answer: 'Perfect! This bootcamp is designed to take you from beginner to professional. We start with Python fundamentals and gradually progress to advanced AI/ML concepts. Many successful graduates started with zero ML experience.'
        },
        {
          question: 'Will I learn the latest AI technologies?',
          answer: 'Absolutely! We cover the latest and greatest: LLMs, RAGs, AI Agents, transformers, and generative AI. Curriculum updates monthly as new technologies emerge. You\'ll stay ahead of the curve.'
        },
        {
          question: 'What programming experience do I need?',
          answer: 'We recommend basic Python knowledge, but it\'s not mandatory. We have a Python pre-course for beginners. The key is willingness to learn and dedication.'
        },
        {
          question: 'Is this bootcamp hands-on or theory-focused?',
          answer: 'Heavily hands-on! 70% practical coding, 30% concepts. You\'ll build 3 capstone projects, deploy models, and work with production systems. Real-world skills for real jobs.'
        }
      ],
      career: [
        {
          question: 'What is the job placement rate?',
          answer: '90%+ of our students get placed within 3 months of completing the bootcamp. We have partnerships with 500+ companies including Google, Meta, Amazon, OpenAI, and others.'
        },
        {
          question: 'What roles can I get after this bootcamp?',
          answer: 'ML Engineer, AI Engineer, Deep Learning Specialist, NLP Engineer, Computer Vision Engineer, ML Operations Engineer, and more. Average entry-level salary: ₹12L-18L.'
        },
        {
          question: 'What\'s the average salary after placement?',
          answer: 'Entry-level: ₹12L-18L annually. Mid-level: ₹18L-25L+. Senior roles: ₹25L+. AI/ML is the highest-paying tech role with 40% more than software engineers.'
        },
        {
          question: 'Do you provide job guarantee or placement assistance?',
          answer: 'We offer 90%+ placement support within 3 months. Our career team provides resume review, interview prep, mock interviews, and job connections with hiring companies.'
        }
      ],
      practical: [
        {
          question: 'How long is the bootcamp?',
          answer: 'The standard program is 20 weeks (5 months). We also offer intensive (12 weeks) and flexible part-time (30 weeks) options to suit your schedule.'
        },
        {
          question: 'How many hours per week do I need to dedicate?',
          answer: 'Full-time: 25-30 hours per week. Part-time: 12-15 hours weekly. This includes lectures, projects, and self-study. Most students complete assignments in 5-8 hours per week.'
        },
        {
          question: 'Can I study while working full-time?',
          answer: 'Yes! Many students work full-time while studying part-time. The flexible schedule, and optional live sessions make it manageable.'
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'We offer 90%+ placement support within 3 months. Our career team provides resume review, interview prep, mock interviews, and job connections with hiring companies.'
        }
      ],
      enrollment: [
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept credit cards, debit cards, net banking, UPI, and interest-free EMI options. We\'re also exploring cryptocurrency. Contact us for details.'
        },
        {
          question: 'Are there any hidden fees or charges?',
          answer: 'No hidden fees! The price you see (₹5,000 + GST) is all-inclusive. No extra charges for materials, certificates, or support.'
        },
        {
          question: 'Do you offer scholarships or discounts?',
          answer: 'Yes! We offer scholarships for underprivileged students, group discounts, referral bonuses, and early-bird discounts. Contact our team to learn more.'
        },
        {
          question: 'What if I need to defer my enrollment?',
          answer: 'You can defer your start date for up to 3 months without penalty. If you need to defer longer, we can work out a custom plan. No pressure.'
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
              Everything you need to know about the AI/ML bootcamp
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
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

export default AimlFaqs