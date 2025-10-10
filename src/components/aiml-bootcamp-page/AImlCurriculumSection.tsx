'use client'
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react'

  const AImlCurriculumSection = () => {
    const modules = [
      {
        id: 'python1',
        title: 'Python for AI Applications – Part I',
        duration: '2 weeks',
        difficulty: 1,
        topics: [
          'Advanced Python concepts',
          'Functional programming',
          'Performance optimization',
          'Real-world Python best practices'
        ],
        outcomes: [
          'Master advanced Python',
          'Write optimized code',
          'Real-world problem solving'
        ],
        tools: ['Python 3.9+', 'libraries']
      },
      {
        id: 'python2',
        title: 'Python for AI Applications – Part II',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'NumPy mastery',
          'Pandas data processing',
          'Data manipulation techniques',
          'Performance optimization'
        ],
        outcomes: [
          'Data processing expertise',
          'NumPy/Pandas mastery',
          'Efficient data handling'
        ],
        tools: ['NumPy', 'Pandas', 'Scikit-learn']
      },
      {
        id: 'eda1',
        title: 'Exploratory Data Analysis (EDA) – Part I',
        duration: '2 weeks',
        difficulty: 2,
        topics: [
          'Data visualization techniques',
          'Statistical analysis methods',
          'Pattern recognition',
          'Data quality assessment'
        ],
        outcomes: [
          'Comprehensive EDA skills',
          'Statistical analysis',
          'Data visualization mastery'
        ],
        tools: ['Matplotlib', 'Seaborn', 'Plotly']
      },
      {
        id: 'eda2',
        title: 'Exploratory Data Analysis (EDA) – Part II',
        duration: '2 weeks',
        difficulty: 3,
        topics: [
          'Advanced visualization',
          'Feature engineering',
          'Data preprocessing',
          'Statistical modeling'
        ],
        outcomes: [
          'Advanced EDA techniques',
          'Feature engineering skills',
          'Statistical modeling'
        ],
        tools: ['Python', 'advanced visualization']
      },
      {
        id: 'ml1',
        title: 'Machine Learning – Part I (Supervised)',
        duration: '3 weeks',
        difficulty: 3,
        topics: [
          'Regression algorithms',
          'Classification methods',
          'Model optimization',
          'Cross-validation techniques'
        ],
        outcomes: [
          'Supervised learning mastery',
          'Model optimization skills',
          'Performance evaluation'
        ],
        tools: ['Scikit-learn', 'LightGBM']
      },
      {
        id: 'ml2',
        title: 'Machine Learning – Part II (Unsupervised & Deep Learning)',
        duration: '3 weeks',
        difficulty: 4,
        topics: [
          'Clustering algorithms',
          'Neural networks fundamentals',
          'CNNs and RNNs',
          'Deep learning architectures'
        ],
        outcomes: [
          'Unsupervised learning skills',
          'Deep learning fundamentals',
          'Neural network design'
        ],
        tools: ['TensorFlow', 'Keras', 'PyTorch']
      },
      {
        id: 'llm',
        title: 'Foundational Language Models & Fine-tuning',
        duration: '2 weeks',
        difficulty: 4,
        topics: [
          'Transformer architecture',
          'BERT and GPT models',
          'Fine-tuning techniques',
          'Transfer learning'
        ],
        outcomes: [
          'LLM understanding',
          'Fine-tuning expertise',
          'Transfer learning skills'
        ],
        tools: ['Hugging Face', 'PyTorch', 'TensorFlow']
      },
      {
        id: 'rag',
        title: 'Retrieval Augmented Generation (RAGs)',
        duration: '1 week',
        difficulty: 4,
        topics: [
          'Vector databases',
          'Semantic search',
          'RAG system architecture',
          'Embedding techniques'
        ],
        outcomes: [
          'RAG system design',
          'Vector database skills',
          'Semantic search implementation'
        ],
        tools: ['LangChain', 'OpenAI APIs', 'Pinecone']
      },
      {
        id: 'agents',
        title: 'AI Agents, Deployment & Projects',
        duration: '2 weeks',
        difficulty: 5,
        topics: [
          'Autonomous agents design',
          'Docker containerization',
          'Cloud deployment',
          'Production monitoring'
        ],
        outcomes: [
          'AI agent development',
          'Production deployment',
          'System monitoring'
        ],
        tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure']
      },
      {
        id: 'capstone',
        title: 'Capstone Project – Production AI System',
        duration: '1 week',
        difficulty: 5,
        topics: [
          'End-to-end project development',
          'Production deployment',
          'System monitoring',
          'Performance optimization'
        ],
        outcomes: [
          'Complete AI system',
          'Production deployment',
          'Real-world application'
        ],
        tools: ['All learned tools']
      }
    ];

    const [activeModule, setActiveModule] = useState('python1');

    const getDifficultyStars = (difficulty: number) => {
      return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
    };

    return (
      <section id="curriculum" className="py-10 sm:py-15 lg:py-20 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-3 lg:mb-4">
              What You'll Learn
            </h2>
            <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
              20 weeks of cutting-edge AI/ML curriculum
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Module Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeModule === module.id
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
                  className={`transition-all duration-500 ${activeModule === module.id ? 'block' : 'hidden'
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

export default AImlCurriculumSection