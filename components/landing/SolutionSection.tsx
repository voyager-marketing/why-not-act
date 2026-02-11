'use client'

import {
  Shield,
  DollarSign,
  Users,
  Scale,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'
import Image from 'next/image'
import {motion} from 'framer-motion'
import {fadeInUp, staggerContainer} from '@/lib/animations'

const pillars = [
  {
    icon: DollarSign,
    number: '01',
    title: 'A Clear, Enforceable Path Into the System',
    description:
      'Undocumented individuals must self-identify and pay a $30,000 fine to begin the process. This acknowledges the violation, generates revenue, and brings people out of the shadows.',
  },
  {
    icon: Shield,
    number: '02',
    title: 'Firm Consequences for Serious Crime',
    description:
      'Anyone convicted of a violent crime, drug trafficking, or gang activity is immediately deported. No exceptions. This is not amnesty. This is accountability.',
  },
  {
    icon: Users,
    number: '03',
    title: 'Integration, Not Just Legal Status',
    description:
      'Mandatory ESL and civics training ensures participants integrate into American society, not just live alongside it. Assimilation matters.',
  },
  {
    icon: Scale,
    number: '04',
    title: 'Smarter Enforcement, Lower Costs',
    description:
      'ICE focuses exclusively on criminals and national security threats. No more wasted resources chasing workers and families. Better results at a fraction of the cost.',
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Service as an Alternative Path',
    description:
      'For those who cannot pay the fine, 2-4 years of AmeriCorps or military service offers a path to earn legal status. Contribution over entitlement.',
  },
  {
    icon: CheckCircle,
    number: '06',
    title: 'Replace Uncertainty and Chaos with Order',
    description:
      'The current system is chaotic. This plan creates a predictable, accountable process where everyone knows the rules and consequences.',
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80"
          alt="American landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-24 md:py-32">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
            variants={staggerContainer}
          >
            <motion.span
              className="section-label text-brand-400 mb-4 block"
              variants={fadeInUp}
            >
              Our Solution
            </motion.span>
            <motion.h2
              className="heading-section text-3xl md:text-4xl lg:text-5xl text-white mb-6"
              variants={fadeInUp}
            >
              Six Pillars of Reform
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              A practical framework that balances accountability with opportunity,
              designed to work for Americans across the political spectrum.
            </motion.p>
          </motion.div>

          {/* Pillars Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-50px'}}
            variants={{
              hidden: {opacity: 0},
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.number}
                  className="group relative"
                  variants={{
                    hidden: {opacity: 0, y: 40},
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {duration: 0.5, ease: [0.25, 0.1, 0.25, 1]},
                    },
                  }}
                >
                  {/* Card */}
                  <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                    {/* Number Badge */}
                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-brand-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-6 pt-4">
                      <div className="w-14 h-14 bg-brand-600/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-brand-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom Emphasis - Cost Comparison */}
          <motion.div
            className="mt-20 md:mt-24"
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: 0.3}}
          >
            <div className="bg-brand-600 p-10 md:p-16">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-white/80 text-sm md:text-base font-bold uppercase tracking-wider block mb-4">
                  The Bottom Line
                </span>
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                  $315B+
                </div>
                <p className="text-xl md:text-2xl text-white/90 mb-4">
                  saved compared to mass deportation
                </p>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
                  Instead of costing taxpayers hundreds of billions, this approach{' '}
                  <span className="text-white font-semibold">generates revenue</span>{' '}
                  through fines and increased tax contributions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
