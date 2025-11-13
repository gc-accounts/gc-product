'use client'
import { CheckCircle } from 'lucide-react';
import React, { useState } from 'react'


interface Props {
  sectionClass?: string;
  title?: string;
  subText?: string;
}

const AimlCurriculum = ({ sectionClass, title, subText }: Props) => {

    const modules = [
     {
      "id": "python_ai",
      "title": "Python in AI Applications",
      "duration": "1 week",
      "difficulty": 1,
      "topics": [
        "Lists and tuples for AI data management",
        "Dictionaries and data structuring for model input",
        "Libraries for AI: NumPy, Pandas, Matplotlib",
        "File handling, modular programming, and OOP for AI applications"
      ],
      "outcomes": [
        "Write Python scripts tailored for AI and ML workflows",
        "Manage and preprocess datasets effectively",
        "Build reusable functions and classes for AI pipelines"
      ],
      "tools": ["Python", "NumPy", "Pandas", "Matplotlib"],
      "projects": "Basic Python Project for AI (Data handling and automation tasks)"
    },
    {
      "id": "ml_models",
      "title": "Machine Learning Models",
      "duration": "1 week",
      "difficulty": 2,
      "topics": [
        "Introduction to supervised learning",
        "Regression and classification algorithms",
        "Model training, testing, and evaluation metrics",
        "Hyperparameter tuning and optimization"
      ],
      "outcomes": [
        "Build foundational ML models for prediction tasks",
        "Apply regression and classification in real data scenarios",
        "Evaluate model performance and improve accuracy"
      ],
      "tools": ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      "projects": "Supervised Learning Case Study"
    },
    {
      "id": "deep_learning_nlp",
      "title": "Deep Learning (CNN & RNN) and Natural Language Processing",
      "duration": "2 weeks",
      "difficulty": 4,
      "topics": [
        "CNN architecture and working principles",
        "RNN and sequence modeling fundamentals",
        "Tokenization, embeddings, and word vectors",
        "Text classification and sentiment analysis"
      ],
      "outcomes": [
        "Understand and implement CNN and RNN architectures",
        "Apply deep learning for image and text data",
        "Use NLP for text analytics and automation"
      ],
      "tools": ["TensorFlow", "Keras", "PyTorch", "NLTK", "Hugging Face"],
      "projects": "Image Classification and Text Analysis Tasks"
    },
    {
      "id": "foundation_llm",
      "title": "Foundational Language Models & Fine-tuning (PEFT, LoRA, QLoRA)",
      "duration": "3 weeks",
      "difficulty": 4,
      "topics": [
        "Introduction to LLMs (GPT, LLaMA, Mistral)",
        "Tokenization, embeddings, and architecture",
        "Fine-tuning with PEFT, LoRA, and QLoRA",
        "Evaluating and optimizing LLM performance"
      ],
      "outcomes": [
        "Understand the inner workings of modern LLMs",
        "Fine-tune pre-trained models for custom datasets",
        "Optimize LLM performance using efficient fine-tuning methods"
      ],
      "tools": ["Hugging Face", "Transformers", "PEFT", "LoRA", "QLoRA"],
      "projects": "Custom Model Fine-tuning (Domain-Specific Chat Model)"
    },
    {
      "id": "rags",
      "title": "RAGs: Chunking, Embedding & Frameworks (LangChain, LlamaIndex, OpenAI)",
      "duration": "1.5 weeks",
      "difficulty": 3,
      "topics": [
        "Chunking and embedding text for retrieval",
        "Building vector databases and search pipelines",
        "Implementing RAG workflows",
        "Using LangChain, LlamaIndex, and OpenAI APIs"
      ],
      "outcomes": [
        "Implement retrieval-augmented generation workflows",
        "Integrate vector search into AI systems",
        "Build knowledge-based chatbot systems"
      ],
      "tools": ["LangChain", "LlamaIndex", "OpenAI API", "Pinecone", "FAISS"],
      "projects": "Knowledge Retrieval Chatbot"
    },
    {
      "id": "ai_agents",
      "title": "AI Agents, AutoGen & Deployment: Vision, Contact Center, and Automation",
      "duration": "1.5 weeks",
      "difficulty": 4,
      "topics": [
        "Multi-agent systems and agentic workflows",
        "Function calling and automation frameworks",
        "Vision and document AI applications",
        "Deploying AI agents for real-world use cases"
      ],
      "outcomes": [
        "Understand AI agent architecture and workflows",
        "Automate complex reasoning and task orchestration",
        "Deploy AI models into real-world business applications"
      ],
      "tools": ["AutoGen", "LangChain", "OpenAI API", "Streamlit", "FastAPI"],
      "projects": "AI Contact Center Agent or Vision-based Automation"
    },
    {
      "id": "capstone",
      "title": "Capstone Project",
      "duration": "1 week",
      "difficulty": 4,
      "topics": [
        "Problem definition and data preparation",
        "Model development and deployment",
        "Solution presentation and demonstration"
      ],
      "outcomes": [
        "Build an end-to-end applied AI project",
        "Showcase the ability to implement production-level solutions"
      ],
      "tools": ["Python", "LLMs", "LangChain", "AutoGen", "Streamlit"],
      "projects": "Industry-specific Applied AI Project"
    },


    ];

    const [activeModule, setActiveModule] = useState('python_ai');

    const getDifficultyStars = (difficulty: number) => {
      return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
    };

    return (
   <section className={`${sectionClass ? sectionClass : ''}`}>
      <div className="container max-w-7xl mx-auto">

        <div className="text-center mb-8 lg:mb-10 max-w-8xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark-gray mb-2 lg:mb-3">
            {title}
          </h2>
          <p className="text-sm md:text-base text-medium-gray mx-auto leading-relaxed">
            {subText}
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
                      : 'bg-gray-200 text-dark-gray hover:bg-medium-gray hover:text-white'
                    }`}
                >
                  {module.title}
                </button>
              ))}
            </div>

            {/* Module Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-border-gray overflow-hidden max-w-5xl mx-auto">
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
                              <div className="w-1.5 h-1.5 bg-primary-green rounded-full mt-2 shrink-0"></div>
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
                              <CheckCircle className="w-4 h-4 text-primary-green shrink-0 mt-0.5" />
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

export default AimlCurriculum