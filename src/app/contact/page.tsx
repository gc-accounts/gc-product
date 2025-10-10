'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Form state management
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  company: string;
  department: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    company: '',
    department: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Form validation
  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Clear form after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          countryCode: '+91',
          phoneNumber: '',
          company: '',
          department: '',
          message: ''
        });
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="contact" />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-10 sm:py-15 lg:py-20 bg-gradient-to-br from-off-white via-white to-green-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight">
                Get in Touch
              </h1>
              <p className="text-sm lg:text-lg text-medium-gray mx-auto leading-relaxed max-w-8xl">
                Have questions about our bootcamps? Need career guidance? We&apos;re here to help you transform your career.
              </p>
              </div>
          </div>
        </section>

        {/* Contact Form & Details Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Left Section - Contact Form */}
                  <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray">Contact Us</h2>
                  <p className="text-lg text-medium-gray leading-relaxed">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>
                
                <Card className="bg-white shadow-xl border-0 w-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-dark-gray">
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 px-6 pb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* First Row - First Name and Last Name */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-dark-gray">First Name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className={`h-11 ${formErrors.firstName ? 'border-red-500' : ''}`}
                          />
                          {formErrors.firstName && (
                            <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-dark-gray">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className={`h-11 ${formErrors.lastName ? 'border-red-500' : ''}`}
                          />
                          {formErrors.lastName && (
                            <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Second Row - Email, Country Code, Phone */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-dark-gray">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`h-11 ${formErrors.email ? 'border-red-500' : ''}`}
                          />
                          {formErrors.email && (
                            <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="countryCode" className="text-sm font-medium text-dark-gray">Country</Label>
                          <Select value={formData.countryCode} onValueChange={(value) => handleInputChange('countryCode', value)}>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="+91">🇮🇳 +91</SelectItem>
                              <SelectItem value="+1">🇺🇸 +1</SelectItem>
                              <SelectItem value="+44">🇬🇧 +44</SelectItem>
                              <SelectItem value="+49">🇩🇪 +49</SelectItem>
                              <SelectItem value="+33">🇫🇷 +33</SelectItem>
                              <SelectItem value="+81">🇯🇵 +81</SelectItem>
                              <SelectItem value="+86">🇨🇳 +86</SelectItem>
                              <SelectItem value="+61">🇦🇺 +61</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="text-sm font-medium text-dark-gray">Phone</Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Phone number"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className={`h-11 ${formErrors.phoneNumber ? 'border-red-500' : ''}`}
                          />
                          {formErrors.phoneNumber && (
                            <p className="text-xs text-red-500 mt-1">{formErrors.phoneNumber}</p>
                          )}
                        </div>
                      </div>

                      {/* Third Row - Company and Department */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-medium text-dark-gray">Company</Label>
                          <Input
                            id="company"
                            type="text"
                            placeholder="Your company"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-sm font-medium text-dark-gray">Department</Label>
                          <Input
                            id="department"
                            type="text"
                            placeholder="Your department"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            className="h-11"
                          />
                        </div>
                      </div>

                      {/* Fourth Row - Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium text-dark-gray">Message</Label>
                        <textarea
                          id="message"
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={4}
                          className={`w-full px-3 py-2 border border-input bg-background rounded-md text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none ${formErrors.message ? 'border-red-500' : ''}`}
                        />
                        {formErrors.message && (
                          <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-green hover:bg-secondary-green text-white py-3 h-12 text-lg font-semibold"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      
                      {submitSuccess && (
                        <div className="text-center text-green-600 font-medium text-sm">
                          ✓ Message sent successfully! We&apos;ll get back to you soon.
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Section - Contact Details */}
                  <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-bold text-dark-gray">Contact Details</h2>
                  <p className="text-lg text-medium-gray leading-relaxed">
                    Reach out to us through any of these channels.
                  </p>
                </div>
                
                {/* Contact Information Cards */}
                <div className="space-y-6">
                  {/* Address */}
                  <Card className="bg-white border border-border-gray hover:border-primary-green hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary-green" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-dark-gray mb-2">Office Address</h3>
                          <p className="text-sm text-medium-gray leading-relaxed">
                            GreyCampus Edutech Private Limited,<br />
                            Aikya Vihar, Plot 218, B Block,<br />
                            Kavuri Hills Phase - II,<br />
                            Hyderabad - 500033
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone */}
                  <Card className="bg-white border border-border-gray hover:border-primary-green hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center">
                            <Phone className="w-6 h-6 text-primary-green" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-dark-gray mb-2">Phone Number</h3>
                          <p className="text-sm text-medium-gray">+91 935 501 1033</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email */}
                  {/* Email */}
                  <Card className="bg-white border border-border-gray hover:border-primary-green hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary-green/10 rounded-lg flex items-center justify-center">
                            <Mail className="w-6 h-6 text-primary-green" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-dark-gray mb-2">Email Address</h3>
                          <p className="text-sm text-medium-gray">contact@greycampus.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Google Map */}
                <div className="mt-8">
                  <Card className="bg-white border border-border-gray overflow-hidden">
                    <CardContent className="p-0">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.123456789!2d78.3456789!3d17.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99dac93a348d%3A0xc9039baf28225324!2sKavuri%20Hills%2C%20Madhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="GreyCampus Office Location"
                      ></iframe>
                    </CardContent>
                  </Card>
                  <div className="mt-3">
                    <a
                      href="https://www.google.com/maps/place/Kavuri+Hills,+Madhapur,+Hyderabad,+Telangana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-green hover:text-secondary-green text-sm font-medium transition-colors"
                    >
                      View larger map →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </main>
      
      <Footer />
    </div>
  );
}
