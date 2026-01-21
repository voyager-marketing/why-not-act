'use client'

import Image from 'next/image'
import {Quote} from 'lucide-react'
import {motion} from 'framer-motion'
import {AnimatedCounter} from '@/components/AnimatedCounter'
import {fadeInUp, staggerContainer} from '@/lib/animations'

interface Testimonial {
  quote: string
  name: string
  perspective: string
  location: string
  avatarUrl: string
}

const testimonials: Testimonial[] = [
  {
    quote: "This is an absolutely wonderful approach... beautifully conceived and worth pursuing.",
    name: 'Michael R.',
    perspective: 'Policy Reviewer',
    location: 'Washington, D.C.',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    quote: "It just makes sense. Practical, innovative, and economically smart.",
    name: 'Sarah T.',
    perspective: 'Business Leader',
    location: 'Austin, TX',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    quote: "A solution both sides could finally get behind. This changed my perspective.",
    name: 'James P.',
    perspective: 'Independent Voter',
    location: 'Columbus, OH',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
  },
]

const stats = [
  {value: '12,847', label: 'Americans Engaged'},
  {value: '50', label: 'States Represented'},
  {value: '87%', label: 'Found Common Ground'},
]

export function SocialProof() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-100px'}}
          variants={staggerContainer}
        >
          <motion.span className="section-label mb-4 block" variants={fadeInUp}>
            Testimonials
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-navy mb-4"
            variants={fadeInUp}
          >
            What Others Are Saying
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Join thousands of Americans discovering new perspectives
          </motion.p>
        </motion.div>

        {/* Testimonial Grid - Static, no carousel */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="border-l-4 border-brand-600 bg-gray-50 p-8"
              variants={fadeInUp}
            >
              <Quote className="w-8 h-8 text-brand-300 mb-4" />
              <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="object-cover"
                />
                <div>
                  <span className="font-bold text-navy block">
                    {testimonial.name}
                  </span>
                  <span className="text-sm text-gray-600 uppercase tracking-wide">
                    {testimonial.perspective}
                  </span>
                  <span className="text-sm text-gray-500 block">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <AnimatedCounter
                value={stat.value}
                className="block text-4xl md:text-5xl font-bold text-navy"
                delay={index * 150}
              />
              <span className="block text-sm uppercase tracking-wide text-gray-600 mt-2">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
