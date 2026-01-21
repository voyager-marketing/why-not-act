'use client'

import {Users, Target, Lightbulb, Heart} from 'lucide-react'
import Image from 'next/image'
import {motion} from 'framer-motion'
import {fadeInUp, slideInLeft, slideInRight, staggerContainer} from '@/lib/animations'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To bridge political divides and find practical, humane solutions to immigration that work for all Americans.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    description: 'An America where immigration policy reflects our shared values of opportunity, fairness, and the rule of law.',
  },
  {
    icon: Heart,
    title: 'Our Approach',
    description: 'Powered by data and empathy. We listen first, present facts, and help you see solutions through your own lens.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          variants={staggerContainer}
        >
          <motion.span className="section-label mb-4 block" variants={fadeInUp}>
            Who We Are
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-navy mb-4"
            variants={fadeInUp}
          >
            About WhyNotAct
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl" variants={fadeInUp}>
            A nonpartisan nonprofit dedicated to transforming how America approaches immigration
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-0 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainer}
        >
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                className="border-l-4 border-brand-600 bg-gray-50 p-8"
                variants={fadeInUp}
              >
                <Icon className="w-8 h-8 text-brand-600 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-navy mb-3 uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image */}
          <motion.div
            className="relative h-64 lg:h-auto min-h-[300px]"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
            variants={slideInLeft}
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
              alt="Diverse group of Americans"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy/40" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-brand-600 p-4"
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: 0.3}}
            >
              <span className="text-white font-bold uppercase tracking-wide">
                Our Story
              </span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="bg-navy p-8 lg:p-12 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-100px'}}
            variants={slideInRight}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-brand-600 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                Founded on Common Ground
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              WhyNotAct was founded on a simple belief: that Americans of all political persuasions
              can find common ground on immigration when presented with facts, not fear. Our founder
              saw an opportunity to move beyond the endless cycle of polarization and inaction.
            </p>
            <div className="border-l-4 border-brand-600 pl-4">
              <p className="text-brand-400 font-medium uppercase tracking-wide text-sm">
                More about our team, board, and advisors coming soon.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
