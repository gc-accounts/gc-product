'use client';

import React, { useState } from 'react';
import HomeHeroSection from '@/components/home-page/HomeHeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HiringOrganizationSection from '@/components/HiringOrganizationSection';
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  program: string;
  currentBackground: string;
  preferredLearning: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function HomePage() {
  // Form states
  const [heroFormData, setHeroFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    program: '',
    currentBackground: '',
    preferredLearning: ''
  });

  const [enrollmentFormData, setEnrollmentFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    program: '',
    currentBackground: '',
    preferredLearning: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Carousel states
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // FAQ states
  const [activeFAQCategory, setActiveFAQCategory] = useState('curriculum');
  const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});

  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Form validation
  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    }
    
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!data.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!data.experienceLevel) {
      errors.experienceLevel = 'Please select your experience level';
    }

    if (!data.program) {
      errors.program = 'Please select your experience level';
    }
    
    return errors;
  };

  // Form submission
  const handleFormSubmit = async (formData: FormData, formType: 'hero' | 'enrollment') => {
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${formType} form submitted:`, formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Clear form after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        if (formType === 'hero') {
          setHeroFormData({ fullName: '', email: '', phone: '', experienceLevel: '', program: '', currentBackground: '', preferredLearning: '' });
        } else {
          setEnrollmentFormData({ fullName: '', email: '', phone: '', experienceLevel: '', program: '', currentBackground: '', preferredLearning: '' });
        }
      }, 2000);
    }, 1000);
  };





  // SECTION 3: PROGRAMS SECTION
  const ProgramsSection = () => {
    const programs = [
      {
        id: 'data-science',
        title: 'Data Science Bootcamp',
        price: '₹5,000 + GST',
        duration: '3-month LIVE online classes',
        description: 'Master Python, SQL, ML, and Power BI. Build data pipelines and predictive models for business impact.',
        highlights: [
          'Python & SQL mastery',
          'Machine Learning algorithms',
          'Power BI dashboards',
          'Real-world projects',
          '100% placement assistance'
        ],
        badge: 'Most Popular',
        icon: '📊',
        link: '/data-science-bootcamp'
      },
      {
        id: 'data-analyst',
        title: 'Data Analyst Bootcamp',
        price: '₹5,000 + GST',
        duration: '3-month LIVE online classes',
        description: 'Transform data into insights. Learn SQL, Excel, Power BI, and Tableau for data-driven decision making.',
        highlights: [
          'SQL & Excel expertise',
          'Power BI & Tableau',
          'Statistical analysis',
          'Business intelligence',
          '100% placement assistance'
        ],
        badge: 'Highest ROI',
        icon: '📈',
        link: '/data-analyst-bootcamp'
      },
      {
        id: 'aiml',
        title: 'AI/ML Bootcamp',
        price: '₹5,000 + GST',
        duration: '3-month LIVE online classes',
        description: 'Build production AI systems. Deep learning, LLMs, RAG systems, and autonomous agents.',
        highlights: [
          'Deep Learning & Neural Networks',
          'LLMs & Transformers',
          'RAG systems',
          'AI agents',
          '100% placement assistance'
        ],
        badge: 'Cutting Edge',
        icon: '🤖',
        link: '/aiml-bootcamp'
      }
    ];

    return (
      <section id="programs" className="bg-off-white py-10 sm:py-15 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Choose Your Path to Success
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Three comprehensive bootcamps designed for career transformation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {programs.map((program) => (
              <div key={program.id}>
                <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-border-gray hover:border-primary-green bg-white relative overflow-hidden">
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {program.badge}
                    </span>
                  </div>
                  
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="text-6xl mb-6">{program.icon}</div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-dark-gray mb-4">
                      {program.title}
                    </h3>
                    
                    {/* Price */}
                    <div className="text-3xl font-bold text-primary-green mb-2">
                      {program.price}
                    </div>
                    
                    {/* Duration */}
                    <p className="text-sm text-medium-gray mb-6">
                      {program.duration}
                    </p>
                    
                    {/* Description */}
                    <p className="text-base text-dark-gray leading-relaxed mb-6 flex-grow">
                      {program.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="space-y-2 mb-8">
                      {program.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0" />
                          <span className="text-sm text-dark-gray">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 text-lg font-semibold"
                      onClick={() => window.location.href = program.link}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // SECTION 4: WHO ARE WE?
  const WhoAreWeSection = () => (
    <section className="bg-white py-10 sm:py-15 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                Empowering Careers Through Affordable Education
              </h2>
              <p className="text-lg text-medium-gray leading-relaxed">
                Bridging the gap between ambition and opportunity
              </p>
              
              <div className="space-y-6">
                <p className="text-lg text-medium-gray leading-relaxed">
                  Greycampus is on a mission to democratize tech education. We believe world-class training shouldn&apos;t cost a fortune. Our bootcamps combine industry expertise, practical curriculum, and personalized mentorship—all at prices that don&apos;t break the bank.
                </p>
                <p className="text-lg text-medium-gray leading-relaxed">
                  We&apos;ve trained over 5,000+ students who&apos;ve gone on to transform their careers at leading companies worldwide.
                </p>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">5,000+</div>
                  <div className="text-sm text-medium-gray">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">95%</div>
                  <div className="text-sm text-medium-gray">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-green mb-2">120%</div>
                  <div className="text-sm text-medium-gray">Avg Salary Increase</div>
                </div>
              </div>
              
              {/* <Button 
                variant="outline" 
                className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
              >
                Read Our Story
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button> */}
            </div>
          </div>
          
          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative">
              {/* Abstract illustration representing transformation */}
              <div className="w-full h-96 bg-gradient-to-br from-primary-green/20 to-accent-blue/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-primary-green/30 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-12 h-12 bg-accent-blue/30 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-accent-gold/30 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-8 right-8 w-14 h-14 bg-primary-green/30 rounded-full animate-pulse delay-500"></div>
                
                {/* Central icon */}
                <div className="text-8xl">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // SECTION 5: WHY GREYCAMPUS?
  const WhyGreycampusSection = () => {
    const features = [
      {
        icon: '💰',
        title: 'Most Affordable',
        description: 'World-class education at 1/3 the market price. No compromise on quality.'
      },
      {
        icon: '👨‍🏫',
        title: 'Expert Instructors',
        description: 'Learn from engineers with 10+ years at Google, Meta, Amazon, and Microsoft.'
      },
      {
        icon: '🎯',
        title: '100% Job-Focused',
        description: 'Career-first curriculum. Resume building, interview prep, and placement support.'
      },
      {
        icon: '♾️',
        title: 'Working professinal',
        description: 'Access all materials forever. Continuous updates with latest tools and technologies.'
      },
      {
        icon: '🚀',
        title: 'Project based training',
        description: 'Build real-world projects used by actual companies. Portfolio-worthy work.'
      },
      {
        icon: '✅',
        title: 'Career services',
        description: '100% placement assistance.'
      }
    ];

    return (
      <section className="bg-gradient-to-br from-off-white to-green-50 py-10 sm:py-15 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Why Choose Greycampus?
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Uncompromising quality at unbeatable prices
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green bg-white">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-dark-gray mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-medium-gray leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // SECTION 6: TESTIMONIALS
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'Amit Sharma',
        role: 'Data Scientist at Google India',
        achievement: '₹4L → ₹11L (+175%)',
        quote: 'The Data Science bootcamp changed my life. Within 2 months of completion, I had offers from Google and Amazon. The hands-on projects made all the difference.',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Priya Gupta',
        role: 'Data Analyst at Microsoft',
        achievement: 'First tech role after CA',
        quote: 'Coming from finance, I was nervous. But the curriculum was so clear and practical. Now analyzing data at Microsoft and loving every moment.',
        rating: 5,
        avatar: '👩‍💻'
      },
      {
        name: 'Rohan Patel',
        role: 'ML Engineer at Meta',
        achievement: '₹8L → ₹16L (+100%)',
        quote: 'AI/ML bootcamp gave me production-ready skills. The LLM and RAG modules were incredible. Got placed at Meta within 3 weeks.',
        rating: 5,
        avatar: '👨‍🔬'
      },
      {
        name: 'Sneha Das',
        role: 'Business Analyst at Amazon',
        achievement: 'Career switch in 3 months',
        quote: 'I was stuck in marketing. The Data Analyst bootcamp opened doors I didn&apos;t know existed. Now working with data at Amazon.',
        rating: 5,
        avatar: '👩‍📊'
      },
      {
        name: 'Vikram Singh',
        role: 'Deep Learning Engineer at Nvidia',
        achievement: '₹10L → ₹20L (+100%)',
        quote: 'The depth of AI/ML curriculum is unmatched. Computer vision and deployment modules prepared me perfectly for Nvidia.',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Ananya Verma',
        role: 'Analytics Lead at Flipkart',
        achievement: 'Promoted twice in 1 year',
        quote: 'Data Science bootcamp gave me confidence to lead analytics initiatives. Skills learned here transformed my career trajectory.',
        rating: 5,
        avatar: '👩‍💻'
      },
      {
        name: 'Karthik Reddy',
        role: 'AI Product Manager at OpenAI',
        achievement: 'From backend to AI leadership',
        quote: 'AI/ML bootcamp taught me not just coding but product thinking. Now shaping AI products at OpenAI.',
        rating: 5,
        avatar: '👨‍🔬'
      },
      {
        name: 'Divya Malhotra',
        role: 'Senior Data Analyst at LinkedIn',
        achievement: '₹5L → ₹9L (+80%)',
        quote: 'The SQL and visualization modules were game-changing. Built dashboards that impressed LinkedIn interviewers.',
        rating: 5,
        avatar: '👩‍📊'
      }
    ];

    const nextTestimonial = () => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-play carousel
    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
      <section id="testimonials" className="bg-white py-10 sm:py-15 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Success Stories
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Real students. Real transformations. Real careers.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <div 
                key={currentTestimonial}
                className="bg-white rounded-2xl shadow-xl border border-border-gray overflow-hidden"
              >
                {/* Green Header Bar */}
                <div className="h-12 bg-primary-green"></div>
                
                <div className="p-8">
                  {/* Avatar */}
                  {/* <div className="flex justify-center -mt-10 mb-6">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-primary-green flex items-center justify-center text-3xl">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                  </div> */}
                  
                  {/* Quote */}
                  <blockquote className="text-center mb-6">
                    <p className="text-lg text-medium-gray italic leading-relaxed">
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </p>
                  </blockquote>
                  
                  {/* Name and Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-dark-gray mb-1">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-primary-green font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>
                    {/* <p className="text-sm font-bold text-primary-green mt-1">
                      {testimonials[currentTestimonial].achievement}
                    </p> */}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent-gold fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-primary-green' : 'bg-light-gray'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // SECTION 7: READY TO GET STARTED?
  // const ReadyToStartSection = () => (
  //       {/* CTA Section */}
  //       <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white to-green-50">
  //         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  //               <div className="text-center space-y-8">
  //             <div className="space-y-6">
  //               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
  //                 Ready to Transform Your Career?
  //               </h2>
  //               <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
  //                 Join thousands of professionals who&apos;ve already taken the leap with our affordable, industry-focused bootcamps.
  //               </p>
  //             </div>
              
  //             <div className="flex flex-col sm:flex-row gap-4 justify-center">
  //               <Button 
  //                 size="lg" 
  //                 className="bg-primary-green hover:bg-secondary-green text-white px-8 py-4 text-lg font-semibold"
  //                 onClick={() => window.location.href = '/data-science-bootcamp'}
  //               >
  //                 Explore Bootcamps
  //                 <ArrowRight className="ml-2 w-5 h-5" />
  //               </Button>
  //               <Button 
  //                 variant="outline" 
  //                 size="lg"
  //                 className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-4 text-lg font-semibold"
  //                 onClick={() => window.location.href = '/about'}
  //               >
  //                 Learn About Us
  //               </Button>
  //             </div>
  //             </div>
  //         </div>
  //       </section>
  // );

  const TransFormSection=()=>{
    return (
         <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white to-green-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                      <div className="text-center space-y-8">
                    <div className="space-y-6">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
                        Ready to Transform Your Career?
                      </h2>
                      <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                        Join thousands of professionals who&apos;ve already taken the leap with our affordable, industry-focused bootcamps.
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-primary-green hover:bg-secondary-green text-white px-8 py-4 text-lg font-semibold"
                        onClick={() => window.location.href = '/data-science-bootcamp'}
                      >
                        Explore Bootcamps
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white px-8 py-4 text-lg font-semibold"
                        onClick={() => window.location.href = '/about'}
                      >
                        Learn About Us
                      </Button>
                    </div>
                    </div>
                </div>
              </section>
    )
  }
  return (
    <div className="min-h-screen">
      <Navigation currentPage="home" />
      <main className="pt-16">
        <HomeHeroSection />
        {/* <HiringOrganizationsSection /> */}
        <HiringOrganizationSection sectionClass='px-[20px] py-[50px] md:px-[30px] md:py-[70px]' />
        <ProgramsSection />
        <WhoAreWeSection />
        <WhyGreycampusSection />
        <TestimonialsSection />
        <TransFormSection />
      </main>
      <Footer />
    </div>
  );
}