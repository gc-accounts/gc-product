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
  ChevronRight
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DsHeroSection from '@/components/data-science-bootcamp-page/DsHeroSection';
import DsEnrollmentFormSection from '@/components/data-science-bootcamp-page/DsEnrollmentFormSection';

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

export default function HomePage() {
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




  // Why Choose Greycampus Section - IMPROVED ALIGNMENT
  const WhyChooseSection = () => (
    <section id="why-choose" className="py-16 sm:py-20 lg:py-24 bg-off-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
            Why Choose Greycampus?
          </h2>
          <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
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

  // Why Learn Data Science Section - IMPROVED ALIGNMENT
  const WhyLearnSection = () => (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
            Why Learn Data Science?
          </h2>
          <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
            Market demand, growth potential, and career opportunities
          </p>
        </div>
  
        
        {/* Insights Row */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              icon: "📈",
              title: "High Demand, Higher Pay",
              description: "3x more job openings than available candidates. Companies competing for talent.",
              bg: "bg-green-50"
            },
            {
              icon: "🤖",
              title: "Future-Proof Career",
              description: "AI and ML driving business decisions across all industries. Secure your future.",
              bg: "bg-blue-50"
            },
            {
              icon: "🏠",
              title: "Remote Work Opportunities",
              description: "70% of data science jobs offer remote or flexible work arrangements.",
              bg: "bg-amber-50"
            }
          ].map((insight, index) => (
            <div key={index}>
              <Card className={`${insight.bg} border border-border-gray hover:border-primary-green transition-all duration-300 h-full`}>
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

  // Careers Section - IMPROVED ALIGNMENT
  const CareersSection = () => {
    const careers = [
      {
        title: "Data Analyst",
        salary: "₹65K-85K",
        companies: "Google, Amazon, Microsoft",
        responsibilities: [
          "Extract and analyze datasets",
          "Create dashboards and reports",
          "Present insights to stakeholders"
        ],
        skills: ["SQL", "Excel", "BI Tools", "Statistics"]
      },
      {
        title: "Data Scientist",
        salary: "₹95K-130K",
        companies: "Meta, Netflix, Uber",
        responsibilities: [
          "Build predictive models",
          "Design experiments",
          "Drive data-driven decisions"
        ],
        skills: ["Python", "Machine Learning", "Statistics", "SQL"]
      },
      {
        title: "Machine Learning Engineer",
        salary: "₹120K-180K",
        companies: "Apple, Tesla, OpenAI",
        responsibilities: [
          "Deploy ML models to production",
          "Optimize model performance",
          "Build ML infrastructure"
        ],
        skills: ["Python", "TensorFlow", "Docker", "AWS"]
      },
      {
        title: "Business Analyst",
        salary: "₹70K-95K",
        companies: "McKinsey, Deloitte, Accenture",
        responsibilities: [
          "Analyze business processes",
          "Create financial models",
          "Present strategic recommendations"
        ],
        skills: ["Excel", "Power BI", "SQL", "Statistics"]
      }
    ];

    return (
      <section id="careers" className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Careers After Bootcamp
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
              Multiple paths to success with competitive salaries
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {careers.map((career, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-border-gray hover:border-primary-green">
                  <CardContent className="p-6 h-full flex flex-col">
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

  // Hiring Organizations Section - IMPROVED ALIGNMENT
  const HiringOrganizationsSection = () => {
    const companies = [
      "Google", "Amazon", "Microsoft", "Meta", "Apple", "IBM",
      "Salesforce", "LinkedIn", "Uber", "Airbnb", "Netflix", "Adobe",
      "Intel", "Accenture", "Deloitte", "McKinsey", "Goldman Sachs",
      "JPMorgan", "PayPal", "Shopify", "Stripe", "Slack", "Palantir",
      "Databricks"
    ];

    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
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
        title: 'Statistics Fundamentals',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Descriptive statistics',
          'Probability theory',
          'Distributions and hypothesis testing',
          'Statistical inference',
          'Application to real-world problems'
        ],
        outcomes: [
          'Understand statistical fundamentals',
          'Perform statistical analysis',
          'Interpret results for business insights'
        ],
        tools: ['Python', 'SciPy', 'Statsmodels'],
        projects: 'None yet (foundation module)'
      },
      {
        id: 'python',
        title: 'Python for Data Wizards',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Python basics and data structures',
          'NumPy and Pandas mastery',
          'Data manipulation and cleaning',
          'File I/O and data formats',
          'Basic visualization with Matplotlib'
        ],
        outcomes: [
          'Master Python for data science',
          'Handle large datasets efficiently',
          'Clean and preprocess data'
        ],
        tools: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
        projects: 'Data cleaning challenge'
      },
      {
        id: 'sql',
        title: 'SQL Mastery',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Database fundamentals',
          'Complex queries and joins',
          'Window functions and CTEs',
          'Query optimization',
          'Database design principles'
        ],
        outcomes: [
          'Write complex SQL queries',
          'Optimize database performance',
          'Design efficient database schemas'
        ],
        tools: ['PostgreSQL', 'MySQL', 'SQLite'],
        projects: 'E-commerce database analysis'
      },
      {
        id: 'eda',
        title: 'EDA in Python',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Exploratory data analysis techniques',
          'Statistical visualization',
          'Correlation and causation',
          'Outlier detection and treatment',
          'Data quality assessment'
        ],
        outcomes: [
          'Perform comprehensive EDA',
          'Create compelling visualizations',
          'Identify data quality issues'
        ],
        tools: ['Seaborn', 'Plotly', 'Pandas', 'Matplotlib'],
        projects: 'Customer behavior analysis'
      },
      {
        id: 'powerbi',
        title: 'Power BI',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Power BI interface and basics',
          'Data modeling and relationships',
          'DAX formulas and measures',
          'Interactive dashboards',
          'Report publishing and sharing'
        ],
        outcomes: [
          'Build interactive dashboards',
          'Create business intelligence reports',
          'Share insights with stakeholders'
        ],
        tools: ['Power BI', 'DAX', 'Power Query'],
        projects: 'Sales performance dashboard'
      },
      {
        id: 'ml',
        title: 'Machine Learning',
        duration: '4 weeks',
        difficulty: 4,
        topics: [
          'Supervised and unsupervised learning',
          'Regression and classification algorithms',
          'Model evaluation and validation',
          'Feature engineering and selection',
          'Hyperparameter tuning'
        ],
        outcomes: [
          'Build and deploy ML models',
          'Evaluate model performance',
          'Apply ML to real business problems'
        ],
        tools: ['Scikit-learn', 'XGBoost', 'TensorFlow'],
        projects: 'Predictive modeling challenge'
      },
      {
        id: 'genai',
        title: 'Generative AI Frontier',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'Large Language Models (LLMs)',
          'Prompt engineering techniques',
          'AI integration in data workflows',
          'Ethical AI considerations',
          'Future of AI in data science'
        ],
        outcomes: [
          'Leverage AI tools effectively',
          'Integrate LLMs in data projects',
          'Stay ahead of AI trends'
        ],
        tools: ['OpenAI API', 'Hugging Face', 'LangChain'],
        projects: 'AI-powered data analysis tool'
      },
      {
        id: 'capstone',
        title: 'Capstone Challenge',
        duration: '4 weeks',
        difficulty: 5,
        topics: [
          'End-to-end project planning',
          'Data pipeline development',
          'Model deployment and monitoring',
          'Business presentation skills',
          'Portfolio development'
        ],
        outcomes: [
          'Complete a full data science project',
          'Present findings to stakeholders',
          'Build a professional portfolio'
        ],
        tools: ['All previous tools', 'Docker', 'AWS', 'Git'],
        projects: 'Industry capstone project'
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
              What You&apos;ll Learn
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
              3 months of comprehensive, industry-aligned curriculum
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
                        
                        <div className="text-right">
                          <h4 className="text-lg font-semibold text-dark-gray mb-2">Projects</h4>
                          <p className="text-medium-gray text-sm">{module.projects}</p>
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

  // Outcomes Section
  const OutcomesSection = () => {
    const outcomes = [
      {
        icon: '🔄',
        title: 'Build Data Pipelines',
        description: 'Design and implement end-to-end data workflows',
        color: 'border-t-primary-green'
      },
      {
        icon: '📊',
        title: 'Statistical Analysis',
        description: 'Perform advanced statistical tests and interpretation',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🗄️',
        title: 'SQL Expertise',
        description: 'Write optimized queries to extract and analyze data',
        color: 'border-t-primary-green'
      },
      {
        icon: '📈',
        title: 'Data Visualization',
        description: 'Create compelling dashboards and visualizations',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🤖',
        title: 'Machine Learning Models',
        description: 'Build and optimize ML models for predictions',
        color: 'border-t-primary-green'
      },
      {
        icon: '✨',
        title: 'AI Integration',
        description: 'Leverage generative AI and LLMs effectively',
        color: 'border-t-accent-blue'
      },
      {
        icon: '💬',
        title: 'Business Communication',
        description: 'Present data insights to stakeholders clearly',
        color: 'border-t-primary-green'
      },
      {
        icon: '📁',
        title: 'Portfolio Development',
        description: 'Build professional portfolio with real-world projects',
        color: 'border-t-accent-blue'
      },
      {
        icon: '🧩',
        title: 'Problem Solving',
        description: 'Apply analytical thinking to business problems',
        color: 'border-t-primary-green'
      },
      {
        icon: '📚',
        title: 'Continuous Learning',
        description: 'Stay updated with latest tools and techniques',
        color: 'border-t-accent-blue'
      }
    ];

    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              You&apos;ll Be Able To
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
              Real skills. Real impact. Real career transformation.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {outcomes.map((outcome, index) => (
              <div key={index}>
                <Card className={`h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 ${outcome.color} border border-border-gray`}>
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
        title: 'Retail Sales Analytics',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Analyze 1M+ transactions from an e-commerce platform. Extract insights on customer behavior, product performance, and seasonal trends. Create interactive dashboards for business teams.',
        techStack: ['Python', 'SQL', 'Power BI', 'Pandas'],
        learnings: [
          'Data pipeline creation',
          'SQL optimization',
          'Dashboard design'
        ],
        outcome: 'Interactive dashboard, insights report, 20-page analysis',
        gradient: 'from-primary-green to-accent-blue'
      },
      {
        title: 'Client Churn Risk Analysis',
        duration: '3 weeks',
        difficulty: 4,
        description: 'Build a machine learning model to predict customer churn for a telecom company. Use advanced feature engineering and ensemble methods to achieve 85%+ accuracy.',
        techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
        learnings: [
          'Feature engineering techniques',
          'Model ensemble methods',
          'Business impact measurement'
        ],
        outcome: 'Production-ready ML model, business recommendations, ROI analysis',
        gradient: 'from-accent-blue to-primary-green'
      },
      {
        title: 'Housing Market Analytics',
        duration: '2 weeks',
        difficulty: 3,
        description: 'Develop a comprehensive model to predict property prices using location, amenities, and market data. Create a web application for real estate agents.',
        techStack: ['Python', 'Flask', 'PostgreSQL', 'Plotly'],
        learnings: [
          'Web application development',
          'Geospatial data analysis',
          'Model deployment'
        ],
        outcome: 'Web app, API endpoints, market analysis report',
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
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
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

  // Enrollment Steps Section
  const EnrollmentStepsSection = () => {
    const steps = [
      {
        number: 1,
        icon: '✍️',
        title: 'Sign Up',
        description: 'Fill out registration form. Takes 30 seconds.'
      },
      {
        number: 2,
        icon: '📥',
        title: 'Get Course Guide',
        description: 'Receive personalized guide via email'
      },
      {
        number: 3,
        icon: '📞',
        title: 'Consultation Call',
        description: 'Free 15-minute call with counselor (optional)'
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
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
              Simple 5-step process to start your data science journey
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between relative">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div>
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
                  </div>
                  
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
                <div
                  key={index}
                  className="flex items-center space-x-4"
                >
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



  // Testimonials Section
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: 'Rajesh Kumar',
        role: 'Data Analyst at Google India',
        achievement: 'Salary: ₹4L → ₹9.5L (+137%)',
        quote: 'The curriculum was practical and affordable. Within 2 months of completing the bootcamp, I landed my dream job at Google. The instructors were amazing!',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Priya Sharma',
        role: 'ML Engineer at Amazon',
        achievement: 'First tech role after career change',
        quote: 'Coming from a non-tech background, I was nervous. But the structured curriculum and mentorship helped me transition smoothly into data science.',
        rating: 5,
        avatar: '👩‍💻'
      },
      {
        name: 'Amit Patel',
        role: 'Senior Data Scientist at Microsoft',
        achievement: 'Developer to DS transition',
        quote: 'The real-world projects and industry insights were invaluable. The bootcamp gave me the confidence to switch from software development to data science.',
        rating: 5,
        avatar: '👨‍🔬'
      },
      {
        name: 'Neha Verma',
        role: 'Data Analyst at Flipkart',
        achievement: 'CS to Analytics transition',
        quote: 'The hands-on approach and practical projects made all the difference. I could immediately apply what I learned in my new role.',
        rating: 5,
        avatar: '👩‍📊'
      },
      {
        name: 'Vikram Singh',
        role: 'Analytics Engineer at Stripe',
        achievement: 'Startup ecosystem success',
        quote: 'The bootcamp prepared me for the fast-paced startup environment. The skills I gained are directly applicable to my current role.',
        rating: 5,
        avatar: '👨‍💼'
      },
      {
        name: 'Sneha Das',
        role: 'BI Developer at Accenture',
        achievement: 'Banking to tech transition',
        quote: 'Leaving banking for tech was scary, but this bootcamp made the transition seamless. The career support was exceptional.',
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
      <section className="py-16 sm:py-20 lg:py-24 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Success Stories
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
              Real students, real transformations, real careers
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial Card */}
              <div
                key={currentTestimonial}
                className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden"
              >
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
          question: 'What programming languages will I learn?',
          answer: 'You will learn Python (primary), SQL, and R. Python is the main language used throughout the bootcamp as it\'s the industry standard for data science.'
        },
        {
          question: 'Do I need prior programming experience?',
          answer: 'No prior programming experience is required. We start from the basics and gradually build up to advanced concepts. Our curriculum is designed for complete beginners.'
        },
        {
          question: 'What tools and technologies are covered?',
          answer: 'We cover Python, SQL, Power BI, Tableau, Jupyter Notebooks, Git, AWS basics, and various machine learning libraries like scikit-learn, pandas, and numpy.'
        },
        {
          question: 'How is the curriculum updated?',
          answer: 'Our curriculum is updated monthly based on industry trends and feedback from our hiring partners. We ensure you learn the most current tools and techniques.'
        }
      ],
      job: [
        {
          question: 'What is the job placement rate?',
          answer: 'We have a 95% placement rate within 3 months of graduation. Our career support team works closely with students to ensure successful job placement.'
        },
        {
          question: 'What types of companies hire your graduates?',
          answer: 'Our graduates work at top companies including Google, Amazon, Microsoft, Meta, Netflix, and many Fortune 500 companies across various industries.'
        },
        {
          question: 'Do you provide career support after graduation?',
          answer: 'Yes, we provide lifetime career support including resume reviews, interview preparation, networking opportunities, and job placement assistance.'
        },
        {
          question: 'What salary can I expect after graduation?',
          answer: 'Our graduates typically see salary increases of 120% on average. Entry-level data science roles start at ₹6-8 LPA, with experienced professionals earning ₹12-20 LPA.'
        }
      ],
      practical: [
        {
          question: 'How long is the bootcamp?',
          answer: 'The bootcamp is 3 months long, with 8 comprehensive modules covering all aspects of data science from fundamentals to advanced topics.'
        },
        {
          question: 'What is the time commitment required?',
          answer: 'We recommend 15-20 hours per week for optimal learning. The program is designed to be flexible for working professionals and students.'
        },
        {
          question: 'Are there live sessions or is it self-paced?',
          answer: 'We offer both live sessions and self-paced learning. You can attend live sessions for real-time interaction or watch recordings at your convenience.'
        },
        {
          question: 'What if I miss a live session?',
          answer: 'All live sessions are recorded and available for replay. You can access them anytime during the bootcamp and even after graduation.'
        }
      ],
      enrollment: [
        {
          question: 'What is the total cost of the bootcamp?',
          answer: 'The bootcamp costs ₹5,000 + GST (originally ₹7,500). This includes all course materials, projects, career support, and lifetime access to resources.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees. The price includes everything: course materials, software licenses, career support, and lifetime access to the learning platform.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes, we offer flexible payment plans. You can pay in full or choose from our installment options to make it more affordable.'
        },
        {
          question: 'What is your refund policy?',
          answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with the bootcamp within the first 30 days, we\'ll provide a full refund.'
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
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
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
                      
                      <div
                        className="overflow-hidden"
                      >
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


  // Pricing Section - IMPROVED ALIGNMENT
  const PricingSection = () => {
    const cohorts = [
      { startDate: "31 October 2025", status: "Open", color: "bg-primary-green", spots: "Available: 25/30" },
      { startDate: "28 November, 2025", status: "Limited", color: "bg-accent-gold", spots: "Available: 5/30" },
    ];

    return (
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-gray mb-4 lg:mb-6">
              Invest in Your Future at Affordable Prices
            </h2>
            <p className="text-lg lg:text-xl text-medium-gray  mx-auto leading-relaxed">
              The most cost-effective bootcamp without compromising quality
            </p>
          </div>
          
          {/* Main Pricing Card */}
          <div className="mx-auto mb-12 lg:mb-16">
            <Card className="bg-white shadow-lg border-0 relative overflow-hidden">
              <CardContent className="p-8 lg:p-12">
                <h3 className="text-2xl lg:text-3xl font-bold text-dark-gray mb-6 lg:mb-8 text-center">
                  Data Science Bootcamp
                </h3>
                
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mb-8">
  {[
   
    "8 modules covering all aspects",
    "3+ capstone projects",
    "1:1 mentorship sessions",
    "Resume and portfolio guidance",
    "Interview preparation",
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
                  <Button variant="outline" className="w-full border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white py-3 text-lg font-semibold h-12">
                    Enquire Now
                  </Button>
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
              Choose a cohort date that works best for you
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {cohorts.map((cohort, index) => (
              <Card key={index} className={`${cohort.color} text-white border-0 hover:shadow-lg transition-all duration-300 h-full`}>
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="bg-white text-primary-green px-3 py-1 rounded-full text-xs font-semibold mb-4 inline-block">
                    {cohort.status}
                  </div>
                  <div className="text-lg font-bold mb-2">
                    Start: {cohort.startDate}
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

  return (
    <div className="min-h-screen">
      <Navigation currentPage="data-science-bootcamp" />
      <main className="pt-16">
        {/* <HeroSection /> */}
        <DsHeroSection/>
        <WhyChooseSection />
        <WhyLearnSection />
        <CareersSection />
        <HiringOrganizationsSection />
        <CurriculumSection />
        <OutcomesSection />
        <ProjectsSection />
        <EnrollmentStepsSection />
         <PricingSection />
        {/* <EnrollmentFormSection /> */}
        <DsEnrollmentFormSection/>
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}