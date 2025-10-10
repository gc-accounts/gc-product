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

// Company Logos Data
const companyLogos = [
   "https://strapi.odinschool.com/uploads/Meesho_100x40_individual_81f680e677.webp",
      "https://strapi.odinschool.com/uploads/prolifics_100_X40_Individual_02765c8bbc.webp",
      "https://strapi.odinschool.com/uploads/Ensoft100_X40_105ed0f32a.webp",
      "https://strapi.odinschool.com/uploads/Deloitte_100_X40_1_1_ca02ecb519.webp",
      "https://strapi.odinschool.com/uploads/Tatvic_100_X40_92af98eb92.webp",
      "https://strapi.odinschool.com/uploads/genpact_100_X40_280d97151b.webp",
      "https://strapi.odinschool.com/uploads/Pepsico100_X40_a3d789f2d4.webp",
      "https://strapi.odinschool.com/uploads/Synchrony_INDIVIDUAL_100_X40_6cc77d6f53.webp",
      "https://strapi.odinschool.com/uploads/TCS_100_X40_Individual_7ceeb6c515.webp",
      "https://strapi.odinschool.com/uploads/Cognizant_100_X40_1_20f9d634ed.webp",
      "https://strapi.odinschool.com/uploads/sutherland100_X40_d68abd31db.webp",
      "https://strapi.odinschool.com/uploads/swiggy_100x40_indv_2fad998515.webp",
      "https://strapi.odinschool.com/uploads/Infosys_100_X40_285cf1a2c6.webp",
      "https://strapi.odinschool.com/uploads/IBM_100_X40_a4922015b6.webp",
      "https://strapi.odinschool.com/uploads/JKTECH_100_X40_5229c19c27.webp",
      "https://strapi.odinschool.com/uploads/Saarthi_Individual_100_x40_39ee46a45c.webp",
      "https://strapi.odinschool.com/uploads/Tech_Mahindra100_X40_769822fb36.webp",
      "https://strapi.odinschool.com/uploads/Bodhtree_INDIVIDUAL_100_X40_e4c952b088.webp",
];

// Bootcamp Data
const bootcamps = [
  {
    icon: "📊",
    title: "Data Science Bootcamp",
    price: "₹5,000 + GST",
    duration: "20 weeks",
    students: "8,000+",
    topics: "Python, SQL, ML, Power BI, Generative AI",
    placement: "100%+",
    link: "/data-science-bootcamp"
  },
  {
    icon: "📈",
    title: "Data Analyst Bootcamp", 
    price: "₹5,000 + GST",
    duration: "16 weeks",
    students: "6,000+",
    topics: "Excel, SQL, Power BI, Python, Analytics",
    placement: "100%+",
    link: "/data-analyst-bootcamp"
  },
  {
    icon: "🤖",
    title: "AI/ML Bootcamp",
    price: "₹5,000 + GST", 
    duration: "20 weeks",
    students: "4,000+",
    topics: "LLMs, Deep Learning, RAGs, AI Agents",
    placement: "100%+",
    link: "/aiml-bootcamp"
  }
];

