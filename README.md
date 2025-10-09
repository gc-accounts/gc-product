# Greycampus Data Science Bootcamp Landing Page

A modern, premium landing page for Greycampus Data Science Bootcamp built with Next.js 14, Tailwind CSS, and shadcn/ui.

## 🚀 Features

### ✅ Complete Implementation
- **13+ Sections**: Hero, Why Choose, Why Learn, Careers, Hiring Organizations, Curriculum, Outcomes, Projects, How to Enroll, Pricing, Enrollment Form, Testimonials, FAQ, and Footer
- **Responsive Design**: Mobile-first approach with breakpoints for mobile, tablet, and desktop
- **Modern UI**: Clean, contemporary design with green-based color psychology
- **Interactive Elements**: Forms, carousels, accordions, tabs, and smooth animations

### 🎨 Design System
- **Color Palette**: Primary green (#10B981), secondary green (#059669), accent gold (#F59E0B), accent blue (#3B82F6)
- **Typography**: Inter font family with proper hierarchy (H1: 48-56px, H2: 32-40px, etc.)
- **Spacing**: 8px grid system with consistent padding and margins
- **Components**: Cards, buttons, forms with consistent styling and hover effects

### 🛠️ Technical Stack
- **Framework**: Next.js 14 with React 18+
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui (Button, Card, Input, Label, Select, Tabs, Accordion)
- **Animations**: Framer Motion for smooth, subtle animations
- **Icons**: Lucide React for consistent iconography
- **TypeScript**: Full type safety throughout the application

### 📱 Responsive Features
- **Mobile Navigation**: Hamburger menu with smooth transitions
- **Grid Layouts**: Responsive grids that adapt to screen size
- **Form Optimization**: Mobile-friendly form layouts
- **Touch Interactions**: Optimized for touch devices

### 🎯 Conversion Features
- **Multiple CTAs**: Strategic placement of enrollment buttons
- **Social Proof**: Testimonials, company logos, success stories
- **Value Proposition**: Clear pricing comparison (₹5,000 vs ₹15,000+)
- **Trust Signals**: Money-back guarantee, placement statistics
- **Lead Capture**: Two registration forms with validation

### ♿ Accessibility
- **WCAG 2.1 AA Compliant**: Proper contrast ratios, focus states
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Focus Management**: Visible focus indicators

### 🔍 SEO Optimized
- **Meta Tags**: Comprehensive meta tags for social sharing
- **Structured Data**: Ready for schema markup implementation
- **Performance**: Optimized images and code splitting
- **Semantic HTML**: Proper HTML structure for search engines

## 📋 Sections Overview

1. **Hero Section**: Main value proposition with registration form
2. **Why Choose Greycampus**: 6 feature cards highlighting benefits
3. **Why Learn Data Science**: Statistics and market insights
4. **Careers After Bootcamp**: Career paths with salary information
5. **Hiring Organizations**: Scrolling company logos
6. **Curriculum**: Tabbed interface with detailed course modules
7. **After Course Outcomes**: 10 skills students will gain
8. **Projects**: 3 real-world project showcases
9. **How to Enroll**: 5-step enrollment process
10. **Pricing**: Main pricing card with cohort dates
11. **Enrollment Form**: Secondary form with taglines
12. **Testimonials**: Success stories with ratings
13. **FAQ**: Categorized frequently asked questions
14. **Footer**: Links, newsletter signup, and company info

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd data-science-bootcamp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors
Update the color variables in `src/app/globals.css`:
```css
:root {
  --primary-green: #10B981;
  --secondary-green: #059669;
  --accent-gold: #F59E0B;
  --accent-blue: #3B82F6;
  /* ... other colors */
}
```

### Content
- **Testimonials**: Update in the `TestimonialsSection` component
- **Pricing**: Modify in the `PricingSection` component
- **FAQ**: Edit in the `FAQSection` component
- **Company Logos**: Update in the `HiringOrganizationsSection` component

### Forms
- **Validation**: Customize in the `validateForm` function
- **Submission**: Ready for API integration in `handleFormSubmit`
- **Fields**: Add/remove fields in form components

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px (single column layouts)
- **Tablet**: 641px - 1024px (2-column grids)
- **Desktop**: 1025px+ (3+ column grids, max-width 1280px)

## 🎯 Performance Features

- **Code Splitting**: Dynamic imports for heavy components
- **Image Optimization**: Next.js Image component ready
- **Lazy Loading**: Intersection Observer for animations
- **Bundle Optimization**: Tree shaking and minification

## 🔧 Form Integration

The forms are ready for backend integration:

```typescript
// Form submission handler
const handleFormSubmit = async (formData: FormData, formType: 'hero' | 'enrollment') => {
  // Validate form
  const errors = validateForm(formData);
  if (Object.keys(errors).length > 0) return;
  
  // Submit to API
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  // Handle response
};
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy with one click

### Other Platforms
- **Netlify**: Compatible with static export
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment ready

## 📊 Analytics Ready

The page is ready for analytics integration:
- **Google Analytics**: Add tracking code
- **Hotjar**: User behavior tracking
- **Conversion Tracking**: Form submissions, button clicks
- **A/B Testing**: Easy to implement with feature flags

## 🛡️ Security

- **Form Validation**: Client-side and server-side ready
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: Ready for implementation
- **Input Sanitization**: Form data sanitization ready

## 📈 Future Enhancements

- **Payment Integration**: Stripe/PayPal integration
- **Live Chat**: Customer support widget
- **Video Testimonials**: Embedded video content
- **Interactive Demos**: Code playground
- **Multi-language**: Internationalization support
- **Dark Mode**: Theme switching capability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: support@greycampus.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**Built with ❤️ for Greycampus Data Science Bootcamp**