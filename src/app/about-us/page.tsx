'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Linkedin, 
  CheckCircle,
  Users
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Simple counter hook without animations
const useCounter = (end: number) => {
  const [count] = useState(end);
  const ref = useRef<HTMLDivElement>(null);

  return { count, ref };
};

// Team Member Data
const teamMembers = [
  {
    name: "Deb",
    title: "CEO & Founder",
    company: "Greycampus & OdinSchool",
    bio: "Deb is the visionary behind Greycampus and OdinSchool. With 15+ years of experience in online education and tech training, Deb has led the mission to democratize professional development. Her passion for innovation and commitment to affordability has transformed thousands of careers.",
    avatar: "/api/placeholder/120/120",
    social: { linkedin: "#" }
  },
  {
    name: "Srinivas",
    title: "Head of Product",
    company: "Greycampus",
    bio: "Srinivas brings 12+ years of product development expertise from leading tech companies. He oversees curriculum design, platform development, and ensures every course meets industry standards. His data-driven approach has consistently improved student outcomes.",
    avatar: "/api/placeholder/120/120",
    social: { linkedin: "#" }
  },
  {
    name: "Shruti",
    title: "Head of Enterprise Business",
    company: "Greycampus",
    bio: "Shruti leads corporate partnerships and enterprise solutions at Greycampus. With 10+ years in B2B business development, she&apos;s built relationships with 500+ partner companies. Her strategic initiatives have expanded Greycampus&apos;s reach across industries and geographies.",
    avatar: "/api/placeholder/120/120",
    social: { linkedin: "#" }
  }
];



export default function AboutPage() {
  // Counter hooks
  const studentsCount = useCounter(50000);
  const placementCount = useCounter(95);
  const salaryCount = useCounter(120);
  const partnersCount = useCounter(500);
  const ratingCount = useCounter(4.9);
  const yearsCount = useCounter(7);

  return (
    <div className="min-h-screen">
      <Navigation currentPage="about" />

      <main className="pt-16">
        {/* SECTION 1: HERO SECTION */}
        <section className="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px] flex items-center">
          <div className="container mx-auto text-center">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

              <div className="lg:col-span-12">
                <div className="mb-4">
                  <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight mb-2">About <span className="text-gradient">Us</span></h1>
                  <p className="text-lg text-medium-gray leading-relaxed">
                    Skilling Up Professionals to Enable Growth, Productivity and Efficiency
                  </p>
                  </div>

                  <img src="https://strapi.greycampus.com/uploads/gc_about_us_a22c7767c7.webp" className='w-full h-auto mx-auto rounded-lg max-w-4xl' alt="about us" />

                
              </div>
              

            </div>
          </div>
        </section>

        {/* SECTION 2: OUR STORY */}
        <section className="py-10 sm:py-15 lg:py-20 bg-white">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT CONTENT */}
              <div className="col-span-7">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                    Our Story
                  </h2>

                  
                  <div className="space-y-6">
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">
                      At GreyCampus, we believe that every organisation should be able to skill up their workforce effectively in a professional, effective, and affordable manner. With that in mind, we have set out to create the world’s best-value platform where learners can access high-quality online courses, focused practical sessions from practitioners, and get their questions answered directly by experts.
                    </p>
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">
                      After 7 years of successful skilling globally, we launched OdinSchool, our India- focussed brand, in 2021 to focus on upskilling graduates and working professionals in high-demand technologies for the Indian industry.
                    </p>
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">We believe the best-value learning experience need not necessarily involve attending a traditional classroom lecture. Instead, pairing up learning content created by top instructors with dedicated, 24×7 Q&A support from subject experts can deliver an equivalent (if not superior) learning experience.</p>
                  </div>
                  
                </div>
              </div>
              

              <div className="col-span-5">
                <img src="https://strapi.greycampus.com/uploads/about_2_9683681ce5.jpg" className=' h-auto mx-auto rounded-lg max-w-4xl' alt="about us" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: OUR VALUES */}
        <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Our Values
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">🎯</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">
                    Student Success First
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    Every decision we make is guided by one question: &quot;Will this help our students succeed?&quot; From curriculum design to support systems, student outcomes drive our priorities.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">💰</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">
                    Affordable Excellence
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    Quality education shouldn&apos;t be a luxury. We&apos;re committed to delivering world-class training at prices that don&apos;t break the bank, making career transformation accessible to all.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">🚀</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">
                    Innovation & Growth
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    We continuously evolve our curriculum, technology, and teaching methods to stay ahead of industry trends and provide cutting-edge education.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">🤝</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">
                    Community & Support
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    Learning is better together. We foster a supportive community where students, instructors, and alumni help each other grow and succeed.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">📊</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">
                    Data-Driven Decisions
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    We use data and analytics to continuously improve our programs, ensuring our curriculum stays relevant and effective for real-world success.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="text-5xl mb-6">🌍</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-4">
                    Global Impact
                  </h3>
                  <p className="text-medium-gray leading-relaxed flex-grow">
                    We&apos;re building a global community of skilled professionals who are driving innovation and growth in their organizations and communities worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 4: IMPACT & STATS */}
        <section className="py-10 sm:py-15 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Our Impact
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                Numbers that tell the story of transformation
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="text-center">
                <div ref={studentsCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {studentsCount.count.toLocaleString()}+
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Students Trained</h3>
                <p className="text-medium-gray">Professionals who&apos;ve transformed their careers</p>
              </div>
{/* 
              <div className="text-center">
                <div ref={placementCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {placementCount.count}%
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Placement Rate</h3>
                <p className="text-medium-gray">Success rate in career transitions</p>
              </div> */}

              {/* <div className="text-center">
                <div ref={salaryCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {salaryCount.count}%
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Average Salary Increase</h3>
                <p className="text-medium-gray">Typical salary boost after completion</p>
              </div> */}

              <div className="text-center">
                <div ref={partnersCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {partnersCount.count}+
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Partner Companies</h3>
                <p className="text-medium-gray">Organizations hiring our graduates</p>
              </div>

              <div className="text-center">
                <div ref={ratingCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {ratingCount.count}/5
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Student Rating</h3>
                <p className="text-medium-gray">Average satisfaction score</p>
              </div>

              <div className="text-center">
                <div ref={yearsCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {yearsCount.count}+
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Years of Excellence</h3>
                <p className="text-medium-gray">Delivering quality education</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR TEAM */}
        <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Meet Our Team
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                Industry veterans and education experts working together
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {teamMembers.map((member, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">👨‍💼</span>
                      </div>
                      <h3 className="text-xl font-semibold text-dark-gray mb-2">{member.name}</h3>
                      <p className="text-primary-green font-medium mb-1">{member.title}</p>
                      <p className="text-sm text-medium-gray">{member.company}</p>
                    </div>
                    
                    <p className="text-medium-gray leading-relaxed flex-grow mb-6">
                      {member.bio}
                    </p>
                    
                    {/* <div className="flex justify-center">
                      <a 
                        href={member.social.linkedin}
                        className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>




        {/* SECTION 9: CTA */}
        <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white via-white to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray">
                  Join Our Mission
                </h2>
                <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                  Be part of the education revolution
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-medium-gray leading-relaxed mb-8">
                  Whether you&apos;re looking to transform your career or help others do the same, there&apos;s a place for you in the Greycampus community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary-green hover:bg-secondary-green text-white px-12 py-4 text-lg font-semibold w-full sm:w-auto"
                    onClick={() => window.location.href = '/data-science-bootcamp'}
                  >
                    Explore Bootcamps
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-12 py-4 text-lg font-semibold w-full sm:w-auto"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}