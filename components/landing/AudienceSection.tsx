'use client'

import {Users, Church, Building2, Home, Medal, Landmark, BookOpen} from 'lucide-react'
import Image from 'next/image'
import {motion} from 'framer-motion'
import {fadeInUp, staggerContainer, staggerContainerFast} from '@/lib/animations'

const audiences = [
  {
    icon: Users,
    label: 'Concerned Citizens',
    description: 'Across the political spectrum',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80',
  },
  {
    icon: Church,
    label: 'Faith Communities',
    description: 'All denominations welcome',
    imageUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600&q=80',
  },
  {
    icon: Building2,
    label: 'Businesses',
    description: 'Facing labor shortages',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    icon: Home,
    label: 'Immigrant Families',
    description: 'Seeking a path forward',
    imageUrl: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=80',
  },
  {
    icon: Medal,
    label: 'Veterans',
    description: 'Who served our nation',
    imageUrl: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80',
  },
  {
    icon: Landmark,
    label: 'Civic Leaders',
    description: 'Building communities',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80',
  },
  {
    icon: BookOpen,
    label: 'Policymakers',
    description: 'Seeking solutions',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  },
]

export function AudienceSection() {
  return (
    <section id="who-we-serve" className="py-20 md:py-28 bg-navy">
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
            Who We Serve
          </motion.span>
          <motion.h2
            className="heading-section text-3xl md:text-4xl lg:text-5xl text-white mb-4"
            variants={fadeInUp}
          >
            Who This Is For
          </motion.h2>
          <motion.p className="text-lg text-gray-400 max-w-2xl" variants={fadeInUp}>
            WhyNotAct is for everyone who believes in finding common ground.
          </motion.p>
        </motion.div>

        {/* Audience Grid - First Row (4 items) */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainerFast}
        >
          {audiences.slice(0, 4).map((audience) => {
            const Icon = audience.icon
            return (
              <motion.div
                key={audience.label}
                className="relative h-64 md:h-80 group overflow-hidden"
                variants={fadeInUp}
              >
                <Image
                  src={audience.imageUrl}
                  alt={audience.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy/70 group-hover:bg-brand-600/80 transition-colors duration-300" />
                {/* Content - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                  <Icon className="w-10 h-10 md:w-14 md:h-14 text-brand-400 mb-4" />
                  <h3 className="text-white font-bold uppercase text-base md:text-xl tracking-wide mb-2">
                    {audience.label}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base">
                    {audience.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Audience Grid - Second Row (3 items full width) */}
        <motion.div
          className="grid grid-cols-3 gap-1"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, margin: '-50px'}}
          variants={staggerContainerFast}
        >
          {audiences.slice(4, 7).map((audience) => {
            const Icon = audience.icon
            return (
              <motion.div
                key={audience.label}
                className="relative h-64 md:h-80 group overflow-hidden"
                variants={fadeInUp}
              >
                <Image
                  src={audience.imageUrl}
                  alt={audience.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-navy/70 group-hover:bg-brand-600/80 transition-colors duration-300" />
                {/* Content - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                  <Icon className="w-10 h-10 md:w-14 md:h-14 text-brand-400 mb-4" />
                  <h3 className="text-white font-bold uppercase text-base md:text-xl tracking-wide mb-2">
                    {audience.label}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base">
                    {audience.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          className="mt-12 text-center"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.5, delay: 0.2}}
        >
          <p className="text-lg text-gray-400">
            <span className="font-bold text-brand-400">All political perspectives welcome.</span>{' '}
            Our goal is to find solutions that work for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
