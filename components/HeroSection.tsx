'use client'

import {motion} from 'framer-motion'
import {Button} from '@/components/ui/button'
import {ArrowRight, Sparkles} from 'lucide-react'

interface HeroSectionProps {
  onStartClick: () => void
}

export function HeroSection({onStartClick}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-400/10 to-fuchsia-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
        >
          {/* Badge */}
          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 0.2}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              A New Way to Understand Immigration
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.3}}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              What if immigration reform
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              could unite America?
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.5}}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            <span className="font-semibold text-gray-900 dark:text-white">5 minutes.</span>{' '}
            <span className="font-semibold text-gray-900 dark:text-white">Your perspective.</span>{' '}
            <span className="font-semibold text-gray-900 dark:text-white">Real solutions.</span>
          </motion.p>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.6}}
            className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Discover how people across the political spectrum view immigration—and
            find common ground you never knew existed.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 0.7}}
          >
            <Button
              onClick={onStartClick}
              size="lg"
              className="group relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              aria-label="Start the conversation about immigration"
            >
              Start the Conversation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.9}}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>100% Anonymous</span>
            </div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div>No Registration Required</div>
            <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div>Takes 5 Minutes</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