// Roadmap Data
const roadmapItems = [
  {
    year: "2024",
    title: "Global Expansion",
    description: "Launch bootcamps in 10 new countries",
    status: "In Progress",
    icon: "🌍"
  },
  {
    year: "2025",
    title: "AI-Powered Learning",
    description: "Integrate AI tutors and personalized learning paths",
    status: "Planned",
    icon: "🤖"
  },
  {
    year: "2026",
    title: "Industry Partnerships",
    description: "Direct placement partnerships with 1000+ companies",
    status: "Planned",
    icon: "🤝"
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
        <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white via-white to-green-50 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* LEFT CONTENT (60%) */}
              <div className="lg:col-span-3 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
                    Empowering Professionals Through World-Class Education
                  </h1>
                  <p className="text-lg text-medium-gray leading-relaxed">
                    Greycampus: Skilling up professionals to enable growth, productivity, and efficiency
                  </p>
                  <p className="text-base text-medium-gray leading-relaxed">
                    We believe every organization should be able to skill up their workforce effectively in a professional, effective, and affordable manner.
                  </p>
                </div>
                
                <div>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white h-12 text-base font-semibold"
                  >
                    Explore Our Mission
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              {/* RIGHT CONTENT (40%) */}
              <div className="lg:col-span-2 lg:sticky lg:top-24">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary-green/10 to-accent-blue/10 rounded-2xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-primary-green/20 rounded-full flex items-center justify-center mx-auto">
                          <Users className="w-12 h-12 text-primary-green" />
                        </div>
                        <p className="text-medium-gray font-medium">Team Collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR STORY */}
        <section className="py-10 sm:py-15 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT CONTENT */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                    Our Story
                  </h2>
                  <p className="text-lg text-medium-gray leading-relaxed">
                    From vision to reality: How we&apos;re transforming education
                  </p>
                  
                  <div className="space-y-6">
                    <p className="text-lg text-medium-gray leading-relaxed">
                      Greycampus was born from a simple observation: world-class tech education shouldn&apos;t cost a fortune. Founded in 2017 by industry veterans who&apos;ve worked at Google, Amazon, and Microsoft, we set out to democratize professional development.
                    </p>
                    <p className="text-lg text-medium-gray leading-relaxed">
                      What started as a small team with a big dream has grown into a global platform that&apos;s trained over 50,000 professionals. Our mission remains unchanged: make high-quality, industry-relevant education accessible to everyone.
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                  >
                    Read Our Full Story
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* RIGHT CONTENT - Visual */}
              <div className="relative">
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-br from-primary-green/20 to-accent-blue/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-8 left-8 w-16 h-16 bg-primary-green/30 rounded-full"></div>
                    <div className="absolute top-16 right-12 w-12 h-12 bg-accent-blue/30 rounded-full"></div>
                    <div className="absolute bottom-12 left-12 w-20 h-20 bg-accent-gold/30 rounded-full"></div>
                    <div className="absolute bottom-8 right-8 w-14 h-14 bg-primary-green/30 rounded-full"></div>
                    
                    <div className="text-8xl">🚀</div>
                  </div>
                </div>
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

        {/* SECTION 6: OUR BOOTCAMPS */}
        <section className="py-10 sm:py-15 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Our Bootcamps
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                Comprehensive programs designed for career transformation
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {bootcamps.map((bootcamp, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white relative overflow-hidden">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-6xl mb-6">{bootcamp.icon}</div>
                    
                    <h3 className="text-2xl font-bold text-dark-gray mb-4">
                      {bootcamp.title}
                    </h3>
                    
                    <div className="text-3xl font-bold text-primary-green mb-2">
                      {bootcamp.price}
                    </div>
                    
                    <p className="text-sm text-medium-gray mb-6">
                      {bootcamp.duration}
                    </p>
                    
                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0" />
                        <span className="text-sm text-dark-gray">{bootcamp.students} students trained</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0" />
                        <span className="text-sm text-dark-gray">{bootcamp.placement} placement rate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0" />
                        <span className="text-sm text-dark-gray">{bootcamp.topics}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 text-lg font-semibold"
                      onClick={() => window.location.href = bootcamp.link}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: PARTNERS & CLIENTS */}
        <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Trusted by Leading Companies
              </h2>
                <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                  Our graduates work at the world&apos;s most innovative organizations
                </p>
            </div>
            
            <div className="overflow-hidden">
              <div className="flex space-x-8 animate-scroll">
                {[...companyLogos, ...companyLogos].map((company, index) => (
                  <div key={index} className="flex-shrink-0 w-40 h-20 bg-white rounded-lg flex items-center justify-center border border-border-gray hover:border-primary-green transition-colors group">
                    <img src={company} alt="logo" />
                    {/* <span className="text-sm font-semibold text-dark-gray group-hover:text-primary-green transition-colors">{company}</span> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: ROADMAP */}
        <section className="py-10 sm:py-15 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Our Roadmap
              </h2>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                Exciting plans for the future of education
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {roadmapItems.map((item, index) => (
                <Card key={index} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-5xl mb-6">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-dark-gray mb-4">
                      {item.title}
                    </h3>
                    <p className="text-medium-gray leading-relaxed flex-grow mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary-green">{item.year}</span>
                      <span className="text-xs bg-primary-green/10 text-primary-green px-2 py-1 rounded-full">
                        {item.status}
                      </span>
                    </div>
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