'use client'

import {HeroSection} from '@/components/HeroSection'
import {
  NavigationBar,
  WhyWeExistSection,
  ProblemSection,
  SolutionSection,
  HowItWorksSection,
  AudienceSection,
  AboutSection,
  GetInvolvedSection,
  FAQSection,
  ReferencesSection,
  FooterSection,
} from '@/components/landing'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Sticky Navigation */}
      <NavigationBar />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Why We Exist */}
      <WhyWeExistSection />

      {/* Section 3: The Problem */}
      <ProblemSection />

      {/* Section 4: The Solution */}
      <SolutionSection />

      {/* Section 5: How It Works */}
      <HowItWorksSection />

      {/* Section 6: Who This Is For */}
      <AudienceSection />

      {/* Section 7: About */}
      <AboutSection />

      {/* Section 9: Get Involved */}
      <GetInvolvedSection />

      {/* Section 10: FAQs */}
      <FAQSection />

      {/* Section 11: References */}
      <ReferencesSection />

      {/* Section 12: Footer */}
      <FooterSection />
    </main>
  )
}
