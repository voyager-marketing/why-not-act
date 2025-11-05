'use client'

import {motion} from 'framer-motion'
import {Users, TrendingUp, MapPin, Quote} from 'lucide-react'
import {Card} from '@/components/ui/card'
import {useEffect, useState} from 'react'

interface Testimonial {
  quote: string
  perspective: string
  location: string
  highlightColor: string
}

export function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [supporterCount, setSupporterCount] = useState(0)

  const testimonials: Testimonial[] = [
    {
      quote: "I never thought I'd find common ground with people who disagree with me. This changed my perspective.",
      perspective: 'Center-Right Voter',
      location: 'Phoenix, AZ',
      highlightColor: 'from-orange-500 to-red-500',
    },
    {
      quote: "Finally, a platform that respects different viewpoints while showing us where we actually agree.",
      perspective: 'Progressive Activist',
      location: 'Portland, OR',
      highlightColor: 'from-blue-500 to-indigo-500',
    },
    {
      quote: "The data surprised me. I learned things about immigration I never knew—from my own perspective.",
      perspective: 'Independent Voter',
      location: 'Columbus, OH',
      highlightColor: 'from-purple-500 to-pink-500',
    },
  ]

  // Animate supporter count
  useEffect(() => {
    const target = 12847
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setSupporterCount(target)
        clearInterval(timer)
      } else {
        setSupporterCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const stats = [
    {
      icon: Users,
      value: supporterCount.toLocaleString(),
      label: 'Americans Engaged',
      color: 'text-purple-600',
    },
    {
      icon: MapPin,
      value: '50',
      label: 'States Represented',
      color: 'text-blue-600',
    },
    {
      icon: TrendingUp,
      value: '87%',
      label: 'Found Common Ground',
      color: 'text-green-600',
    },
  ]

  return (
    <section className="relative py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            What others are saying
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of Americans discovering new perspectives
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6, delay: 0.2}}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} aria-hidden="true" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6, delay: 0.4}}
          className="max-w-3xl mx-auto"
        >
          <Card className="relative p-8 md:p-12 bg-white dark:bg-gray-800 overflow-hidden">
            {/* Quote Icon */}
            <Quote className="absolute top-6 left-6 w-12 h-12 text-purple-200 dark:text-purple-900" aria-hidden="true" />

            {/* Testimonial Content */}
            <div className="relative z-10">
              <motion.div
                key={currentTestimonial}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.5}}
              >
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-1 h-12 bg-gradient-to-b ${testimonials[currentTestimonial].highlightColor} rounded-full`}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].perspective}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'w-8 bg-purple-600'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentTestimonial}
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Diversity Message */}
        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.6, delay: 0.6}}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <span className="font-semibold text-purple-700 dark:text-purple-300">
              All political perspectives welcome.
            </span>{' '}
            WhyNotAct is designed to bring Americans together, not divide them.
            Your voice matters, wherever you stand.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
