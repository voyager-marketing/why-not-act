'use client'

import {Users, Clock, DollarSign, TrendingUp, Home, Heart, Vote} from 'lucide-react'
import {motion} from 'framer-motion'
import {AnimatedCounter} from '@/components/AnimatedCounter'
import {fadeInUp, staggerContainer, staggerContainerFast} from '@/lib/animations'

const stats = [
  {
    icon: Users,
    value: '11M+',
    label: 'Undocumented immigrants',
    description: 'living in the United States',
  },
  {
    icon: Clock,
    value: '66%',
    label: 'Long-term residents',
    description: 'have lived here 10+ years',
  },
  {
    icon: DollarSign,
    value: '$11.7B',
    label: 'State & local taxes',
    description: 'paid annually',
  },
  {
    icon: TrendingUp,
    value: '$97B',
    label: 'Federal taxes',
    description: 'contributed annually',
  },
  {
    icon: Home,
    value: '$315B+',
    label: 'Deportation cost',
    description: 'estimated total expense',
    highlight: true,
  },
  {
    icon: Heart,
    value: '4.4M',
    label: 'U.S.-citizen children',
    description: 'with undocumented parent',
  },
  {
    icon: Vote,
    value: '72%',
    label: 'Americans support',
    description: 'a path to legal status',
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="bg-navy py-20 md:py-28">
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
            The Challenge
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            variants={fadeInUp}
          >
            Understanding the Numbers
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl"
            variants={fadeInUp}
          >
            Real data about immigration in America. These numbers represent real
            people, real families, and real economic impact.
          </motion.p>
        </motion.div>

        {/* Stats Grid - First Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 border border-white/20 mb-1"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainerFast}
        >
          {stats.slice(0, 4).map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="p-6 md:p-8 border-r border-white/20 last:border-r-0 text-center md:text-left"
                variants={fadeInUp}
              >
                <Icon className="w-6 h-6 text-brand-400 mb-4 mx-auto md:mx-0" />
                <AnimatedCounter
                  value={stat.value}
                  className="block text-3xl md:text-4xl lg:text-5xl font-bold text-brand-400 mb-2"
                  delay={index * 100}
                />
                <span className="block text-sm uppercase tracking-wide text-white font-medium mb-1">
                  {stat.label}
                </span>
                <span className="block text-xs text-gray-500">
                  {stat.description}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Grid - Second Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 border border-white/20 border-t-0"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainerFast}
        >
          {stats.slice(4, 7).map((stat, index) => {
            const Icon = stat.icon
            const isHighlight = stat.highlight
            return (
              <motion.div
                key={index + 4}
                className={`p-6 md:p-8 border-r border-white/20 last:border-r-0 text-center md:text-left ${
                  isHighlight ? 'bg-red-900/20' : ''
                }`}
                variants={fadeInUp}
              >
                <Icon
                  className={`w-6 h-6 mb-4 mx-auto md:mx-0 ${
                    isHighlight ? 'text-red-400' : 'text-brand-400'
                  }`}
                />
                <AnimatedCounter
                  value={stat.value}
                  className={`block text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${
                    isHighlight ? 'text-red-400' : 'text-brand-400'
                  }`}
                  delay={index * 100}
                />
                <span className="block text-sm uppercase tracking-wide text-white font-medium mb-1">
                  {stat.label}
                </span>
                <span className="block text-xs text-gray-500">
                  {stat.description}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Emphasized Bottom Message */}
        <motion.div
          className="mt-16 md:mt-20 py-12 md:py-16 px-8 md:px-12 bg-brand-600/10 border-l-4 border-brand-500 relative overflow-hidden"
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-50px'}}
          transition={{duration: 0.6, delay: 0.2}}
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl leading-tight relative z-10">
            The cost of inaction grows every year.
          </p>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl relative z-10">
            Mass deportation would devastate communities and cost hundreds of billions.
            <span className="text-brand-400 font-semibold"> There is a better way forward.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
