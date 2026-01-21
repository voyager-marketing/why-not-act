'use client'

import {Compass, MessageSquare, Sparkles, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {fadeInUp, staggerContainer} from '@/lib/animations'

const steps = [
  {
    number: 1,
    icon: Compass,
    title: 'Choose Your Perspective',
    subtitle: 'Everyone comes to this issue with different priorities.',
    description:
      "Start where you stand - whether your focus is security, balance, or inclusion. There's no \"right\" answer here, just clarity.",
  },
  {
    number: 2,
    icon: MessageSquare,
    title: 'Answer a Few Questions',
    subtitle: 'About five minutes of your time.',
    description:
      "We'll ask thoughtful, plain-language questions about what matters most to you - things like safety, fairness, cost, and community impact. No trick questions. No pressure.",
  },
  {
    number: 3,
    icon: Sparkles,
    title: 'See a Customized Solution',
    subtitle: 'Solutions that meet reality.',
    description:
      "Based on your answers, you'll see how the proposed reform can work within your values, not against them. The goal isn't to change your mind - it's to show what's possible.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          variants={staggerContainer}
        >
          <motion.span className="section-label mb-4 block" variants={fadeInUp}>
            Learn How It Works
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-navy mb-6"
            variants={fadeInUp}
          >
            Immigration Reform Doesn&apos;t Have to Be One-Size-Fits-All
          </motion.h2>
          <motion.p className="text-lg text-gray-600" variants={fadeInUp}>
            Our tool helps you explore how a practical solution can work from your point of
            view - without arguing, labeling, or oversimplifying.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-0 border-t border-l border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainer}
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="border-r border-b border-gray-200 p-8 md:p-10 relative group hover:bg-gray-50 transition-colors"
                variants={fadeInUp}
                custom={index}
              >
                {/* Step Number */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8">
                  <span className="text-6xl md:text-7xl font-bold text-gray-100 group-hover:text-brand-100 transition-colors">
                    {String(step.number).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className="w-14 h-14 bg-brand-600 flex items-center justify-center mb-6"
                    initial={{scale: 0.8, opacity: 0}}
                    whileInView={{scale: 1, opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.4, delay: 0.2 + index * 0.1}}
                  >
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-navy mb-2 uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-brand-600 font-medium mb-3 text-sm">
                    {step.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.4}}
        >
          <Link href="/start">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white px-10 py-6 text-lg font-bold uppercase tracking-wide rounded-none">
              Start Your Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No email. No tracking. Just perspective.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
