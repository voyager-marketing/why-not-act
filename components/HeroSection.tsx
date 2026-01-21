'use client'

import {Button} from '@/components/ui/button'
import {ArrowRight, Users, MapPin, TrendingUp, Shield} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {AnimatedCounter} from '@/components/AnimatedCounter'
import {fadeInUp, staggerContainer} from '@/lib/animations'

const stats = [
  {value: '12,847', label: 'Americans Engaged', icon: Users},
  {value: '50', label: 'States Represented', icon: MapPin},
  {value: '87%', label: 'Found Common Ground', icon: TrendingUp},
  {value: '100%', label: 'Anonymous & Secure', icon: Shield},
]

export function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-navy overflow-hidden">
        {/* Background - Diverse American families */}
        <div className="absolute inset-0">
          <Image
            src="/people-raising-usa-flags-in-the-air-2026-01-05-01-09-47-utc.jpg"
            alt="People raising American flags in the air"
            fill
            className="object-cover"
            priority
          />

          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-navy/65" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Section Label */}
            <motion.span
              className="section-label text-brand-400 mb-6 block"
              variants={fadeInUp}
            >
              A New Approach to Immigration
            </motion.span>

            {/* Main Headline */}
            <motion.h1
              className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1]"
              variants={fadeInUp}
            >
              What if immigration could create{' '}
              <span className="text-brand-400">opportunity</span>{' '}
              instead of conflict?
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Your perspective matters. Take 5 minutes to explore a practical,
              data-driven approach to immigration reform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Link href="/start">
                <Button
                  size="lg"
                  className="group bg-brand-600 hover:bg-brand-700 text-white px-10 py-6 text-lg font-bold uppercase tracking-wide rounded-none"
                  aria-label="Start your path to understanding immigration solutions"
                >
                  Start Your Path
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white! hover:bg-white hover:text-navy! px-10 py-6 text-lg font-bold uppercase tracking-wide rounded-none"
                >
                  Learn More
                </Button>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>100% Anonymous</span>
              </div>
              <div className="w-px h-4 bg-gray-600 hidden sm:block" />
              <span>No Registration Required</span>
              <div className="w-px h-4 bg-gray-600 hidden sm:block" />
              <span>Takes 5 Minutes</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Angled bottom divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-white"
          style={{clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'}}
        />
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b-4 border-brand-600">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: '-50px'}}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className="py-8 px-6 text-center border-r border-gray-200 last:border-r-0"
                  variants={fadeInUp}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 text-brand-600" />
                  <AnimatedCounter
                    value={stat.value}
                    className="block text-3xl md:text-4xl font-bold text-navy"
                    delay={index * 100}
                  />
                  <span className="block text-xs md:text-sm uppercase tracking-wide text-gray-600 mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </>
  )
}
