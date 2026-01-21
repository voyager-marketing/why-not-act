'use client'

import {useState} from 'react'
import {Menu, X, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

const navLinks = [
  {label: 'Mission', href: '#mission'},
  {label: 'The Problem', href: '#problem'},
  {label: 'Solution', href: '#solution'},
  {label: 'How It Works', href: '#how-it-works'},
  {label: 'About', href: '#about'},
  {label: 'FAQs', href: '#faqs'},
]

export function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <>
      <nav className="bg-navy text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">W</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-lg uppercase tracking-wide block leading-tight">
                  WhyNotAct
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  .org
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm uppercase tracking-wide font-medium text-gray-300 hover:text-brand-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link href="/start">
                <Button className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-5 font-bold uppercase tracking-wide rounded-none">
                  Start Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-brand-400"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-3 text-left text-sm uppercase tracking-wide font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 mt-4 border-t border-white/10">
                  <Link href="/start" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold uppercase tracking-wide rounded-none">
                      Start Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
