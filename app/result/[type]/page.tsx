'use client'

import {RESULT_PAGE_CONTENT} from '@/lib/resultRouter'
import CTASection from '@/components/CTASection'
import type {ResultType} from '@/types/form'
import {motion} from 'framer-motion'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {useRouter} from 'next/navigation'
import {Sparkles, Home} from 'lucide-react'
import {use} from 'react'

export default function ResultPage({params}: {params: Promise<{type: ResultType}>}) {
  const {type} = use(params)
  const content = RESULT_PAGE_CONTENT[type]
  const router = useRouter()

  // Determine score level for visual effects
  const scoreLevel = type.includes('champion') || type.includes('warrior') ? 'high' :
                     type.includes('supporter') ? 'medium' : 'low'

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

      {/* Animated Background Effects */}
      {scoreLevel === 'high' && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="flex justify-between items-center mb-8"
        >
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Start Over
          </Button>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            Your Results
          </Badge>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Result Card */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-2xl">
              {/* Hero Header with Gradient */}
              <div className={`${content.color} p-8 md:p-12 relative overflow-hidden`}>
                {/* Sparkles for high scores */}
                {scoreLevel === 'high' && (
                  <motion.div
                    initial={{scale: 0, rotate: -180}}
                    animate={{scale: 1, rotate: 0}}
                    transition={{type: 'spring', duration: 0.8}}
                    className="absolute top-8 right-8"
                  >
                    <Sparkles className="w-12 h-12 text-white/80" />
                  </motion.div>
                )}

                <motion.div
                  initial={{scale: 0.8, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  transition={{duration: 0.5}}
                >
                  <CardTitle className="text-white text-4xl md:text-5xl font-bold mb-6">
                    {content.title}
                  </CardTitle>
                </motion.div>

                <ul className="space-y-4 text-white/95">
                  {content.bullets.map((bullet, idx) => (
                    <motion.li
                      key={idx}
                      initial={{opacity: 0, x: -20}}
                      animate={{opacity: 1, x: 0}}
                      transition={{delay: 0.2 + idx * 0.1}}
                      className="flex items-start gap-3 text-lg"
                    >
                      <span className="text-2xl">✓</span>
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Call to Actions */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
              Take Action Now
            </h2>
            <CTASection ctas={content.ctas} />
          </motion.div>

          {/* Share Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border-2">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  Love Your Results?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Share your journey with friends and inspire them to take action too!
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    // Share functionality would go here
                    console.log('Share functionality')
                  }}
                >
                  Share Your Results
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
