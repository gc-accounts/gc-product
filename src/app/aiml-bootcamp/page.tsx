'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Target,
  BookOpen,
  Briefcase,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Linkedin,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';
import HeroSection from '@/components/aiml-bootcamp-page/HeroSection';
import EnrollmentFormSection from '@/components/aiml-bootcamp-page/EnrollmentFormSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import HiringOrganizationSection from '@/components/HiringOrganizationSection';
import AImlCurriculumSection from '@/components/aiml-bootcamp-page/AImlCurriculumSection';
import AimlFaqs from '@/components/aiml-bootcamp-page/AimlFaqs';
// Form state management
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  background: string;
  interestTrack: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function AIMLBootcampPage() {
  // Form states
  const [heroFormData, setHeroFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    background: '',
    interestTrack: ''
  });

  const [enrollmentFormData, setEnrollmentFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    background: '',
    interestTrack: ''
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
          setHeroFormData({ fullName: '', email: '', phone: '', experienceLevel: '', background: '', interestTrack: '' });
        } else {
          setEnrollmentFormData({ fullName: '', email: '', phone: '', experienceLevel: '', background: '', interestTrack: '' });
        }
      }, 2000);
    }, 1000);
  };

  // Navigation Header
  const NavigationHeader = () => (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border-gray z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <span className="text-xl font-bold text-dark-gray">Greycampus</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-medium-gray hover:text-primary-green transition-colors">Data Science Bootcamp</a>
            <a href="/data-analyst-bootcamp" className="text-medium-gray hover:text-primary-green transition-colors">Data Analyst Bootcamp</a>
            <a href="#curriculum" className="text-medium-gray hover:text-primary-green transition-colors">Curriculum</a>
            <a href="#careers" className="text-medium-gray hover:text-primary-green transition-colors">Careers</a>
            <a href="#pricing" className="text-medium-gray hover:text-primary-green transition-colors">Pricing</a>
            <a href="#faq" className="text-medium-gray hover:text-primary-green transition-colors">FAQ</a>
            <Button className="bg-primary-green hover:bg-secondary-green text-white">
              Enroll Now
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-gray">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-medium-gray hover:text-primary-green transition-colors">Data Science Bootcamp</a>
              <a href="/data-analyst-bootcamp" className="text-medium-gray hover:text-primary-green transition-colors">Data Analyst Bootcamp</a>
              <a href="#curriculum" className="text-medium-gray hover:text-primary-green transition-colors">Curriculum</a>
              <a href="#careers" className="text-medium-gray hover:text-primary-green transition-colors">Careers</a>
              <a href="#pricing" className="text-medium-gray hover:text-primary-green transition-colors">Pricing</a>
              <a href="#faq" className="text-medium-gray hover:text-primary-green transition-colors">FAQ</a>
              <Button className="bg-primary-green hover:bg-secondary-green text-white w-full">
                Enroll Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );



  // Why Choose Greycampus Section
  const WhyChooseSection = () => (
    <section id="why-choose" className="py-10 sm:py-15 lg:py-20 bg-off-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
            Why Choose Greycampus?
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
            Affordable education meets world-class quality
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: '💰',
              title: 'Most Affordable',
              description: 'High-quality education at ₹5,000'
            },
            {
              icon: '👨‍🏫',
              title: 'Expert Instructors',
              description: '10+ years industry experience. Real-world projects taught'
            },
            {
              icon: '🎯',
              title: '100% Job Focused',
              description: 'Resume building, interview prep, placement support'
            },
            {
              icon: '🕐',
              title: 'Flexible Learning',
              description: 'Self-paced with live sessions. Learn at your speed'
            },
            {
              icon: "🧠",
              title: "Project-Based Learning",
              description: "Gain hands-on experience through real-world projects that help you build a strong, job-ready portfolio."
            },
            {
              icon: '✅',
              title: 'Career Assistance',
              description: '100% assistance until career starts'
            }
          ].map((feature, index) => (
            <div key={index}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-primary-green">
                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-dark-gray mb-3">
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

  // Why Become AI/ML Engineer Section
  const WhyBecomeAIMLEngineerSection = () => (
    <section className="py-10 sm:py-15 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
            Why Become an AI/ML Engineer?
          </h2>
          <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
            Fastest growing field with highest earning potential
          </p>
        </div>

        {/* 4 Stat Cards Row */}
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {[
            {
              number: "₹12L-18L",
              label: "Average Starting Salary",
              description: "Entry-level AI/ML positions"
            },
            {
              number: "90%+",
              label: "Job Placement Rate",
              description: "Within 3 months of completion"
            },
            {
              number: "500+",
              label: "Hiring Partners",
              description: "Fortune 500 companies"
            },
            {
              number: "20",
              label: "Weeks Program",
              description: "Comprehensive curriculum"
            }
          ].map((stat, index) => (
            <div key={index}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-gray hover:border-primary-green">
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="text-3xl lg:text-4xl font-bold text-primary-green mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-medium-gray leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div> */}

        {/* 3 Insight Cards Row */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: "💰",
              title: "Highest Paid Tech Role",
              description: "40% more salary than software engineers. Most valuable tech skill.",
              bg: "bg-green-50",
              borderColor: "border-t-green-500"
            },
           {
              icon: "💼",
              title: "Ample Job Opportunities",
              description: "The demand for AIML professionals is booming — over 22 million openings expected globally by 2026.",
              bg: "bg-amber-50" 
            },
            {
              icon: "🚀",
              title: "Future of Tech",
              description: "AI will define the next decade. Get ahead of the curve.",
              bg: "bg-amber-50",
              borderColor: "border-t-amber-500"
            }
          ].map((insight, index) => (
            <div key={index}>
              <Card className={`${insight.bg} border border-border-gray hover:border-primary-green transition-all duration-300 h-full border-t-4 ${insight.borderColor}`}>
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="text-3xl mb-3">{insight.icon}</div>
                  <h3 className="text-lg font-semibold text-dark-gray mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-sm lg:text-base text-medium-gray leading-relaxed">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Careers After Bootcamp Section
  const CareersAfterBootcampSection = () => {
    const careers = [
      {
        title: "Machine Learning Engineer",
        salary: "₹12L-18L",
        companies: "Google, Meta, Amazon",
        responsibilities: [
          "Build and train ML models",
          "Deploy to production",
          "Optimize performance"
        ],
        skills: ["Python", "TensorFlow", "Deep Learning", "MLOps"]
      },
      {
        title: "AI Engineer",
        salary: "₹13L-20L",
        companies: "OpenAI, DeepMind, Anthropic",
        responsibilities: [
          "Design AI systems",
          "Implement LLMs",
          "Build AI applications"
        ],
        skills: ["Python", "PyTorch", "LLMs", "APIs"]
      },
      {
        title: "Deep Learning Specialist",
        salary: "₹14L-22L",
        companies: "Tesla, NVIDIA, Apple",
        responsibilities: [
          "Develop neural networks",
          "Computer vision models",
          "Advanced ML algorithms"
        ],
        skills: ["Deep Learning", "Computer Vision", "PyTorch", "CUDA"]
      },
      {
        title: "NLP Engineer",
        salary: "₹12L-18L",
        companies: "LinkedIn, Salesforce, Microsoft",
        responsibilities: [
          "Build language models",
          "Text processing systems",
          "Chatbot development"
        ],
        skills: ["NLP", "Transformers", "BERT", "GPT"]
      },
      {
        title: "Computer Vision Engineer",
        salary: "₹12L-18L",
        companies: "Tesla, Waymo, Apple",
        responsibilities: [
          "Image recognition systems",
          "Object detection models",
          "Video analysis"
        ],
        skills: ["OpenCV", "CNNs", "YOLO", "TensorFlow"]
      },
      {
        title: "ML Operations Engineer",
        salary: "₹11L-16L",
        companies: "Netflix, Uber, Airbnb",
        responsibilities: [
          "ML pipeline deployment",
          "Model monitoring",
          "Infrastructure scaling"
        ],
        skills: ["Docker", "Kubernetes", "AWS", "MLOps"]
      },
      {
        title: "AI Research Associate",
        salary: "₹13L-20L",
        companies: "Google Research, Meta AI",
        responsibilities: [
          "Research new AI methods",
          "Publish papers",
          "Prototype solutions"
        ],
        skills: ["Research", "PyTorch", "Statistics", "Publications"]
      },
      {
        title: "Data Scientist (Advanced)",
        salary: "₹12L-18L",
        companies: "Stripe, Palantir, Databricks",
        responsibilities: [
          "Advanced analytics",
          "ML model development",
          "Business insights"
        ],
        skills: ["Python", "ML", "Statistics", "Business"]
      },
      {
        title: "Autonomous Systems Engineer",
        salary: "₹14L-22L",
        companies: "Tesla, Waymo, Cruise",
        responsibilities: [
          "Self-driving algorithms",
          "Robotics systems",
          "Sensor fusion"
        ],
        skills: ["Robotics", "SLAM", "Control Systems", "C++"]
      },
      {
        title: "AI Product Manager",
        salary: "₹13L-20L",
        companies: "Stripe, Figma, Canva",
        responsibilities: [
          "AI product strategy",
          "Feature prioritization",
          "Cross-team coordination"
        ],
        skills: ["Product Management", "AI Strategy", "Leadership", "Business"]
      }
    ];

    return (
      <section id="careers" className="py-10 sm:py-15 lg:py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Career Paths After Bootcamp
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Multiple high-paying roles with rapid growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {careers.map((career, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Salary Badge */}
                    {/* <div className="bg-gradient-to-r from-primary-green to-accent-gold text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block w-fit">
                      {career.salary}
                    </div> */}

                    <h3 className="text-lg lg:text-xl font-bold text-dark-gray mb-2">
                      {career.title}
                    </h3>

                    <p className="text-xs text-medium-gray italic mb-4">
                      {career.companies}
                    </p>

                    <div className="space-y-2 mb-4 flex-grow">
                      {career.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-dark-gray leading-relaxed">{resp}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, idx) => (
                        <span key={idx} className="bg-primary-green text-white text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };



  // Curriculum Section
  // const CurriculumSection = () => {
  //   const modules = [
  //     {
  //       id: 'python1',
  //       title: 'Python for AI Applications – Part I',
  //       duration: '2 weeks',
  //       difficulty: 1,
  //       topics: [
  //         'Advanced Python concepts',
  //         'Functional programming',
  //         'Performance optimization',
  //         'Real-world Python best practices'
  //       ],
  //       outcomes: [
  //         'Master advanced Python',
  //         'Write optimized code',
  //         'Real-world problem solving'
  //       ],
  //       tools: ['Python 3.9+', 'libraries']
  //     },
  //     {
  //       id: 'python2',
  //       title: 'Python for AI Applications – Part II',
  //       duration: '2 weeks',
  //       difficulty: 2,
  //       topics: [
  //         'NumPy mastery',
  //         'Pandas data processing',
  //         'Data manipulation techniques',
  //         'Performance optimization'
  //       ],
  //       outcomes: [
  //         'Data processing expertise',
  //         'NumPy/Pandas mastery',
  //         'Efficient data handling'
  //       ],
  //       tools: ['NumPy', 'Pandas', 'Scikit-learn']
  //     },
  //     {
  //       id: 'eda1',
  //       title: 'Exploratory Data Analysis (EDA) – Part I',
  //       duration: '2 weeks',
  //       difficulty: 2,
  //       topics: [
  //         'Data visualization techniques',
  //         'Statistical analysis methods',
  //         'Pattern recognition',
  //         'Data quality assessment'
  //       ],
  //       outcomes: [
  //         'Comprehensive EDA skills',
  //         'Statistical analysis',
  //         'Data visualization mastery'
  //       ],
  //       tools: ['Matplotlib', 'Seaborn', 'Plotly']
  //     },
  //     {
  //       id: 'eda2',
  //       title: 'Exploratory Data Analysis (EDA) – Part II',
  //       duration: '2 weeks',
  //       difficulty: 3,
  //       topics: [
  //         'Advanced visualization',
  //         'Feature engineering',
  //         'Data preprocessing',
  //         'Statistical modeling'
  //       ],
  //       outcomes: [
  //         'Advanced EDA techniques',
  //         'Feature engineering skills',
  //         'Statistical modeling'
  //       ],
  //       tools: ['Python', 'advanced visualization']
  //     },
  //     {
  //       id: 'ml1',
  //       title: 'Machine Learning – Part I (Supervised)',
  //       duration: '3 weeks',
  //       difficulty: 3,
  //       topics: [
  //         'Regression algorithms',
  //         'Classification methods',
  //         'Model optimization',
  //         'Cross-validation techniques'
  //       ],
  //       outcomes: [
  //         'Supervised learning mastery',
  //         'Model optimization skills',
  //         'Performance evaluation'
  //       ],
  //       tools: ['Scikit-learn', 'LightGBM']
  //     },
  //     {
  //       id: 'ml2',
  //       title: 'Machine Learning – Part II (Unsupervised & Deep Learning)',
  //       duration: '3 weeks',
  //       difficulty: 4,
  //       topics: [
  //         'Clustering algorithms',
  //         'Neural networks fundamentals',
  //         'CNNs and RNNs',
  //         'Deep learning architectures'
  //       ],
  //       outcomes: [
  //         'Unsupervised learning skills',
  //         'Deep learning fundamentals',
  //         'Neural network design'
  //       ],
  //       tools: ['TensorFlow', 'Keras', 'PyTorch']
  //     },
  //     {
  //       id: 'llm',
  //       title: 'Foundational Language Models & Fine-tuning',
  //       duration: '2 weeks',
  //       difficulty: 4,
  //       topics: [
  //         'Transformer architecture',
  //         'BERT and GPT models',
  //         'Fine-tuning techniques',
  //         'Transfer learning'
  //       ],
  //       outcomes: [
  //         'LLM understanding',
  //         'Fine-tuning expertise',
  //         'Transfer learning skills'
  //       ],
  //       tools: ['Hugging Face', 'PyTorch', 'TensorFlow']
  //     },
  //     {
  //       id: 'rag',
  //       title: 'Retrieval Augmented Generation (RAGs)',
  //       duration: '1 week',
  //       difficulty: 4,
  //       topics: [
  //         'Vector databases',
  //         'Semantic search',
  //         'RAG system architecture',
  //         'Embedding techniques'
  //       ],
  //       outcomes: [
  //         'RAG system design',
  //         'Vector database skills',
  //         'Semantic search implementation'
  //       ],
  //       tools: ['LangChain', 'OpenAI APIs', 'Pinecone']
  //     },
  //     {
  //       id: 'agents',
  //       title: 'AI Agents, Deployment & Projects',
  //       duration: '2 weeks',
  //       difficulty: 5,
  //       topics: [
  //         'Autonomous agents design',
  //         'Docker containerization',
  //         'Cloud deployment',
  //         'Production monitoring'
  //       ],
  //       outcomes: [
  //         'AI agent development',
  //         'Production deployment',
  //         'System monitoring'
  //       ],
  //       tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure']
  //     },
  //     {
  //       id: 'capstone',
  //       title: 'Capstone Project – Production AI System',
  //       duration: '1 week',
  //       difficulty: 5,
  //       topics: [
  //         'End-to-end project development',
  //         'Production deployment',
  //         'System monitoring',
  //         'Performance optimization'
  //       ],
  //       outcomes: [
  //         'Complete AI system',
  //         'Production deployment',
  //         'Real-world application'
  //       ],
  //       tools: ['All learned tools']
  //     }
  //   ];

  //   const [activeModule, setActiveModule] = useState('python1');

  //   const getDifficultyStars = (difficulty: number) => {
  //     return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  //   };

  //   return (
  //     <section id="curriculum" className="py-10 sm:py-15 lg:py-20 bg-off-white">
  //       <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  //         <div className="text-center mb-12 lg:mb-16">
  //           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
  //             What You'll Learn
  //           </h2>
  //           <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
  //             20 weeks of cutting-edge AI/ML curriculum
  //           </p>
  //         </div>

  //         <div className="max-w-6xl mx-auto">
  //           {/* Module Tabs */}
  //           <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
  //             {modules.map((module) => (
  //               <button
  //                 key={module.id}
  //                 onClick={() => setActiveModule(module.id)}
  //                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeModule === module.id
  //                     ? 'bg-primary-green text-white shadow-md'
  //                     : 'bg-light-gray text-dark-gray hover:bg-medium-gray hover:text-white'
  //                   }`}
  //               >
  //                 {module.title}
  //               </button>
  //             ))}
  //           </div>

  //           {/* Module Content */}
  //           <div className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden">
  //             {modules.map((module) => (
  //               <div
  //                 key={module.id}
  //                 className={`transition-all duration-500 ${activeModule === module.id ? 'block' : 'hidden'
  //                   }`}
  //               >
  //                 <div className="p-6 lg:p-8">
  //                   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
  //                     <div>
  //                       <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-2">
  //                         {module.title}
  //                       </h3>
  //                       <div className="flex items-center space-x-4">
  //                         <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-semibold">
  //                           {module.duration}
  //                         </span>
  //                         <span className="text-sm text-medium-gray">
  //                           Difficulty: {getDifficultyStars(module.difficulty)} ({module.difficulty}/5)
  //                         </span>
  //                       </div>
  //                     </div>
  //                   </div>

  //                   <div className="grid lg:grid-cols-2 gap-8">
  //                     <div>
  //                       <h4 className="text-lg font-semibold text-dark-gray mb-3">Topics Covered</h4>
  //                       <ul className="space-y-2">
  //                         {module.topics.map((topic, index) => (
  //                           <li key={index} className="flex items-start space-x-2">
  //                             <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
  //                             <span className="text-dark-gray text-sm leading-relaxed">{topic}</span>
  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </div>

  //                     <div>
  //                       <h4 className="text-lg font-semibold text-dark-gray mb-3">Key Outcomes</h4>
  //                       <ul className="space-y-2">
  //                         {module.outcomes.map((outcome, index) => (
  //                           <li key={index} className="flex items-start space-x-2">
  //                             <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0 mt-0.5" />
  //                             <span className="text-dark-gray text-sm leading-relaxed">{outcome}</span>
  //                           </li>
  //                         ))}
  //                       </ul>
  //                     </div>
  //                   </div>

  //                   <div className="mt-6 pt-6 border-t border-border-gray">
  //                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  //                       <div>
  //                         <h4 className="text-lg font-semibold text-dark-gray mb-2">Tools & Technologies</h4>
  //                         <div className="flex flex-wrap gap-2">
  //                           {module.tools.map((tool, index) => (
  //                             <span key={index} className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-medium">
  //                               {tool}
  //                             </span>
  //                           ))}
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // };

  // After Course - You Will Be Able To Section
  const AfterCourseSection = () => {
    const outcomes = [
      {
        icon: '🧠',
        title: 'Build Neural Networks',
        description: 'Design and train deep learning models from scratch',
        color: 'border-t-primary-green'
      },
      {
        icon: '🗣️',
        title: 'Process Language',
        description: 'Work with LLMs, transformers, and NLP applications',
        color: 'border-t-accent-blue'
      },
      {
        icon: '👁️',
        title: 'Computer Vision',
        description: 'Build image recognition and detection systems',
        color: 'border-t-primary-green'
      },
      {
        icon: '🤖',
        title: 'Create AI Agents',
        description: 'Develop autonomous AI systems and agents',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🔍',
        title: 'Feature Engineering',
        description: 'Extract powerful features from raw data',
        color: 'border-t-primary-green'
      },
      {
        icon: '📈',
        title: 'Model Optimization',
        description: 'Tune, evaluate, and improve model performance',
        color: 'border-t-accent-blue'
      },
      {
        icon: '☁️',
        title: 'Deploy Models',
        description: 'Deploy AI models to production at scale',
        color: 'border-t-primary-green'
      },
      {
        icon: '🔌',
        title: 'API Integration',
        description: 'Build APIs and integrate LLMs into applications',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🗄️',
        title: 'Vector Databases',
        description: 'Work with embeddings and semantic search',
        color: 'border-t-primary-green'
      },
      {
        icon: '📊',
        title: 'RAG Systems',
        description: 'Build retrieval-augmented generation systems',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🚀',
        title: 'Production Systems',
        description: 'Design and maintain production ML systems',
        color: 'border-t-primary-green'
      },
      {
        icon: '💼',
        title: 'Lead AI Projects',
        description: 'Drive AI initiatives and innovation',
        color: 'border-t-accent-blue'
      }
    ];

    return (
      <section className="py-10 sm:py-15 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Program Outcomes
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Production-ready AI skills. Real impact. Career transformation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {outcomes.map((outcome, index) => (
              <div key={index}>
                <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 ${outcome.color} border border-border-gray hover:border-primary-green`}>
                  <CardContent className="p-5 h-full flex flex-col">
                    <div className="text-3xl mb-3">{outcome.icon}</div>
                    <h3 className="text-lg font-semibold text-dark-gray mb-3">
                      {outcome.title}
                    </h3>
                    <p className="text-sm text-medium-gray leading-relaxed flex-grow">
                      {outcome.description}
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

  // Projects Section
  const ProjectsSection = () => {
    const projects = [
      {
        title: 'AI-Powered Market Competitor Scanner',
        duration: '4 weeks',
        difficulty: 4,
        description: 'Build CNN model for image classification. Preprocess data, train, evaluate, and deploy model. Create web interface for predictions. Learn production best practices.',
        techStack: ['TensorFlow', 'Keras', 'Python', 'Flask', 'Docker'],
        learnings: [
          'CNN architecture design',
          'Model training and optimization',
          'Production deployment'
        ],
        outcome: 'Deployed model, web app, GitHub repo, 94%+ accuracy',
        gradient: 'from-primary-green to-accent-blue'
      },
      {
        title: 'Smart Prompt Library Builder',
        duration: '3 weeks',
        difficulty: 4,
        description: 'Build RAG system integrating OpenAI APIs. Implement semantic search with vector databases. Deploy intelligent chatbot. Learn LLM integration patterns.',
        techStack: ['LangChain', 'OpenAI', 'FastAPI', 'Pinecone', 'Vector DB'],
        learnings: [
          'RAG architecture',
          'LLM integration',
          'Vector search implementation'
        ],
        outcome: 'Production chatbot, documentation, API, Postman collection',
        gradient: 'from-accent-blue to-primary-green'
      },
      {
        title: 'AI Content Calendar Generator',
        duration: '3 weeks',
        difficulty: 5,
        description: 'Create autonomous AI agent for data analysis. Implement self-improving system with feedback loops. Deploy as production service with monitoring.',
        techStack: ['Python', 'AI agents', 'Cloud platforms', 'MLOps'],
        learnings: [
          'Agent design patterns',
          'Self-optimization systems',
          'Production MLOps'
        ],
        outcome: 'Production AI agent, monitoring setup, CI/CD pipeline',
        gradient: 'from-accent-gold to-primary-green'
      }
    ];

    return (
      <section className="py-10 sm:py-15 lg:py-20 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Build Production AI Systems
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Apply your skills to projects used by real companies
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {projects.map((project, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green overflow-hidden">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${project.gradient} p-6 text-white relative`}>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.duration}
                      </span>
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ⭐{'⭐'.repeat(project.difficulty - 1)}☆{'☆'.repeat(5 - project.difficulty)} ({project.difficulty}/5)
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6 h-fit flex flex-col">
                    <p className="text-dark-gray text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-dark-gray mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, idx) => (
                            <span key={idx} className="bg-primary-green text-white px-2 py-1 rounded text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-dark-gray mb-2">Key Learnings</h4>
                        <ul className="space-y-1">
                          {project.learnings.map((learning, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1 h-1 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-xs text-dark-gray leading-relaxed">{learning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-border-gray">
                        <h4 className="text-sm font-bold text-primary-green mb-1">Outcome</h4>
                        <p className="text-xs text-dark-gray leading-relaxed">
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // How Do I Enroll Section
  const HowDoIEnrollSection = () => {
    const steps = [
      {
        number: 1,
        icon: '✍️',
        title: 'Sign Up',
        description: 'Submit details. Takes 30 seconds.'
      },
      {
        number: 2,
        icon: '📥',
        title: 'Get AI Guide',
        description: 'Receive personalized guide via email'
      },
      {
        number: 3,
        icon: '📞',
        title: 'Strategy Call',
        description: 'Optional personalized consultation'
      },
      {
        number: 4,
        icon: '🎓',
        title: 'Choose Plan',
        description: 'Select learning path and pay'
      },
      {
        number: 5,
        icon: '🚀',
        title: 'Launch Career',
        description: 'Start learning immediately'
      }
    ];

    return (
      <section className="py-10 sm:py-15 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              How Do I Enroll?
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Simple 5-step process to launch your AI career
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <Card className="w-48 h-fit hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border-gray">
                    <CardContent className="p-5 h-full flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                        {step.number}
                      </div>
                      <div className="text-2xl mb-3">{step.icon}</div>
                      <h3 className="text-base font-bold text-dark-gray mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-medium-gray leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Connector Line */}
                  {/* {index < steps.length - 1 && (
                    <div className="absolute top-8 left-full w-12 h-0.5 bg-primary-green transform translate-x-6 z-0">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary-green border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1"></div>
                    </div>
                  )} */}
                </div>
              ))}
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4 relative">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  <Card className="flex-1 hover:shadow-lg transition-all duration-300 border border-border-gray">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{step.icon}</div>
                        <div>
                          <h3 className="text-base font-bold text-dark-gray mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-medium-gray leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vertical Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-6 bg-primary-green transform translate-y-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Pricing & Enrollment Section
  const PricingEnrollmentSection = () => {
    const cohorts = [
      {
        startDate: "31 October 2025",
        status: "Open",
        color: "bg-primary-green",
        spots: "Available: 15/20"
      },
      // { 
      //   startDate: "Mar 1, 2025", 
      //   status: "Limited", 
      //   color: "bg-accent-gold", 
      //   spots: "Available: 3/20" 
      // },
      // { 
      //   startDate: "Apr 1, 2025", 
      //   status: "Closed", 
      //   color: "bg-gray-500", 
      //   spots: "Fully Booked" 
      // }
    ];

    return (
      <section id="pricing" className="py-10 sm:py-15 lg:py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Invest in Your AI Future at Affordable Prices
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Most cost-effective AI bootcamp without compromising quality
            </p>
          </div>

          {/* Main Pricing Card */}
          <div className="mx-auto mb-12 lg:mb-16">
            <Card className="bg-white shadow-lg border-0 relative overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-6 lg:mb-8 text-center">
                  AI/ML Bootcamp
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-8">
                  {[
                    "3 months of cutting-edge curriculum",
                    "10 modules covering all aspects of AI/ML",
                    "3 capstone projects with real complexity",
                    "Mentorship from industry experts",
                    "Production deployment training",
                    "Resume and portfolio optimization",
                    "Interview preparation (10 sessions)",
                    "Job Assistance",
                    "Certificate of completion",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0 mt-0.5" />
                      <span className="text-dark-gray text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-red-500 line-through text-lg">
                      ₹15,000
                    </span>
                    <span className="text-red-500 line-through text-lg">
                      + GST
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className="text-4xl lg:text-5xl font-bold text-primary-green">
                      ₹5,000
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-primary-green">
                      + GST
                    </span>
                  </div>
              
                </div>

                <div className="space-y-3">
                  <Link href={'/course-checkout/aiml-bootcamp'}>
                    <Button className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 text-lg font-semibold h-12">
                      Enroll Now
                    </Button>
                  </Link>
                  {/* <Button variant="outline" className="w-full border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white py-3 text-lg font-semibold h-12">
                    Enquire Now
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cohort Dates */}
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-2 lg:mb-4">
              Upcoming Cohorts
            </h3>
            <p className="text-medium-gray leading-relaxed">
              Choose a cohort that fits your timeline
            </p>
          </div>

          <div className="flex justify-center max-w-5xl mx-auto">
            {cohorts.map((cohort, index) => (
              <Card key={index} className={`${cohort.color} text-white border-0 hover:shadow-lg transition-all duration-300 h-full`}>
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="bg-white text-primary-green px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
                    {cohort.status}
                  </div>
                  <div className="text-lg font-bold mb-2">
                    Start: {cohort.startDate}
                  </div>
                  <div className="text-sm mb-2">
                    20 weeks
                  </div>
                  <div className="text-xs opacity-90 leading-relaxed">
                    {cohort.spots}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Testimonials Section
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'Rohan Sharma',
        role: 'ML Engineer at Google',
        achievement: '₹8L → ₹16L (+100%)',
        quote: 'This bootcamp gave me production-ready skills. Within 2 months, I had 3 job offers. Chose Google. Best investment ever!',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Divya Malhotra',
        role: 'AI Engineer at Meta',
        achievement: 'Career switch in 3 months',
        quote: 'Coming from backend development, I was skeptical. The curriculum was comprehensive and practical. Got placed at Meta within a week of finishing.',
        rating: 5,
        avatar: '👩‍💻'
      },
      {
        name: 'Aditya Gupta',
        role: 'Deep Learning Specialist at OpenAI',
        achievement: 'From backend to AI in 4 months',
        quote: 'The deep learning modules were incredible. Built real projects that impressed OpenAI. Now working on cutting-edge AI models.',
        rating: 5,
        avatar: '👨‍🔬'
      },
      {
        name: 'Priya Verma',
        role: 'NLP Engineer at LinkedIn',
        achievement: 'First AI role after bootcamp',
        quote: 'The NLP section was game-changing. Got placed at LinkedIn right after completion. Couldn\'t ask for a better bootcamp experience.',
        rating: 5,
        avatar: '👩‍📊'
      },
      {
        name: 'Nikhil Patel',
        role: 'AI Product Manager at Stripe',
        achievement: 'Transitioned from product to AI product',
        quote: 'The production deployment and MLOps sections were invaluable. Now leading AI initiatives at Stripe. Highest paid I\'ve ever been.',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Isha Nair',
        role: 'Computer Vision Engineer at Tesla',
        achievement: '₹10L → ₹18L salary jump',
        quote: 'The computer vision projects were phenomenal. Real-world datasets and mentorship made all the difference. Got hired at Tesla!',
        rating: 5,
        avatar: '👩‍💻'
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
      <section className="py-10 sm:py-15 lg:py-20 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              Success Stories
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              Real engineers, real AI projects, real careers
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden">
                {/* Green Header Bar */}
                <div className="h-10 bg-primary-green"></div>

                <div className="p-6 lg:p-8">
                  {/* Avatar */}
                  {/* <div className="flex justify-center -mt-8 mb-6">
                    <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-green flex items-center justify-center text-2xl">
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-primary-green' : 'bg-light-gray'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // FAQ Section
  const FAQSection = () => {
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
          answer: 'Yes! Many students work full-time while studying part-time. The flexible schedule, self-paced modules, and optional live sessions make it manageable.'
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

  // Footer Section
  const FooterSection = () => {
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Newsletter subscription:', newsletterEmail);
      setNewsletterEmail('');
      // Show success message
    };

    return (
      <footer className="bg-dark-gray text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="py-12 lg:py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Column 1: About Greycampus */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GC</span>
                  </div>
                  <span className="text-xl font-bold">Greycampus</span>
                </div>
                <p className="text-sm text-light-gray leading-relaxed">
                  Affordable, high-quality bootcamps for career transformation
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-light-gray hover:text-primary-green transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-light-gray hover:text-primary-green transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-light-gray hover:text-primary-green transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-light-gray hover:text-primary-green transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-sm text-light-gray hover:text-primary-green transition-colors">Data Science Bootcamp</a></li>
                  <li><a href="/data-analyst-bootcamp" className="text-sm text-light-gray hover:text-primary-green transition-colors">Data Analyst Bootcamp</a></li>
                  <li><a href="#curriculum" className="text-sm text-light-gray hover:text-primary-green transition-colors">Curriculum</a></li>
                  <li><a href="#careers" className="text-sm text-light-gray hover:text-primary-green transition-colors">Careers</a></li>
                  <li><a href="#faq" className="text-sm text-light-gray hover:text-primary-green transition-colors">FAQ</a></li>
                  <li><a href="#pricing" className="text-sm text-light-gray hover:text-primary-green transition-colors">Pricing</a></li>
                </ul>
              </div>

              {/* Column 3: Resources */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-light-gray hover:text-primary-green transition-colors">Blog</a></li>
                  <li><a href="#" className="text-sm text-light-gray hover:text-primary-green transition-colors">Career Guide</a></li>
                  <li><a href="#" className="text-sm text-light-gray hover:text-primary-green transition-colors">Student Success Stories</a></li>
                  <li><a href="#" className="text-sm text-light-gray hover:text-primary-green transition-colors">Tech Blog</a></li>
                  <li><a href="#" className="text-sm text-light-gray hover:text-primary-green transition-colors">Community</a></li>
                </ul>
              </div>

              {/* Column 4: Newsletter */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">Stay Updated</h3>
                <p className="text-xs text-light-gray leading-relaxed">
                  Subscribe for course updates and career tips
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="h-10 bg-white/10 border-white/20 text-white placeholder:text-light-gray focus:border-primary-green"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary-green hover:bg-secondary-green text-white h-10 text-sm"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <p className="text-xs text-light-gray">
                © 2025 Greycampus. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-xs text-light-gray hover:text-primary-green transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs text-light-gray hover:text-primary-green transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <WhyChooseSection />
        <WhyBecomeAIMLEngineerSection />
        <CareersAfterBootcampSection />
        {/* <HiringOrganizationsSection /> */}
        <HiringOrganizationSection />
        {/* <CurriculumSection /> */}
        <AImlCurriculumSection/>
        <AfterCourseSection />
        <ProjectsSection />
        <HowDoIEnrollSection />
        <PricingEnrollmentSection />
        <EnrollmentFormSection />
        <TestimonialsSection />
        {/* <FAQSection /> */}
        <AimlFaqs/>
      </main>
      <Footer />
    </div>
  );
}
