'use client'

import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {HeroSection} from '@/components/HeroSection'
import {PoliticalLensQuiz} from '@/components/PoliticalLensQuiz'
import {SocialProof} from '@/components/SocialProof'
import {Heart} from 'lucide-react'

export default function HomePage() {
  const [showQuiz, setShowQuiz] = useState(false)

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 -z-10" />

      {/* Content Container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div
              key="hero"
              initial={{opacity: 1}}
              exit={{opacity: 0, y: -50}}
              transition={{duration: 0.5}}
            >
              {/* Stage 1: Hero Section */}
              <HeroSection onStartClick={() => setShowQuiz(true)} />

              {/* Social Proof Section */}
              <SocialProof />

              {/* Mission Footer */}
              <motion.footer
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 1.2}}
                className="py-16 px-4 bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
              >
                <div className="container mx-auto max-w-4xl text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/10 rounded-full">
                    <Heart className="w-8 h-8" aria-hidden="true" />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    The WhyNotAct Mission
                  </h2>

                  <p className="text-lg md:text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto mb-6">
                    We believe America's greatest strength lies in our diversity of thought.
                    Immigration is one of our most divisive issues—but it doesn't have to be.
                  </p>

                  <p className="text-base md:text-lg text-purple-200 leading-relaxed max-w-2xl mx-auto">
                    WhyNotAct helps you explore immigration through your values, discover surprising
                    common ground, and take meaningful action. No matter where you stand, your voice
                    can help shape a better future.
                  </p>

                  {/* Additional Info */}
                  <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="text-sm text-purple-300">
                      Built with respect for all perspectives • Powered by data and empathy
                    </p>
                  </div>
                </div>
              </motion.footer>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              className="min-h-screen flex items-center"
            >
              {/* Stage 2: Political Lens Quiz */}
              <PoliticalLensQuiz />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
