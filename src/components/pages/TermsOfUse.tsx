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

// Simple counter hook without animations (Keeping as is)
const useCounter = (end: number) => {
  const [count] = useState(end);
  const ref = useRef<HTMLDivElement>(null);

  return { count, ref };
};

export default function TermsOfUse() {

  return (
    <div className="min-h-screen">
      <Navigation currentPage="about" />

      <main className="pt-16">
        {/* SECTION 1: HERO SECTION */}
        <section className="bg-white py-[50px] md:py-[70px] border-b border-gray-200">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl sm:text-5xl md:text-5xl font-bold text-dark-gray leading-tight mb-4">
              Terms of <span className="text-primary-green">Use</span>
            </h1>
            <p className="text-center text-lg text-medium-gray leading-relaxed">
              Last Updated: October 2025 (Placeholder)
            </p>
          </div>
        </section>

        {/* SECTION 2: TERMS OF USE CONTENT */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-dark-gray prose prose-lg">
            
            <p className="mb-6">
              These terms and conditions (“Terms and Conditions”) control your use of this website GreyCampus.com (“Website”). In these Terms and Conditions, “GreyCampus” is referred to as the “Company”, “us,” or “we.”
            </p>

            <p className="mb-6">
              ‘You’ refers to a user or a paying customer. If you are a company or another person who gives access to company products, you agree to take responsibility in full in case of damages or indemnification that could properly lie against the customer.
            </p>

            <p className="mb-6">
              The GreyCampus website (the ‘Site’), the educational services made available through the site, and the content (the ‘Products’) are owned, operated, and maintained, as applicable, by GreyCampus (‘we’, ‘our’, ‘us’, or the ‘Company’). The Site, Products and Content are, collectively, the ‘Company Products’.
            </p>

            <p className="mb-6">
              By (a) using or accessing the Company Products, including, but not limited to downloading or accessing, (b) offering a Course through the Site or through Software; you agree to the terms and conditions set forth in these Terms of Use (the “Terms”).
            </p>

            <blockquote className="text-xl font-semibold border-l-4 border-primary-green pl-4 italic text-dark-gray bg-gray-50 p-4 rounded-md">
              <p>BY USING THIS WEBSITE OR ITS PRODUCTS AND SERVICES, YOU AGREE AND WARRANT THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. COMPANY’S PRIVACY POLICY CAN BE FOUND AT <a href="/privacy-policy" className="text-primary-green underline hover:no-underline">Privacy Policy</a>. IF YOU DO NOT ACCEPT THESE TERMS, YOU MUST NOT USE – AND ARE NOT AUTHORIZED TO USE – ALL OR ANY PORTION OF THE COMPANY’S WEBSITE AND ITS PRODUCTS OR SERVICES (AS DEFINED BELOW).</p>
            </blockquote>

            <p className="mb-10">
              Please read them carefully before you use the services of this site.
            </p>

            {/* --- WEBSITE USAGE GUIDELINES --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">WEBSITE USAGE GUIDELINES</h2>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>Do not Insult, abuse, harass, stalk, threaten, or otherwise infringe the rights of others;</li>
              <li>Do not publish, post, distribute or disseminate any defamatory, infringing, indecent, offensive, or unlawful material or information;</li>
              <li>Do not upload, install, transfer files that are protected by Intellectual Property laws or software which affects other computers.</li>
              <li>It’s prohibited to edit HTML source code, reverse engineer, or attempt to hack.</li>
              <li>Do not run Spam services/scripts or anything which could affect infrastructure, and in turn, users. (This point was unique to the first list, so I'm including it.)</li>
              <li>Do not communicate spam, advertise or sell services such as digital downloads, eBooks, or phishing links.</li>
              <li>You may not copy, distribute and indulge in plagiarism with website content or user-submitted content.</li>
            </ul>

            {/* --- THE CONTENT --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">THE CONTENT</h2>
            <p className="text-medium-gray">
              All website content or information that can be seen, heard, or otherwise experienced on the Site is copyrighted and belongs to GreyCampus or its partners, affiliates, or third parties. You may use the Site, the Service, and the Content for your own personal, non-commercial use only.
            </p>
            <p className="text-medium-gray">
              You may download and print the available material for your own personal, non-commercial use only. You will not transfer any information from the website or produce derivative work which you can display, distribute or transmit.
            </p>

            {/* --- LINKS AND HYPERLINKS TERMS --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">LINKS AND HYPERLINKS TERMS</h2>
            <p className="text-medium-gray mb-4">
              This website may have links to other websites. We do not undertake any control over the content of these websites; nor are we responsible for their website content. The sole purpose of the links included is to provide users with information. Hence, GreyCampus will not be held responsible.
            </p>
            
            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">HYPERLINKS</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>You may not mirror or frame the home page or any other pages of this Site on any other website or web page.</li>
              <li>Do not link to GreyCampus pages and subpages with spam links/anchor text which could provide a false impression. This may create misunderstandings for the users.</li>
              <li>Do not use or include copyrighted or registered trademarks, or Intellectual property images, designs, or content as a link to the GreyCampus website.</li>
              <li>Do not link to pages which support racism, terrorism.</li>
              <li>Do not link to pages that provide pornographic content and violate human rights.</li>
            </ul>

            {/* --- COPYRIGHT AND INTELLECTUAL PROPERTY --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">COPYRIGHT AND INTELLECTUAL PROPERTY</h2>
            <p className="text-medium-gray">
              We value and respect others' intellectual property and expect our users to do the same.
            </p>
            <p className="text-medium-gray">
              The entire contents of the Site are protected by copyright and trademark laws. The owner of the copyrights and trademarks are GreyCampus.com, its affiliates, or other third-party licensors. The material on the site, including text, graphics, code, and/or software is copyrighted and belongs to GreyCampus, therefore you may not duplicate, modify, publish or reproduce the content in any manner.
            </p>
            <p className="text-medium-gray">
              GreyCampus does not take any responsibility for the content on other sites (except our partners and affiliates), that you may find when searching or accessing GreyCampus products or services. The privacy policy and terms of use of the sites that you visit will administer that material.
            </p>
            <p className="text-medium-gray">
              GreyCampus has all the rights to disable or prohibit access to users who do not respect and involve in the infringement of GreyCampus intellectual property.
            </p>
            <p className="text-medium-gray">
              You are not allowed to use any of the digital images or logos from the website. In case of copyright issues, there has to be a written consent from the trademark owner.
            </p>

            {/* --- CLAIMS OF INTELLECTUAL PROPERTY VIOLATIONS --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">CLAIMS OF INTELLECTUAL PROPERTY VIOLATIONS</h2>
            <p className="text-medium-gray">
              If you believe that your work has been used without your permission in a way that prompts copyright infringement. Please provide us the below information and we will act on it.
            </p>
            <p className="text-medium-gray mb-4">
              The authorized person who will act on behalf of the owner of the copyright should send a digital or physical signature.
            </p>
            <ol className="list-decimal list-outside space-y-3 pl-5 text-medium-gray">
              <li>A description of the copyrighted work that you claim to be infringing your IP.</li>
              <li>A description of where and how the material that you claim is infringing is located on the GreyCampus website, with enough detail that we may find it on the website.</li>
              <li>Contact Details – Address, telephone number, and email address.</li>
              <li>A statement by you, that the information which you provided is accurate and your claim of the copyright or intellectual property is on your owner’s behalf.</li>
              <li>You can reach GreyCampus to notify your claims of copyright by email - <a href="mailto:support@greycampus.com" className="text-primary-green underline hover:no-underline">support@greycampus.com</a></li>
            </ol>

            {/* --- TRANSACTION TERMS --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">TRANSACTION TERMS</h2>
            <p className="text-medium-gray">
              When you transact on the GreyCampus website, you agree to the following terms of transactions
            </p>
            <ol className="list-decimal list-outside space-y-3 pl-5 text-medium-gray">
              <li>To make a transaction on the GreyCampus website, you are bound to pay for that transaction.</li>
              <li>Please pay close attention to your payment details such as total bill, taxes, shipping costs, discounts.</li>
              <li>There are certain products that require additional terms and conditions to which you have to agree before you make the purchase.</li>
              <li>WE MAKE NO WARRANTIES OF ANY KIND, EXPRESSED OR IMPLIED, WITH RESPECT TO ANY PRODUCTS OR SERVICES SOLD ON OR THROUGH GREYCAMPUS.</li>
              <li>No additional or different terms contained in any purchase order, document, transmission, or other communication shall be binding upon GreyCampus unless agreed to by GreyCampus in writing.</li>
              <li>GreyCampus reserves the right to modify, change without prior notice, and in its sole discretion, limit the order quantity on any item and to refuse service to anyone.</li>
            </ol>

            {/* --- PRICING DISCLAIMER --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">PRICING DISCLAIMER</h2>
            <p className="text-medium-gray">
              All prices, products, and offers of the GreyCampus website are subject to change without notice.
            </p>
            <p className="text-medium-gray">
              While we make sure to provide the most accurate and up-to-date information, in some cases one or more items on our website may be priced incorrectly. This might happen due to human errors, digital images, technical errors, or a mismatch in pricing information received from our suppliers.
            </p>
            <p className="text-medium-gray">
              GreyCampus reserves the right to change prices for all our products, offers, or deals. These changes are done due to market conditions, course termination, providers, price changes, errors in advertisements, and other mitigating circumstances.
            </p>

            {/* --- PROPRIETARY USE OF GREYCAMPUS STUDY MATERIAL --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">PROPRIETARY USE OF GREYCAMPUS STUDY MATERIAL</h2>
            <p className="text-medium-gray">
              GreyCampus owns the Intellectual property rights of all the study materials provided to the delegates, partners, and affiliates. Therefore, no part of any course materials may be duplicated, transmitted digitally, mechanically, or by photocopying, recording and should not be translated into other languages without written permission.
            </p>
            
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}