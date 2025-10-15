'use client';

import React, { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {

  return (
    <div className="min-h-screen">
      <Navigation currentPage="about" />

      <main className="pt-16">
        {/* SECTION 1: HERO SECTION */}
        <section className="bg-white py-[50px] md:py-[70px] border-b border-gray-200">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl sm:text-5xl md:text-5xl font-bold text-dark-gray leading-tight mb-4">
              Privacy <span className="text-primary-green">Policy</span>
            </h1>
            <p className="text-center text-lg text-medium-gray leading-relaxed">
              We respect your right to privacy and hate spam as much as you do.
            </p>
          </div>
        </section>

        {/* SECTION 2: POLICY CONTENT */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-dark-gray prose prose-lg">
            
            <p className="mb-4">
              The goal of this policy is to make explicit, the information we gather on our customers and users, how we will use it, and how we will not. This policy is, unfortunately, longer than we would like, but we must unambiguously address all the relevant cases. We will try and keep the language simple and direct as much as possible.
            </p>

            <blockquote className="text-lg font-medium border-l-4 border-primary-green pl-4 italic text-dark-gray bg-gray-50 p-4 rounded-md">
              <p>
                **Our Privacy Commitment:** GreyCampus has never sold your information to someone else for advertising or made money by showing you other people's ads, and we never will. This has been our approach since inception, and we remain committed to it. This policy tells you the purpose and who we are, what information we do collect from you, what we do with it, who can access it, and what you can do about it.
              </p>
            </blockquote>

            {/* --- PURPOSE AND WHO WE ARE --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">PURPOSE AND WHO WE ARE</h2>
            <p className="text-medium-gray">
              The purpose of this Privacy Policy is to describe how **GreyCampus, Inc. and GreyCampus Edutech Private Limited** ("GreyCampus," "us," "we," or "our") collects, uses and shares information about you through our online interfaces (e.g., websites and mobile applications) owned and controlled by us, including `www.greycampus.com` (collectively referred to herein as the "Site"). Please read this notice carefully to understand what we do. If you do not understand any aspects of our Privacy Policy, please feel free to contact us at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.
            </p>
            <p className="text-medium-gray">
              GreyCampus is an Edtech firm with a principal place of business at **II Floor, Block 1, My Home Hub, HITEC City, Madhapur, Hyderabad - 500081**. GreyCampus is both a data controller and a data processor of all Personally Identifiable Information (defined below) collected via the site and of certain Personally Identifiable Information collected from third parties.
            </p>
            <p className="text-medium-gray">
              This Privacy Policy covers information we collect from you through our Site. Some of our Site’s functionality can be used without sharing any Personally Identifiable Information, though, for features or services related to the Courses, **Personally Identifiable Information is required**. In order to access certain features and benefits on our Site, you may need to submit, or we may collect Personally Identifiable Information.
            </p>
            <p className="text-medium-gray">
              "**Personally Identifiable Information**" (i.e., information that can be used to identify you). Personally, Identifiable Information can include information such as your name and email address, among other things. If you reside or are located in the EEA, it can also include your IP address or device identifier. You are responsible for ensuring the accuracy of the Personally Identifiable Information you submit to GreyCampus. Inaccurate information may affect your ability to use the Site, the information you receive when using the Site, and our ability to contact you. For example, your email address should be kept current because that is one of the primary manners in which we communicate with you.
            </p>


            {/* --- WHAT INFORMATION DO WE COLLECT? --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">WHAT INFORMATION DO WE COLLECT?</h2>
            <p className="text-medium-gray mb-4">
              We collect information about you only if we need the information for some legitimate purpose. GreyCampus will have information about you only if:
            </p>
            <ol className="list-decimal list-outside space-y-3 pl-5 text-medium-gray mb-6">
              <li>you have provided the information yourself,</li>
              <li>GreyCampus has automatically collected the information, or</li>
              <li>GreyCampus has obtained the information from a third party.</li>
            </ol>
            
            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Information that you provide us</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>**Account signup:** When you sign up for an account to access one or more of our services, we ask for information like your name, contact number, email address, company name and country to complete the account signup process. You'll also be required to choose a unique username and a password for accessing the created account.</li>
              <li>**Event registrations and other form submissions:** We record information that you submit when you (i) register for any event, like webinars (ii) submit a form in order to download any brochure, whitepaper, or other materials, (iv) participate in contests or respond to surveys, or (v) submit a form to request customer support or to contact GreyCampus for any other purpose.</li>
              <li>**Payment processing:** When you buy something from us, we ask you to provide your name, contact information, and credit card information or other payment account information. When you submit your card information, we store the name and address of the cardholder, the expiry date and the last four digits of the credit card number on secured servers of our Payment Gateway Service Providers. **Your credit card information is never stored in our system** as it is processed by our payment gateway partners which use encryption technologies while processing your information.</li>
              <li>**Testimonials:** When you authorize us to post testimonials about our products and services on websites, we may include your name and other personal information in the testimonial. You will be given an opportunity to review and approve the testimonial before we post it. If you wish to update or delete your testimonial, you can contact us at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.</li>
              <li>**Interactions with GreyCampus:** We may record, analyze and use your interactions with us, including email, telephone, and chat conversations with our sales and customer support professionals, for improving our interactions with you and other customers.</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Information that we collect automatically</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>**Information from browsers, devices and servers:** When you visit our websites, we collect information that web browsers, mobile devices and servers make available, such as the internet protocol address, browser type, language preference, time zone, referring URL, date and time of access, operating system, mobile device manufacturer or mobile network information. We include these in our log files to understand more about visitors to our websites.</li>
              <li>**Information from first-party cookies and tracking technologies:** We use temporary and permanent cookies to identify users of our services and to enhance user experience. We also use cookies, beacons, tags, scripts, and other similar technologies to identify visitors, track website navigation, gather demographic information about visitors and users, understand campaign effectiveness and for targeted visitor and user engagement by tracking your activities on our websites. You can learn more about the cookies used on our websites on our **Cookie Policy**.</li>
              <li>**Information from application logs and analytics:** We collect information about your use of our products, services, and applications from application logs and analytics tools, and use it to understand how your use and needs can improve our products. This information includes clicks, scrolls, features accessed, access time and frequency, errors generated, performance data, storage utilized, user settings and configurations, and devices used to access and their locations.</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Information that we collect from third parties</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>**Affiliates:** If someone has registered for any of our products or services through any of our affiliates, the affiliate may have provided us with your name, email address, and other personal information. You may contact us at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a> to request that we remove your information from our database. The information provided is used to create access to our platform.</li>
              <li>**Information from our service providers:** GreyCampus may receive information about you from review sites if you comment on any review of our products and services, and from other third-party service providers that we engage for marketing our products and services.</li>
              <li>**Information from social media sites and other publicly available sources:** When you interact or engage with us on social media sites such as Facebook, LinkedIn, Twitter, Google+ and Instagram through posts, comments, questions and other interactions, we may collect such publicly available information to allow us to connect with you, improve our products, or better understand user reactions and issues.</li>
            </ul>

            {/* --- WHAT DO WE DO WITH THE INFORMATION? --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">WHAT DO WE DO WITH THE INFORMATION?</h2>
            <p className="text-medium-gray mb-4">
              Below are the purposes for which the information collected may be used:
            </p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>To communicate with you (such as through email) about products that you have downloaded and services that you have signed up for, changes to this Privacy Policy, changes to the Terms of Service, or important notices;</li>
              <li>To keep you posted on new products and services, upcoming events, offers, promotions and other information that we think will be of interest to you;</li>
              <li>To ask you to participate in surveys, or to solicit feedback on our products and services;</li>
              <li>To understand how users use our products and services, to monitor and prevent problems, and to improve our products and services;</li>
              <li>To provide customer support, and to analyze and improve our interactions with customers;</li>
              <li>To detect and prevent fraudulent transactions and other illegal activities, to report spam, and to protect the rights and interests of GreyCampus, GreyCampus’ users, third parties and the public;</li>
              <li>To analyze trends, administer our websites, and track visitor navigations on our websites to understand what visitors are looking for and to better help them;</li>
              <li>To monitor and improve marketing campaigns and make suggestions relevant to the user.</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Legal bases for collecting and using information</h3>
            <h4 className="text-lg font-semibold text-dark-gray mt-4 mb-2">Legal processing bases applicable to GreyCampus:</h4>
            <p className="text-medium-gray">
              If you are an individual from the European Economic Area (EEA), our legal basis for information collection and use depends on the personal information concerned and the context in which we collect it. Most of our information collection and processing activities are typically based on **(i) contractual necessity, (ii) one or more legitimate interests of GreyCampus** or a third party that are not overridden by your data protection interests, or **(iii) your consent**. Sometimes, we may be legally required to collect your information or may need your personal information to protect your vital interests or those of another person.
            </p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray mt-4">
              <li>**Withdrawal of consent:** Where we rely on your consent as a legal basis, you have the right to withdraw your consent at any time, but this will not affect any processing that has already taken place.</li>
              <li>**Legitimate interests notice:** Where we rely on legitimate interests as the legal basis and those legitimate interests are not specified above, we will clearly explain to you what those legitimate interests are at the time that we collect your information.</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Your choice in information use</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>**Opt-out of non-essential electronic communications:** You may opt-out of receiving newsletters and other non-essential messages by using the ‘unsubscribe’ function included in all such messages. However, you will continue to receive notices and essential transactional emails.</li>
              <li>**Disable cookies:** You can disable browser cookies before visiting our websites. However, if you do so, you may not be able to use certain features of the websites properly.</li>
              <li>**Optional information:** You can choose not to provide optional profile information and can also delete or change your optional profile information. You can always choose not to fill in non- mandatory fields when you submit any form linked to our websites.</li>
            </ul>

            {/* --- WHO CAN ACCESS THE INFORMATION --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">WHO CAN ACCESS THE INFORMATION</h2>
            <p className="text-medium-gray">
              GreyCampus solely has access to the information collected. **We do not sell any personal information.** We share your information only in the ways that are described in this Privacy Policy, and only with parties who adopt appropriate confidentiality and security measures.
            </p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray mt-4">
              <li>**Employees and independent contractors:** Employees of GreyCampus have access to the information mentioned above on a need-to-know basis. We require all employees to follow this Privacy Policy for personal information that we share with them.</li>
              <li>**Third-party service providers:** We may need to share your personal information and aggregated or de-identified information with third-party service providers that we engage, such as marketing and advertising partners, event organizers, web analytics providers and payment processors. These service providers are authorized to use your personal information only as necessary to provide these services to us.</li>
              <li>**Partners:** We may share your personal information with our authorized partner in your region, solely for the purpose of contacting you about products or services that you have signed up for. We will give you an option to opt-out of continuing to work with that partner.</li>
            </ul>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Who might GreyCampus share your information with?</h3>
            <p className="text-medium-gray mb-4">
              GreyCampus may share your personal information with third parties, either because you have consented to allow us to do so or for legal reasons. For example, we may share your personal information with:
            </p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>**Accreditation & examination bodies** (like PMI, PeopleCert, Axelos) to provide pre-examination, examination and post-examination services.</li>
              <li>**Third parties who provide shipping or publishing services** because you have purchased goods or services.</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Other reasons GreyCampus may share your personal information with a third party</h3>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>**Disclosures in compliance with legal obligations:** We may be required by law to preserve or disclose your personal information and service data to comply with any applicable law, regulation, legal process or governmental request, including to meet national security requirements.</li>
              <li>**Enforcement of our rights:** We may disclose personal information and service data to a third party if we believe that such disclosure is necessary for preventing fraud, investigating any suspected illegal activity, enforcing our agreements or policies, or protecting the safety of our users.</li>
              <li>**Business Transfers:** We do not intend to sell our business. However, in the unlikely event that we sell our business or get acquired or merged, we will notify you via email or through a prominent notice on our website of any change in ownership or in the use of your personal information and service data. We will also notify you about any choices you may have regarding your personal information and service data.</li>
            </ul>

            {/* --- WHAT ARE YOUR RIGHTS? --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">WHAT ARE YOUR RIGHTS?</h2>
            <p className="text-medium-gray mb-4">
              If you are in the European Economic Area (EEA), you have the following rights with respect to information that GreyCampus holds about you. GreyCampus undertakes to provide you with the same rights no matter where you choose to live.
            </p>
            
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Your Right</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3">What GreyCampus Does to Protect Your Rights</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to be informed</td>
                  <td className="px-6 py-4">GreyCampus is publishing this Privacy Notice to keep you informed as to what we do with your personal information. We strive to be transparent about how we use your data.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to access</td>
                  <td className="px-6 py-4">You have the right to access your information. Please contact GreyCampus Data Protection Officer at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a> if you wish to access the personal information GreyCampus holds about you.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to rectification</td>
                  <td className="px-6 py-4">If the information GreyCampus holds about you is inaccurate or not complete, you have the right to ask us to rectify it. If that data has been passed to a third party with your consent or for legal reasons, then we must also ask them to rectify the data. Please contact our Data Protection Officer if you need us to rectify your information: <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to erasure</td>
                  <td className="px-6 py-4">This is sometimes called ‘the right to be forgotten. If you want GreyCampus to erase all your personal data and we do not have a legal reason to continue to process and hold it, please contact our Data Protection Officer: <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to restrict processing</td>
                  <td className="px-6 py-4">You have the right to ask GreyCampus to restrict how we process your data. This means We are permitted to store the data but not further process it. We keep just enough data to make sure we respect your request in the future. If you want us to restrict the processing of your data, please contact our Data Protection Officer: <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to data portability</td>
                  <td className="px-6 py-4">GreyCampus must allow you to obtain and reuse your personal data for your own purposes across services in a safe and secure way without this affecting the usability of your data. Please contact our Data Protection Officer if you want information on how to port your data elsewhere: <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>. This right only applies to personal data that you have provided to us as the Data Controller. The data must be held by us by consent or for the performance of a contract.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to object</td>
                  <td className="px-6 py-4">You have the right to object to GreyCampus processing your data even if it is based on Our legitimate interests, the exercise of official authority, direct marketing (including data aggregation), and processing for the purposeless of statistics. If you wish to object please contact our Data Protection Officer: <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to withdraw consent</td>
                  <td className="px-6 py-4">If you have given us your consent to process your data but change your mind later, you have the right to withdraw your consent at any time, and GreyCampus must stop processing your data. If you want to withdraw your consent, please contact our Data Protection Officer: <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold">The right to complain to a Supervisory Authority</td>
                  <td className="px-6 py-4">You have the right to complain to the authority if you feel that GreyCampus has not responded to your requests to solve a problem.</td>
                </tr>
              </tbody>
            </table>

            {/* --- HOW LONG WILL WE KEEP MY PERSONAL INFORMATION? --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">HOW LONG WILL WE KEEP MY PERSONAL INFORMATION?</h2>
            <p className="text-medium-gray">
              We only collect the information that we actually need. Some of that is information that you actively give us when you sign up for an account, register for an event, ask for customer support, or buy something from us. We store your name and contact information. GreyCampus will not retain any of your personal information for longer than required.
            </p>
            <p className="text-medium-gray font-semibold mt-4">We will keep your personal information:</p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-medium-gray">
              <li>For as long as required by law</li>
              <li>Until we no longer have a valid reason for keeping it</li>
              <li>Until you request us to stop using it.</li>
            </ul>
            <p className="text-medium-gray mt-4">
              We may keep just enough of your personal information to ensure that we comply with your requests not use your personal information or comply with your right to erasure. For example, we must keep your request to be erased even if it includes your personal data until such time as you are no longer our customer.
            </p>
            <p className="text-medium-gray mt-4">
              If you have questions about our Data Retention Policy, we can provide you a copy. Please contact <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">What if you chose not to give your personal information?</h3>
            <p className="text-medium-gray">
              If the personal information is necessary in order to supply products or services to you under a contract between you and GreyCampus, then we will not enter into that contract or provide the services or goods if you do not give us your personal information.
            </p>

            {/* --- OTHER DETAILS --- */}
            <h2 className="text-2xl font-bold text-dark-gray mt-10 mb-4 border-b pb-2">OTHER DETAILS</h2>
            
            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Children’s personal information</h3>
            <p className="text-medium-gray">
              Our products and services are not directed to individuals under 16. **GreyCampus does not knowingly collect personal information from children who are under 16 years of age.** If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information. If you believe that a child under 16 years has provided personal information to us, please write to <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a> with the details, and we will take the necessary steps to delete the information we hold about that child.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">How secure is your information</h3>
            <p className="text-medium-gray">
              At GreyCampus, we take data security very seriously. We have taken steps to implement **appropriate administrative, technical & physical safeguards** to prevent unauthorized access, use, modification, disclosure or destruction of the information you entrust to us. If you have any concerns regarding the security of your data, we encourage you to write to us at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a> with any questions.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Data Protection Officer</h3>
            <p className="text-medium-gray">
              We have appointed a **Data Protection Officer** to oversee our management of your personal information in accordance with this Privacy Policy. If you have any questions or concerns about our privacy practices with respect to your personal information, you can reach out to our Data Protection Officer by sending an email to <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a> or by writing to Data Protection Officer, GreyCampus Edutech Pvt. Ltd, II Floor, Block 1, My Home Hub, HITEC City, Madhapur, Hyderabad – 500081, India.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Do Not Track (DNT) requests</h3>
            <p className="text-medium-gray">
              Some internet browsers have enabled 'Do Not Track (DNT) features, which send out a signal (called the DNT signal) to the websites that you visit indicating that you don't wish to be tracked. Currently, there is no standard that governs what websites can or should do when they receive these signals. For now, **we do not take action in response to these signals.**
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Course Content</h3>
            <p className="text-medium-gray">
              Course content for all the online study programs is provided for the purpose of education and guidance only. The course content is regularly reviewed and is subjected to change without notice. GreyCampus reserves the right to modify training content without notice.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Copyright information</h3>
            <p className="text-medium-gray">
              You can electronically copy or take print of the website pages if it is being used for personal use only. GreyCampus holds the copyright to all the material on this website unless otherwise indicated. The written permission of the copyright holder must be obtained for any use of this material other than for purposes permitted by law.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Personal Information Policy</h3>
            <p className="text-medium-gray">
              You can contact us if you notice that the information we are holding is incorrect or incomplete. Please send us a mail to <a href="mailto:sales@greycampus.com" className="text-primary-green underline hover:no-underline">sales@greycampus.com</a>.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Image and Video Capture</h3>
            <p className="text-medium-gray">
              Any images captured during events organized and hosted by GreyCampus should not be misused. That includes pictures of GreyCampus staff and training participants. If you enrol in a GreyCampus course your picture may also be featured in photos or videos of the GreyCampus classes.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">External links on our websites</h3>
            <p className="text-medium-gray">
              Some pages of our websites may contain links to websites that are not linked to this Privacy Policy. If you submit your personal information to any of these third-party sites, your personal information is governed by their privacy policies. As a safety measure, we recommend that you not share any personal information with these third parties unless you've checked their privacy policies and assured yourself of their privacy practices.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Blogs and forums</h3>
            <p className="text-medium-gray">
              We offer publicly accessible blogs and resources on our websites. Please be aware that any information you provide on these blogs and forums may be used to contact you with unsolicited messages. We urge you to be cautious in disclosing personal information in our blogs and forums.
            </p>
            <p className="text-medium-gray">
              GreyCampus is not responsible for the personal information you elect to disclose publicly. Your posts and certain profile information may remain even after you terminate your account with GreyCampus. To request the removal of your information from our blogs and forums, you can contact us at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Social media widgets</h3>
            <p className="text-medium-gray">
              Our websites include social media widgets such as Facebook "like" buttons and Twitter "tweet" buttons that let you share articles and other information. These widgets may collect information such as your IP address and the pages you navigate in the website and may set a cookie to enable the widgets to function properly. Your interactions with these widgets are governed by the privacy policies of the companies providing them.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Compliance with this Privacy Policy</h3>
            <p className="text-medium-gray">
              We make every effort, including periodic reviews, to ensure that the personal information you provide is used in conformity with this Privacy Policy. If you have any concerns about our adherence to this Privacy Policy or the manner in which your personal information is used, kindly write to us at <a href="mailto:compliance@greycampus.com" className="text-primary-green underline hover:no-underline">compliance@greycampus.com</a>. We'll contact you, and if required, coordinate with the appropriate regulatory authorities to effectively address your concerns.
            </p>

            <h3 className="text-xl font-semibold text-dark-gray mt-6 mb-3">Notification of changes</h3>
            <p className="text-medium-gray">
              We may modify the Privacy Policy at any time, you are requested to check <a href="https://www.greycampus.com/privacy-policy" className="text-primary-green underline hover:no-underline">https://www.greycampus.com/privacy-policy</a> periodically to understand how your personal information is used.
            </p>
            
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}