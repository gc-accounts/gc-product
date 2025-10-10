'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border-gray z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GC</span>
              </div>
              <span className="text-xl font-bold text-dark-gray">Greycampus</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${
                currentPage === 'home' 
                  ? 'text-primary-green font-semibold' 
                  : 'text-medium-gray hover:text-primary-green'
              }`}
            >
              Home
            </Link>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProducts}
                className="flex items-center space-x-1 text-medium-gray hover:text-primary-green transition-colors"
              >
                <span>Bootcamps</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-border-gray py-2 z-50">
                  <a 
                    href="/data-science-bootcamp" 
                    className="block px-4 py-2 text-medium-gray hover:text-primary-green hover:bg-off-white transition-colors"
                  >
                    Data Science Bootcamp
                  </a>
                  <a 
                    href="/data-analyst-bootcamp" 
                    className="block px-4 py-2 text-medium-gray hover:text-primary-green hover:bg-off-white transition-colors"
                  >
                    Data Analyst Bootcamp
                  </a>
                  <a 
                    href="/aiml-bootcamp" 
                    className="block px-4 py-2 text-medium-gray hover:text-primary-green hover:bg-off-white transition-colors"
                  >
                    AI/ML Bootcamp
                  </a>
                </div>
              )}
            </div>
            
            <a 
              href="/about" 
              className={`transition-colors ${
                currentPage === 'about' 
                  ? 'text-primary-green font-semibold' 
                  : 'text-medium-gray hover:text-primary-green'
              }`}
            >
              About
            </a>
            <a 
              href="/contact" 
              className={`transition-colors ${
                currentPage === 'contact' 
                  ? 'text-primary-green font-semibold' 
                  : 'text-medium-gray hover:text-primary-green'
              }`}
            >
              Contact
            </a>
            <Button className="bg-primary-green hover:bg-secondary-green text-white">
              Enroll Now
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-gray">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`transition-colors ${
                  currentPage === 'home' 
                    ? 'text-primary-green font-semibold' 
                    : 'text-medium-gray hover:text-primary-green'
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              
              {/* Mobile Products Section */}
              <div>
                <button
                  onClick={toggleProducts}
                  className="flex items-center space-x-1 text-medium-gray hover:text-primary-green transition-colors w-full text-left"
                >
                  <span>Bootcamps</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProductsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <a 
                      href="/data-science-bootcamp" 
                      className="block text-medium-gray hover:text-primary-green transition-colors"
                      onClick={toggleMenu}
                    >
                      Data Science Bootcamp
                    </a>
                    <a 
                      href="/data-analyst-bootcamp" 
                      className="block text-medium-gray hover:text-primary-green transition-colors"
                      onClick={toggleMenu}
                    >
                      Data Analyst Bootcamp
                    </a>
                    <a 
                      href="/aiml-bootcamp" 
                      className="block text-medium-gray hover:text-primary-green transition-colors"
                      onClick={toggleMenu}
                    >
                      AI/ML Bootcamp
                    </a>
                  </div>
                )}
              </div>
              
              <a 
                href="/about" 
                className={`transition-colors ${
                  currentPage === 'about' 
                    ? 'text-primary-green font-semibold' 
                    : 'text-medium-gray hover:text-primary-green'
                }`}
                onClick={toggleMenu}
              >
                About
              </a>
              <a 
                href="/contact" 
                className={`transition-colors ${
                  currentPage === 'contact' 
                    ? 'text-primary-green font-semibold' 
                    : 'text-medium-gray hover:text-primary-green'
                }`}
                onClick={toggleMenu}
              >
                Contact
              </a>
              <Button className="bg-primary-green hover:bg-secondary-green text-white w-full">
                Enroll Now
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Click outside to close dropdown */}
      {isProductsOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProductsOpen(false)}
        />
      )}
    </header>
  );
}
