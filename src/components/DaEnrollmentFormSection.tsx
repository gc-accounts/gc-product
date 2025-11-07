import React from 'react'

interface Props {
  sectionClass?: string
}

const DaEnrollmentFormSection = ({ sectionClass }: Props) => {
  const taglines = [
    { icon: '💼', text: 'Industry-ready skills at affordable prices.' },
    { icon: '👨‍💼', text: 'Learn from experienced data professionals.' },
    { icon: '📁', text: 'Build a portfolio of real-world projects.' },
    { icon: '💰', text: '100% placement assistance.' },
    { icon: '♾️', text: 'Career support and career guidance.' },
  ]

  const colors = [
    'bg-white',
    'bg-blue-50',
    'bg-gray-50',
    'bg-indigo-50',
    'bg-white'
  ]

  return (
    <section className={`${sectionClass || ''} py-20 bg-gradient-to-b from-gray-50 to-white`}>
      <div className="container max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-gray mb-3">
            Your Data Analyst Career Starts Here
          </h2>
          <p className="text-gray-500 mx-auto">
            Master analytics, visualization, and business insights with hands-on guidance and industry projects.
          </p>
        </div>

        {/* Alternating Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {taglines.map((tagline, index) => (
            <div
              key={index}
              className={`group relative ${colors[index % colors.length]} p-6 rounded-2xl shadow-md border border-gray-100 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                index === 0 ? 'sm:col-span-2' : ''
              }`}
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{tagline.icon}</div>

              {/* Text */}
              <p className="text-lg text-gray-800 font-medium leading-snug">
                {tagline.text}
              </p>

              {/* Hover Accent Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DaEnrollmentFormSection
