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
    img: "https://strapi.odinschool.com/uploads/Deb_bc6a9c9aec.webp",
    title: "CEO & Founder",
    company: "Greycampus",
    bio: "Deb is the visionary behind Greycampus. With 15+ years of experience in online education and tech training, Deb has led the mission to make professional development accessible to everyone. His passion for innovation and commitment to affordability has transformed thousands of careers.",
    avatar: "/api/placeholder/120/120",
    social: { linkedin: "#" }
  },
  {
    name: "Srinivas",
    img: "https://strapi.odinschool.com/uploads/Srinivas_3f5cb08d93.webp",
    title: "Head of Product",
    company: "Greycampus",
    bio: "Srinivas brings 12+ years of product development expertise from leading tech companies. He oversees curriculum design, platform development, and ensures every course meets industry standards. His data-driven approach has consistently improved student outcomes.",
    avatar: "/api/placeholder/120/120",
    social: { linkedin: "#" }
  },
  {
    name: "Shruti",
    img: "https://strapi.odinschool.com/uploads/Shruti_8a032072a7.webp",
    title: "Head of Enterprise Business",
    company: "Greycampus",
    bio: "Shruti is the head of Corporate Partnerships and Enterprise Solutions for Greycampus. Bringing 10+ years of B2B business development expertise, she has successfully forged relationships with over 400 partner companies. She drives strategic initiatives that are vital to expanding Greycampus's footprint across diverse industries and global markets.",
    avatar: "/api/placeholder/120/120",
    social: { linkedin: "#" }
  }
];



export default function AboutUs() {
  // Counter hooks
  const studentsCount = useCounter(50000);
  const partnersCount = useCounter(400);
  const ratingCount = useCounter(85);
  const yearsCount = useCounter(10);

  return (
    <div className="min-h-screen">
      <Navigation currentPage="about-us" />

      <main className="pt-16">
        {/* SECTION 1: HERO SECTION */}
        <section className="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px] flex items-center">
          <div className="container max-w-7xl mx-auto text-center">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">

              <div className="lg:col-span-12">
                <div className="mb-4">
                  <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight mb-2">About <span className="text-gradient">Us</span></h1>
                  <p className="text-base text-medium-gray leading-relaxed">
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
          <div className="container max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* LEFT CONTENT */}
              <div className="col-span-7">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                    Our Story
                  </h2>

                  
                  <div className="space-y-6">
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">
                      At GreyCampus, founded in 2014, we're committed to the belief that every individual and organization should have access to professional, effective, and affordable upskilling.
                    </p>
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">Bridging the Gap Between Ambition and Opportunity. We set out to create a platform that delivers the world's best value in learning. We believe world-class technical training shouldn't cost a fortune. Our programs and intensive bootcamps combine deep industry expertise, practical, job-focused curriculum, and personalized mentorship—all at prices that are accessible.</p>
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">Learners can access a wealth of resources, including high-quality online courses, focused practical sessions led by experienced practitioners, and direct support to get their questions answered by subject matter experts.</p>
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">Following our sustained success in skilling professionals globally, we continue to refine our approach. We firmly believe that a high-value learning experience doesn't require a traditional classroom setting. Instead, by combining premium learning content created by top instructors with dedicated, 24x7 Q&A support from subject experts, we deliver an equivalent—if not superior—learning experience.</p>
                    <p className="md:text-base text-sm text-medium-gray leading-relaxed">We've successfully trained over 50,000+ students who have gone on to transform their careers at leading companies worldwide.</p>
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
        <section className="py-10 sm:py-15 lg:py-20 bg-linear-to-br from-off-white to-green-50">
          <div className="container max-w-7xl mx-auto">
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
                  <p className="text-medium-gray leading-relaxed grow">
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
                  <p className="text-medium-gray leading-relaxed grow">
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
                  <p className="text-medium-gray leading-relaxed grow">
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
                  <p className="text-medium-gray leading-relaxed grow">
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
                  <p className="text-medium-gray leading-relaxed grow">
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
                  <p className="text-medium-gray leading-relaxed grow">
                    We&apos;re building a global community of skilled professionals who are driving innovation and growth in their organizations and communities worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* SECTION 4: IMPACT & STATS */}
        <section className="py-10 sm:py-15 lg:py-20 bg-white">
          <div className="container max-w-7xl mx-auto">
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

              <div className="text-center">
                <div ref={partnersCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {partnersCount.count}+
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Partner Companies</h3>
                <p className="text-medium-gray">Organizations hiring our graduates</p>
              </div>

              <div className="text-center">
                <div ref={ratingCount.ref} className="text-4xl lg:text-5xl font-bold text-primary-green mb-4">
                  {ratingCount.count}%
                </div>
                <h3 className="text-xl font-semibold text-dark-gray mb-2">Net Promoter Score(NPS)</h3>
                <p className="text-medium-gray">Reflecting strong student satisfaction</p>
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
        <section className="py-10 sm:py-15 lg:py-20 bg-linear-to-br from-off-white to-green-50">
          <div className="container max-w-7xl mx-auto">
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
                      <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
                          <img src={member.img} alt={member.name} className='rounded-full' />
                      </div>
                      <h3 className="text-xl font-semibold text-dark-gray mb-2">{member.name}</h3>
                      <p className="text-primary-green font-medium mb-1">{member.title}</p>
                      <p className="text-sm text-medium-gray">{member.company}</p>
                    </div>
                    
                    <p className="text-medium-gray text-sm leading-relaxed grow mb-6">
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
        <section className="py-10 sm:py-15 lg:py-20 bg-linear-to-br from-off-white via-white to-blue-50 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-20 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container max-w-7xl mx-auto relative z-10">
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
                <p className="text-base text-medium-gray leading-relaxed mb-8">
                  Whether you&apos;re looking to transform your career or help others do the same, there&apos;s a place for you in the Greycampus community.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary-green hover:bg-secondary-green text-white px-12 py-4 text-lg font-semibold w-full sm:w-auto"
                    onClick={() => window.location.href = '/#programs'}
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