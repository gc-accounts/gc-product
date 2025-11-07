import React from 'react'

interface Props {
  sectionClass?: string
}

const IbfoEnrollmentFormSection = ({ sectionClass }: Props) => {
  const taglines = [
    { icon: '💡', text: 'Affordable education. Premium finance training.' },
    { icon: '👨‍🏫', text: 'Learn from investment banking and finance experts with 10+ years of experience.' },
    { icon: '📁', text: 'Build a portfolio of real-world finance and banking projects.' },
    { icon: '💼', text: '100% placement assistance and career support.' },
    { icon: '🔗', text: 'Get continuous guidance from mentors and industry advisors.' },
  ]

  const colors = ['bg-white', 'bg-blue-50', 'bg-gray-50', 'bg-indigo-50', 'bg-white']

  return (
    <section className={`${sectionClass || ''} py-20 bg-gradient-to-b from-gray-50 to-white`}>
      <div className="container max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-3">
            Your Investment Banking Career Starts Here
          </h2>
          <p className="text-gray-500 mx-auto">
            Master core concepts in investment banking, corporate finance, and financial modeling with hands-on projects.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {taglines.map((tagline, index) => (
            <div
              key={index}
              className={`group relative ${colors[index % colors.length]} 
              p-6 rounded-2xl shadow-md border border-gray-100 
              hover:shadow-xl hover:-translate-y-1 
              transition-all duration-300 ${
                index === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="text-4xl mb-4">{tagline.icon}</div>
              <p className="text-lg text-gray-800 font-medium leading-snug">
                {tagline.text}
              </p>
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IbfoEnrollmentFormSection
