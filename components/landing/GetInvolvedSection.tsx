'use client'

import {useState} from 'react'
import {Mail, Handshake, Heart, Share2, Users, ArrowRight, Check} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {motion} from 'framer-motion'
import {fadeInUp, staggerContainer} from '@/lib/animations'

const involvementOptions = [
  {
    icon: Handshake,
    title: 'Partner With Us',
    description: 'Organizations, churches, nonprofits, and businesses can join our coalition.',
    cta: 'Become a Partner',
  },
  {
    icon: Users,
    title: 'Volunteer',
    description: 'Help spread the message and support our community outreach efforts.',
    cta: 'Join as Volunteer',
  },
  {
    icon: Heart,
    title: 'Donate',
    description: 'Support our mission with a tax-deductible contribution.',
    cta: 'Make a Donation',
    comingSoon: true,
  },
  {
    icon: Share2,
    title: 'Share the Path',
    description: 'Help others discover WhyNotAct by sharing on social media.',
    cta: 'Share Now',
  },
]

export function GetInvolvedSection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email signup
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail('')
  }

  return (
    <section id="get-involved" className="py-20 md:py-28 bg-navy">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          variants={staggerContainer}
        >
          <motion.span
            className="section-label text-brand-400 mb-4 block"
            variants={fadeInUp}
          >
            Take Action
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            variants={fadeInUp}
          >
            Get Involved
          </motion.h2>
          <motion.p className="text-lg text-gray-400 max-w-2xl" variants={fadeInUp}>
            There are many ways to support the movement for practical immigration reform
          </motion.p>
        </motion.div>

        {/* Email Signup */}
        <motion.div
          className="bg-white/10 border-l-4 border-brand-600 p-8 md:p-10 mb-12"
          initial={{opacity: 0, x: -30}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true, margin: '-50px'}}
          transition={{duration: 0.6}}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="shrink-0">
              <div className="w-16 h-16 bg-brand-600 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                Join the Movement
              </h3>
              <p className="text-gray-400 mb-4">
                Get updates on our progress, new resources, and opportunities to take action.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 rounded-none"
                />
                <Button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold uppercase tracking-wide rounded-none whitespace-nowrap"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Involvement Options */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/20"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainer}
        >
          {involvementOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <motion.div
                key={index}
                className="border-r border-b border-white/20 p-6 md:p-8 group hover:bg-white/5 transition-colors"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-brand-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                  {option.title}
                  {option.comingSoon && (
                    <span className="ml-2 text-xs bg-brand-600/50 text-brand-200 px-2 py-1">
                      Soon
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {option.description}
                </p>
                <button
                  className="text-brand-400 hover:text-brand-300 font-bold uppercase tracking-wide text-sm inline-flex items-center disabled:opacity-50"
                  disabled={option.comingSoon}
                >
                  {option.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social Share Section */}
        <motion.div
          className="mt-12 bg-brand-600 p-8 md:p-10"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.2}}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2">
                Spread the Word
              </h3>
              <p className="text-brand-100">
                Share WhyNotAct with your network and help us find common ground.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=Discover%20a%20new%20approach%20to%20immigration%20reform%20at%20WhyNotAct.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Share on Twitter</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://whynotact.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Share on Facebook</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/shareArticle?mini=true&url=https://whynotact.org&title=WhyNotAct%20-%20A%20New%20Approach%20to%20Immigration"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Share on LinkedIn</span>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
