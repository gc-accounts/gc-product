'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
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
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GC</span>
                </div>
                <span className="text-xl font-bold">Greycampus</span>
              </Link>
              <p className="text-sm text-light-gray leading-relaxed">
                Affordable, high-quality bootcamps for career transformation
              </p>
              {/* <div className="flex space-x-4">
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
              </div> */}
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Bootcamps</h3>
              <ul className="space-y-2">
                {/* <li><Link href="/" className="text-sm text-light-gray hover:text-primary-green transition-colors">Home</Link></li> */}
                <li><Link href="/data-science-bootcamp" className="text-sm text-light-gray hover:text-primary-green transition-colors">Data Science Bootcamp</Link></li>
                <li><Link href="/data-analyst-bootcamp" className="text-sm text-light-gray hover:text-primary-green transition-colors">Data Analyst Bootcamp</Link></li>
                <li><Link href="/aiml-bootcamp" className="text-sm text-light-gray hover:text-primary-green transition-colors">AI/ML Bootcamp</Link></li>
    
              </ul>
            </div>
            
            {/* Column 3: Resources */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about-us" className="text-sm text-light-gray hover:text-primary-green transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-sm text-light-gray hover:text-primary-green transition-colors">Contact</Link></li>
                {/* <li><a href="/blog" className="text-sm text-light-gray hover:text-primary-green transition-colors">Blog</a></li>
                <li><a href="/opencampus" className="text-sm text-light-gray hover:text-primary-green transition-colors">Opencampus</a></li> */}
                {/* <li><a href="https://www.corporate.greycampus.com/" className="text-sm text-light-gray hover:text-primary-green transition-colors">Success Stories</a></li>
                <li><a href="https://www.corporate.greycampus.com/" className="text-sm text-light-gray hover:text-primary-green transition-colors">Community</a></li>
                <li><a href="https://www.corporate.greycampus.com/" className="text-sm text-light-gray hover:text-primary-green transition-colors">FAQ</a></li> */}
              </ul>
            </div>
            

               <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/termsOfUse" className="text-sm text-light-gray hover:text-primary-green transition-colors">Terms Of Use</a></li>
                <li><a href="/privacyPolicy" className="text-sm text-light-gray hover:text-primary-green transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
       

          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-4 sm:space-y-0">
            <p className="text-xs text-light-gray">
              © 2025 Greycampus. All rights reserved.
            </p>

            {/* <div className="flex space-x-6">
              <a href="#" className="text-xs text-light-gray hover:text-primary-green transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-light-gray hover:text-primary-green transition-colors">
                Terms of Service
              </a>
            </div> */}

          </div>
        </div>
      </div>
    </footer>
  );
}
