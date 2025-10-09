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


import DaHeroSection from '@/components/data-analyst-bootcamp-page/DaHeroSection';
import DaEnrollmentFormSection from '@/components/data-analyst-bootcamp-page/DaEnrollmentFormSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
// Form state management
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experienceLevel: string;
  currentBackground: string;
  preferredLearning: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function DataAnalystBootcampPage() {
  // Form states
  const [heroFormData, setHeroFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
    currentBackground: '',
    preferredLearning: ''
  });

  const [enrollmentFormData, setEnrollmentFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: '',
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
          setHeroFormData({ fullName: '', email: '', phone: '', experienceLevel: '', currentBackground: '', preferredLearning: '' });
        } else {
          setEnrollmentFormData({ fullName: '', email: '', phone: '', experienceLevel: '', currentBackground: '', preferredLearning: '' });
        }
      }, 2000);
    }, 1000);
  };



  // Why Choose Greycampus Section
  const WhyChooseSection = () => (
    <section id="why-choose" className="py-16 sm:py-20 lg:py-24 bg-off-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
            Why Choose Greycampus?
          </h2>
          <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
            Affordable education meets world-class quality
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: '💰',
              title: 'Most Affordable',
              description: 'High-quality education at 1/3 the market price'
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
              icon: '♾️',
              title: 'Lifetime Access',
              description: 'Access all course materials forever. Never expires'
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

  // Why Become a Data Analyst Section
  const WhyBecomeDataAnalystSection = () => (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
            Why Become a Data Analyst?
          </h2>
          <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
            Market demand, career growth, and earning potential
          </p>
        </div>
        
        {/* 4 Stat Cards Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {[
            {
              number: "₹6L-8L",
              label: "Average Starting Salary",
              description: "Entry-level data analyst positions"
            },
            {
              number: "95%",
              label: "Job Placement Rate",
              description: "Within 3 months of completion"
            },
            {
              number: "500+",
              label: "Hiring Partners",
              description: "Fortune 500 companies"
            },
            {
              number: "16",
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
        </div>
        
        {/* 3 Insight Cards Row */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: "📈",
              title: "High Demand, Higher Pay",
              description: "More job openings than qualified candidates. Companies competing for talent.",
              bg: "bg-green-50",
              borderColor: "border-t-green-500"
            },
            {
              icon: "🏠",
              title: "Remote Opportunities",
              description: "80% of data analyst roles offer remote or hybrid work arrangements.",
              bg: "bg-blue-50",
              borderColor: "border-t-blue-500"
            },
            {
              icon: "🚀",
              title: "Clear Career Growth",
              description: "Progress from Analyst → Senior Analyst → Analytics Manager → Director",
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
        title: "Data Analyst",
        salary: "₹6L-8L",
        companies: "Google, Amazon, Microsoft",
        responsibilities: [
          "Extract and analyze datasets",
          "Create dashboards and reports",
          "Present insights to stakeholders"
        ],
        skills: ["SQL", "Excel", "Power BI", "Statistics"]
      },
      {
        title: "Business Analyst",
        salary: "₹7L-9L",
        companies: "McKinsey, Deloitte, Accenture",
        responsibilities: [
          "Analyze business processes",
          "Create financial models",
          "Present strategic recommendations"
        ],
        skills: ["Analytics", "BI", "SQL", "Excel"]
      },
      {
        title: "Analytics Engineer",
        salary: "₹8L-11L",
        companies: "Stripe, Airbnb, Netflix",
        responsibilities: [
          "Build data pipelines",
          "Optimize data infrastructure",
          "Enable self-service analytics"
        ],
        skills: ["Pipelines", "SQL", "Python", "ETL"]
      },
      {
        title: "BI Developer",
        salary: "₹7L-10L",
        companies: "Salesforce, Adobe, Intel",
        responsibilities: [
          "Design interactive dashboards",
          "Create data models",
          "Optimize report performance"
        ],
        skills: ["Power BI", "Tableau", "Dashboards", "DAX"]
      },
      {
        title: "Financial Analyst",
        salary: "₹6L-9L",
        companies: "Goldman Sachs, JPMorgan, PayPal",
        responsibilities: [
          "Analyze financial data",
          "Create forecasting models",
          "Support investment decisions"
        ],
        skills: ["Excel", "SQL", "Finance metrics", "VBA"]
      },
      {
        title: "Marketing Analyst",
        salary: "₹6L-8L",
        companies: "Meta, Google, Shopify",
        responsibilities: [
          "Analyze customer behavior",
          "Track campaign performance",
          "Optimize marketing ROI"
        ],
        skills: ["Customer analysis", "Python", "Google Analytics", "A/B Testing"]
      },
      {
        title: "Operations Analyst",
        salary: "₹6L-8L",
        companies: "Uber, Amazon, Walmart",
        responsibilities: [
          "Optimize business processes",
          "Analyze operational metrics",
          "Improve efficiency"
        ],
        skills: ["Process optimization", "SQL", "Excel", "Lean Six Sigma"]
      },
      {
        title: "Data Strategist",
        salary: "₹9L-12L",
        companies: "Apple, Tesla, OpenAI",
        responsibilities: [
          "Develop data strategies",
          "Drive business insights",
          "Lead analytics initiatives"
        ],
        skills: ["Business strategy", "Insights", "Leadership", "Python"]
      }
    ];

    return (
      <section id="careers" className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Careers After Bootcamp
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              Multiple paths with competitive salaries and growth opportunities
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {careers.map((career, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Salary Badge */}
                    <div className="bg-gradient-to-r from-primary-green to-accent-gold text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block w-fit">
                      {career.salary}
                    </div>
                    
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

  // Hiring Organizations Section
  const HiringOrganizationsSection = () => {
    const companies = [
      "Google", "Amazon", "Microsoft", "Meta", "Apple", "IBM",
      "Salesforce", "LinkedIn", "Deloitte", "Accenture", "Goldman Sachs", 
      "JPMorgan Chase", "McKinsey", "PayPal", "Shopify", "Adobe", 
      "Intel", "Uber", "Airbnb", "Netflix", "Slack", "Stripe", 
      "Databricks", "HubSpot", "Palantir"
    ];

    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              Our graduates work at Fortune 500 companies and innovative startups
            </p>
          </div>
          
          <div className="overflow-hidden">
            <div className="flex space-x-6 lg:space-x-8 animate-scroll">
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-16 lg:w-40 lg:h-20 bg-off-white rounded-lg flex items-center justify-center border border-border-gray">
                  <span className="text-sm lg:text-base font-semibold text-dark-gray">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Curriculum Section
  const CurriculumSection = () => {
    const modules = [
      {
        id: 'statistics',
        title: 'Applied Statistics for Data Science',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Descriptive and inferential statistics',
          'Probability distributions',
          'Hypothesis testing for business decisions',
          'Statistical inference and confidence intervals'
        ],
        outcomes: [
          'Understand statistical fundamentals',
          'Perform statistical analysis',
          'Interpret results for business insights'
        ],
        tools: ['Python', 'SciPy', 'Statsmodels']
      },
      {
        id: 'sql',
        title: 'Advanced SQL for Data Analysis',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Complex queries and window functions',
          'Query optimization',
          'Real databases and performance tuning',
          'Analytics SQL patterns'
        ],
        outcomes: [
          'Write optimized queries',
          'Performance tuning',
          'Analytics SQL expertise'
        ],
        tools: ['MySQL', 'PostgreSQL']
      },
      {
        id: 'powerbi1',
        title: 'Power BI – Data Integration & Power Query',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Data import and ETL processes',
          'Power Query transformations',
          'Data modeling basics',
          'Data pipeline creation'
        ],
        outcomes: [
          'Transform and model data',
          'Create data pipelines',
          'Power Query mastery'
        ],
        tools: ['Power BI', 'Excel', 'Power Query']
      },
      {
        id: 'powerbi2',
        title: 'Power BI – Modeling, DAX & Visual Analytics',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'DAX formulas and measures',
          'Dashboard design principles',
          'BI concepts and best practices',
          'Advanced visualizations'
        ],
        outcomes: [
          'Create advanced dashboards',
          'DAX expertise',
          'BI thinking and design'
        ],
        tools: ['Power BI', 'DAX']
      },
      {
        id: 'eda',
        title: 'Exploratory Data Analysis (EDA) Techniques',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Data visualization techniques',
          'Pattern recognition methods',
          'Insight extraction strategies',
          'Professional visualization standards'
        ],
        outcomes: [
          'Find patterns in data',
          'Create professional visualizations',
          'Extract actionable insights'
        ],
        tools: ['Python', 'Matplotlib', 'Seaborn', 'Plotly']
      },
      {
        id: 'python',
        title: 'Python for Data Analysis',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Pandas mastery for data manipulation',
          'NumPy operations and arrays',
          'Data cleaning and preprocessing',
          'Python data analysis workflows'
        ],
        outcomes: [
          'Data manipulation expertise',
          'Preprocessing mastery',
          'Python analytics proficiency'
        ],
        tools: ['Python', 'Pandas', 'NumPy']
      },
      {
        id: 'ml',
        title: 'Machine Learning & Feature Engineering',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'Predictive analytics fundamentals',
          'Feature selection techniques',
          'Model evaluation methods',
          'Business outcome prediction'
        ],
        outcomes: [
          'Build ML models',
          'Predict business outcomes',
          'Feature engineering expertise'
        ],
        tools: ['Scikit-learn', 'Python', 'ML libraries']
      },
      {
        id: 'genai',
        title: 'Generative AI Applications',
        duration: '1 week',
        difficulty: 2,
        topics: [
          'LLMs for analytics workflows',
          'AI-powered insights generation',
          'Prompt engineering for data analysis',
          'ChatGPT for analytics tasks'
        ],
        outcomes: [
          'Leverage AI for productivity',
          'ChatGPT for analytics',
          'AI integration in workflows'
        ],
        tools: ['OpenAI APIs', 'ChatGPT', 'LLMs']
      },
      {
        id: 'capstone',
        title: 'Capstone Project – End-to-End Data Solution',
        duration: '1 week',
        difficulty: 4,
        topics: [
          'Real-world analysis projects',
          'Presentation and communication',
          'Portfolio building',
          'Job-ready skills demonstration'
        ],
        outcomes: [
          'Portfolio-ready project',
          'Job-ready skills',
          'End-to-end solution delivery'
        ],
        tools: ['All learned tools', 'Presentation skills']
      }
    ];

    const [activeModule, setActiveModule] = useState('statistics');

    const getDifficultyStars = (difficulty: number) => {
      return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
    };

    return (
      <section id="curriculum" className="py-16 sm:py-20 lg:py-24 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              What You'll Learn
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              16 weeks of comprehensive, business-focused curriculum
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Module Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeModule === module.id
                      ? 'bg-primary-green text-white shadow-md'
                      : 'bg-light-gray text-dark-gray hover:bg-medium-gray hover:text-white'
                  }`}
                >
                  {module.title}
                </button>
              ))}
            </div>
            
            {/* Module Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`transition-all duration-500 ${
                    activeModule === module.id ? 'block' : 'hidden'
                  }`}
                >
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-2">
                          {module.title}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {module.duration}
                          </span>
                          <span className="text-sm text-medium-gray">
                            Difficulty: {getDifficultyStars(module.difficulty)} ({module.difficulty}/5)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-dark-gray mb-3">Topics Covered</h4>
                        <ul className="space-y-2">
                          {module.topics.map((topic, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-dark-gray text-sm leading-relaxed">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-dark-gray mb-3">Key Outcomes</h4>
                        <ul className="space-y-2">
                          {module.outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-primary-green flex-shrink-0 mt-0.5" />
                              <span className="text-dark-gray text-sm leading-relaxed">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border-gray">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-dark-gray mb-2">Tools & Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {module.tools.map((tool, index) => (
                              <span key={index} className="bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // After Course Section
  const AfterCourseSection = () => {
    const outcomes = [
      {
        icon: '🗄️',
        title: 'Extract & Analyze Data',
        description: 'Write complex SQL queries and extract insights from large datasets',
        color: 'border-t-primary-green'
      },
      {
        icon: '📊',
        title: 'Create Dashboards',
        description: 'Design interactive Power BI dashboards for business teams',
        color: 'border-t-accent-blue'
      },
      {
        icon: '📈',
        title: 'Data Visualization',
        description: 'Create compelling visualizations that communicate insights',
        color: 'border-t-primary-green'
      },
      {
        icon: '💾',
        title: 'Database Management',
        description: 'Design and optimize databases for analytics',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🐍',
        title: 'Python Analytics',
        description: 'Use Python for data analysis and automation',
        color: 'border-t-primary-green'
      },
      {
        icon: '📑',
        title: 'Statistical Analysis',
        description: 'Apply statistical methods to solve business problems',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🤖',
        title: 'AI Integration',
        description: 'Leverage ChatGPT and AI tools for analytics',
        color: 'border-t-primary-green'
      },
      {
        icon: '💬',
        title: 'Business Communication',
        description: 'Present data insights clearly to non-technical stakeholders',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🎯',
        title: 'Problem Solving',
        description: 'Solve complex business problems with data',
        color: 'border-t-primary-green'
      },
      {
        icon: '🚀',
        title: 'Career Ready',
        description: 'Build portfolio and interview skills for data jobs',
        color: 'border-t-accent-blue'
      }
    ];

    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              You'll Be Able To
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              Real skills. Immediate impact. Career transformation.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
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
        title: 'Sales Analytics Dashboard',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Analyze sales data from multiple sources. Create Power BI dashboard for business teams. Extract insights on sales trends, customer behavior, regional performance.',
        techStack: ['SQL', 'Power BI', 'Python', 'Pandas'],
        learnings: [
          'Data pipeline creation',
          'Dashboard design',
          'Business insights extraction'
        ],
        outcome: 'Interactive dashboard, insights report, ₹100K+ impact analysis',
        gradient: 'from-primary-green to-accent-blue'
      },
      {
        title: 'Customer Segmentation Analysis',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Segment customers based on behavior patterns. Use Python for statistical analysis. Create business recommendations for targeted marketing and customer retention.',
        techStack: ['Python', 'Pandas', 'Scikit-learn', 'SQL'],
        learnings: [
          'Customer analytics',
          'Statistical segmentation',
          'Business recommendations'
        ],
        outcome: 'Segmentation model, 5 customer segments, marketing recommendations',
        gradient: 'from-accent-blue to-primary-green'
      },
      {
        title: 'Marketing Performance Analytics',
        duration: '2 weeks',
        difficulty: 2,
        description: 'Analyze marketing campaign performance. Create dashboards for marketing team. Track ROI, conversion rates, and customer acquisition costs in real-time.',
        techStack: ['Excel', 'SQL', 'Power BI', 'Python'],
        learnings: [
          'Marketing metrics',
          'Campaign analysis',
          'ROI tracking'
        ],
        outcome: 'Performance dashboard, metrics report, ROI optimization insights',
        gradient: 'from-accent-gold to-primary-green'
      }
    ];

    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Build Real-World Projects
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
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
        description: 'Fill out registration. Takes 30 seconds.'
      },
      {
        number: 2,
        icon: '📥',
        title: 'Get Career Guide',
        description: 'Receive personalized guide via email'
      },
      {
        number: 3,
        icon: '📞',
        title: 'Free Consultation',
        description: 'Optional 15-minute call with counselor'
      },
      {
        number: 4,
        icon: '🎓',
        title: 'Enroll & Start',
        description: 'Choose plan, pay, get instant access'
      },
      {
        number: 5,
        icon: '🚀',
        title: 'Learn & Succeed',
        description: 'Start learning, build projects, get hired'
      }
    ];

    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              How Do I Enroll?
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              Simple 5-step process to start your data analyst career
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
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-full w-12 h-0.5 bg-primary-green transform translate-x-6 z-0">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary-green border-t-2 border-t-transparent border-b-2 border-b-transparent transform translate-x-1"></div>
                    </div>
                  )}
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
        startDate: "Jan 15, 2025", 
        status: "Open", 
        color: "bg-primary-green", 
        spots: "Available: 20/25" 
      },
      { 
        startDate: "Feb 12, 2025", 
        status: "Limited", 
        color: "bg-accent-gold", 
        spots: "Available: 3/25" 
      },
      { 
        startDate: "Mar 10, 2025", 
        status: "Closed", 
        color: "bg-gray-500", 
        spots: "Fully Booked" 
      }
    ];

    return (
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Invest in Your Future at Affordable Prices
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              Most cost-effective bootcamp without compromising quality
            </p>
          </div>
          
          {/* Main Pricing Card */}
          <div className="mx-auto mb-12 lg:mb-16">
            <Card className="bg-white shadow-lg border-0 relative overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-6 lg:mb-8 text-center">
                  Data Analyst Bootcamp
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-8">
                  {[
                    "16 weeks of comprehensive curriculum",
                    "9 modules covering all aspects",
                    "3 capstone projects",
                    "Lifetime access to materials",
                    "1:1 mentorship sessions",
                    "Resume and portfolio guidance",
                    "Interview preparation",
                    "30-day money-back guarantee",
                    "Certificate of completion",
                    "Lifetime career support"
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
                      ₹7,500
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
                  <p className="text-sm text-medium-gray italic">
                    Valid till March 31, 2025
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 text-lg font-semibold h-12">
                    Enroll Now
                  </Button>
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
              Choose a cohort date that works for you
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
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
                    16 weeks
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

  // Enrollment Form Section
  const EnrollmentFormSection = () => {
    const taglines = [
      {
        icon: '💼',
        text: 'Industry-ready skills at affordable prices'
      },
      {
        icon: '👨‍💼',
        text: 'Learn from experienced data professionals'
      },
      {
        icon: '📁',
        text: 'Build real project portfolio'
      },
      {
        icon: '💰',
        text: '95% placement at ₹6L-9L range'
      },
      {
        icon: '♾️',
        text: 'Lifetime support and career guidance'
      }
    ];

    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-6 lg:mb-8">
                Your Data Analyst Career Starts Here
              </h2>
              
              <div className="space-y-4 lg:space-y-6">
                {taglines.map((tagline, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl flex-shrink-0">{tagline.icon}</div>
                    <p className="text-lg text-dark-gray leading-relaxed">
                      {tagline.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Form */}
            <div className="mt-8 lg:mt-0">
              <Card className="bg-white shadow-lg border-0 w-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-dark-gray text-center">
                    Start Your Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6">
                  <div className="space-y-2">
                    <Label htmlFor="enrollment-fullName" className="text-sm font-medium text-dark-gray">Full Name</Label>
                    <Input
                      id="enrollment-fullName"
                      type="text"
                      placeholder="Your full name"
                      value={enrollmentFormData.fullName}
                      onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, fullName: e.target.value })}
                      className={`h-11 ${formErrors.fullName ? 'border-red-500' : ''}`}
                    />
                    {formErrors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enrollment-email" className="text-sm font-medium text-dark-gray">Email Address</Label>
                    <Input
                      id="enrollment-email"
                      type="email"
                      placeholder="you@example.com"
                      value={enrollmentFormData.email}
                      onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, email: e.target.value })}
                      className={`h-11 ${formErrors.email ? 'border-red-500' : ''}`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enrollment-phone" className="text-sm font-medium text-dark-gray">Phone Number</Label>
                    <Input
                      id="enrollment-phone"
                      type="tel"
                      placeholder="+91 XXXXXXXXXX"
                      value={enrollmentFormData.phone}
                      onChange={(e) => setEnrollmentFormData({ ...enrollmentFormData, phone: e.target.value })}
                      className={`h-11 ${formErrors.phone ? 'border-red-500' : ''}`}
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enrollment-background" className="text-sm font-medium text-dark-gray">Current Background</Label>
                    <Select
                      value={enrollmentFormData.currentBackground}
                      onValueChange={(value) => setEnrollmentFormData({ ...enrollmentFormData, currentBackground: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your background" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="working-professional">Working Professional</SelectItem>
                        <SelectItem value="career-changer">Career Changer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="enrollment-learning" className="text-sm font-medium text-dark-gray">Preferred Learning Style</Label>
                    <Select
                      value={enrollmentFormData.preferredLearning}
                      onValueChange={(value) => setEnrollmentFormData({ ...enrollmentFormData, preferredLearning: value })}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self-paced">Self-paced</SelectItem>
                        <SelectItem value="live-sessions">Live Sessions</SelectItem>
                        <SelectItem value="mix">Mix of Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button
                    onClick={() => handleFormSubmit(enrollmentFormData, 'enrollment')}
                    disabled={isSubmitting}
                    className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 h-12 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : "Let's Get Started"}
                  </Button>
                  
                  {submitSuccess && (
                    <div className="text-center text-green-600 font-medium text-sm">
                      ✓ Welcome aboard! Check your email.
                    </div>
                  )}
                  
                  <p className="text-xs text-medium-gray text-center leading-relaxed">
                    I agree to receive course updates and career tips
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Testimonials Section
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'Priya Sharma',
        role: 'Data Analyst at Microsoft',
        achievement: '₹3L → ₹7L (+133%)',
        quote: 'This bootcamp transformed my career. From support role to Data Analyst in 2 months. Excellent mentorship and practical projects.',
        rating: 5,
        avatar: '👩‍💼'
      },
      {
        name: 'Rahul Verma',
        role: 'BI Developer at Amazon',
        achievement: 'First tech role secured',
        quote: 'Coming from non-tech background, I was nervous. The instructors made everything clear. Got placed at Amazon within 3 weeks of completion.',
        rating: 5,
        avatar: '👨‍💻'
      },
      {
        name: 'Anjali Patel',
        role: 'Marketing Analyst at Google',
        achievement: 'Career switch in 4 weeks',
        quote: 'The power BI and Python modules were fantastic. Real-world projects helped me demonstrate skills in interviews. Best investment I made!',
        rating: 5,
        avatar: '👩‍📊'
      },
      {
        name: 'Vikram Kumar',
        role: 'Financial Analyst at JPMorgan Chase',
        achievement: 'SQL expertise led to promotion',
        quote: 'The SQL module alone was worth the entire bootcamp cost. Advanced my career significantly. Highly recommended for finance professionals.',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Neha Singh',
        role: 'Business Analyst at Deloitte',
        achievement: 'From HR to analytics in 6 weeks',
        quote: 'Flexible schedule allowed me to learn while working. Great mentorship and job support. My salary doubled after placement.',
        rating: 5,
        avatar: '👩‍💻'
      },
      {
        name: 'Arjun Nair',
        role: 'Analytics Engineer at Stripe',
        achievement: 'Python mastery led to technical growth',
        quote: 'The combination of SQL, Python, and BI tools made me a complete data professional. Got multiple offers and chose Stripe.',
        rating: 5,
        avatar: '👨‍🔬'
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
      <section className="py-16 sm:py-20 lg:py-24 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Success Stories
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
              Real students, real transformations, real careers
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
                  <div className="flex justify-center -mt-8 mb-6">
                    <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-green flex items-center justify-center text-2xl">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                  </div>
                  
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
                    <p className="text-sm font-bold text-primary-green mt-1">
                      {testimonials[currentTestimonial].achievement}
                    </p>
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

  // FAQ Section
  const FAQSection = () => {
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
          answer: 'The standard program is 16 weeks (4 months). However, we offer flexible schedules: intensive (12 weeks) or part-time (20 weeks).'
        },
        {
          question: 'How many hours per week do I need to dedicate?',
          answer: 'Full-time: 20-25 hours per week. Part-time: 10-15 hours weekly. This includes lectures, projects, and self-study.'
        },
        {
          question: 'Can I study while working full-time?',
          answer: 'Yes! Many of our students work full-time. Our flexible schedule and self-paced model make it possible to balance both.'
        },
        {
          question: 'Is there a money-back guarantee?',
          answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied, we\'ll refund 100% of your fees, no questions asked.'
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
      <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray mx-auto leading-relaxed">
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

  return (
    <div className="min-h-screen">
      {/* <NavigationHeader /> */}
      <Navigation/>
      <main className="pt-16">
        {/* Hero Section */}
        <DaHeroSection />
        {/* Why Choose Greycampus Section */}
        <WhyChooseSection />
        {/* Why Become a Data Analyst Section */}
        <WhyBecomeDataAnalystSection />
        {/* Careers After Bootcamp Section */}
        <CareersAfterBootcampSection />
        {/* Hiring Organizations Section */}
        <HiringOrganizationsSection />
        {/* Curriculum Section */}
        <CurriculumSection />
        {/* After Course Section */}
        <AfterCourseSection />
        {/* Projects Section */}
        <ProjectsSection />
        {/* How Do I Enroll Section */}
        <HowDoIEnrollSection />
        {/* Pricing & Enrollment Section */}
        <PricingEnrollmentSection />
        {/* Enrollment Form Section */}
       <DaEnrollmentFormSection/>
        {/* Testimonials Section */}
        <TestimonialsSection />
        {/* FAQ Section */}
        <FAQSection />
      </main>
      <Footer/>
    </div>
  );
}
