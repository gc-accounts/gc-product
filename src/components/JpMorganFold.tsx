  import { Check } from 'lucide-react'
import React from 'react'
  
  const JpMorganFold = () => {
    return (
       <section className="bg-dark-gray px-5 py-[50px] md:px-[30px] md:py-[70px]">
  <div className="container max-w-4xl mx-auto">
  
    <h2 className="section-title mb-6 text-yellow-400 text-xl md:text-2xl font-bold text-start">
      🔔 J.P. Morgan, through Pride Global, has successfully conducted two Job drives with us
    </h2>

    <h3 className="text-gray-100 text-base md:text-xl font-semibold mb-6 leading-relaxed text-start">
      J.P. Morgan, through Pride Global, has successfully conducted two hiring sprints in collaboration with OdinSchool.
    </h3>

    <div className="text-gray-100 space-y-4 mb-6 text-start inline-block">
      <p className="flex items-start gap-2">
        <Check  className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        2 drives completed
      </p>
      <p className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        350+ participants
      </p>
      <p className="flex items-start gap-2">
        <Check className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
        Candidates from Commerce & Finance backgrounds – B.Com, BBA, MBA, and
        related fields
      </p>
    </div>

   <p className="text-gray-100 italic font-medium text-base md:text-lg  mb-6">
      These hiring sprints have opened exciting opportunities for students to
      launch their careers with one of the world’s leading financial institutions.
    </p>

    <p className="text-yellow-400 font-semibold text-lg md:text-xl">
      👉 You could be part of the next hiring sprint — stay tuned for details!
    </p>
  </div>
</section>
    )
  }
  
  export default JpMorganFold