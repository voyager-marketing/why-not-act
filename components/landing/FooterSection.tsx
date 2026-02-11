'use client'

import {ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

const footerLinks = {
  main: [
    {label: 'About Us', href: '#about'},
    {label: 'Our Solution', href: '#solution'},
    {label: 'FAQs', href: '#faqs'},
    {label: 'Get Involved', href: '#get-involved'},
  ],
  legal: [
    {label: 'Privacy Policy', href: '/privacy'},
    {label: 'Terms of Service', href: '/terms'},
    {label: 'Contact', href: 'mailto:info@whynotact.org'},
  ],
}

export function FooterSection() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      {/* CTA Banner */}
      <div className="bg-brand-600 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide mb-4">
            Ready to Find Common Ground?
          </h3>
          <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
            Your perspective matters. Take 5 minutes to discover how immigration reform
            can work from your point of view.
          </p>
          <Link href="/start">
            <Button className="bg-white text-brand-700 hover:bg-gray-100 font-bold uppercase tracking-wide px-8 py-6 text-lg rounded-none">
              Start Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <div>
                  <span className="font-bold text-xl uppercase tracking-wide block">
                    WhyNotAct
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    .org
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
                A nonpartisan nonprofit dedicated to exploring practical, humane, and economically
                sound solutions to immigration.
              </p>
              <p className="text-sm text-brand-400 font-bold uppercase tracking-wide mb-4">
                Powered by data and empathy.
              </p>
              <p className="text-gray-400 text-sm">
                Contact us:{' '}
                <a
                  href="mailto:info@whynotact.org"
                  className="text-brand-400 hover:text-brand-300 underline"
                >
                  info@whynotact.org
                </a>
              </p>
            </div>

            {/* Main Links */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wide mb-6">
                Explore
              </h5>
              <ul className="space-y-3">
                {footerLinks.main.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wide mb-6">
                Legal
              </h5>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} WhyNotAct.org. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              Made in America
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
