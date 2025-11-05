'use client'

import {motion} from 'framer-motion'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {Share2, Home, Download, Heart} from 'lucide-react'
import type {UserJourney} from '@/types/form'
import JourneyRecap from './JourneyRecap'
import ConvictionScoreDisplay from './ConvictionScoreDisplay'
import DynamicNarrative from './DynamicNarrative'
import PrioritizedCTAGrid from './PrioritizedCTAGrid'
import {generateShareMessage} from '@/lib/narrativeGenerator'
import {useRouter} from 'next/navigation'

interface Props {
  journey: UserJourney
}

// Social proof testimonials matched to ideology
const TESTIMONIALS = {
  'far-left': {
    quote: "This data opened my eyes to the systemic solutions we need. I'm ready to fight for justice.",
    author: "Maya R., Community Organizer",
  },
  'mid-left': {
    quote: "The evidence-based approach convinced me. We need practical reform that actually works.",
    author: "James K., Policy Analyst",
  },
  'mid-right': {
    quote: "These facts changed my perspective. This is about responsible, sustainable solutions.",
    author: "Sarah M., Business Owner",
  },
  'far-right': {
    quote: "The data speaks for itself. This is about security and sovereignty done right.",
    author: "David T., Veteran",
  },
}

export default function PersonalizedResultHub({journey}: Props) {
  const router = useRouter()
  const testimonial = TESTIMONIALS[journey.theme]

  const handleShare = async () => {
    const shareMessage = generateShareMessage(journey)
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Immigration Policy Journey',
          text: shareMessage,
          url: shareUrl,
        })

        // Track share event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'native',
            content_type: 'journey',
            item_id: journey.resultType,
          })
        }
      } catch (err) {
        console.log('Share cancelled or failed:', err)
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareMessage}\n\n${shareUrl}`)
        alert('Share message copied to clipboard!')

        // Track share event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            method: 'clipboard',
            content_type: 'journey',
            item_id: journey.resultType,
          })
        }
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleCTAClick = (ctaId: string, priority: number) => {
    // Track conversion event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        cta_id: ctaId,
        priority: priority,
        journey_score: journey.score,
        result_type: journey.resultType,
        conviction_overall:
          (journey.convictionScores.valueAlignment +
            journey.convictionScores.dataAwareness +
            journey.convictionScores.persuasionLevel +
            journey.convictionScores.engagementDepth) /
          4,
      })
    }
  }

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

      {/* Animated Background Effects for high scores */}
      {journey.score >= 8 && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {/* Header with actions */}
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="flex justify-between items-center mb-8 flex-wrap gap-4"
        >
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Start Over
            </Button>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Your Action Hub
            </Badge>
          </div>

          <Button
            variant="default"
            onClick={handleShare}
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Share2 className="w-4 h-4" />
            Share Your Journey
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Journey Recap Section */}
          <motion.div variants={itemVariants}>
            <JourneyRecap journey={journey} />
          </motion.div>

          {/* Conviction Scores Section */}
          <motion.div variants={itemVariants}>
            <ConvictionScoreDisplay scores={journey.convictionScores} />
          </motion.div>

          {/* Dynamic Narrative Section */}
          <motion.div variants={itemVariants}>
            <DynamicNarrative journey={journey} />
          </motion.div>

          {/* Prioritized CTA Cards Section */}
          <motion.div variants={itemVariants}>
            <PrioritizedCTAGrid journey={journey} onCTAClick={handleCTAClick} />
          </motion.div>

          {/* Social Proof Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border-2 border-purple-200 dark:border-purple-800 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-3">
                      "{testimonial.quote}"
                    </blockquote>
                    <cite className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      — {testimonial.author}
                    </cite>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Share Progress Section (Bottom) */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  Amplify Your Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Your journey matters. Share your experience with friends and family
                  to inspire them to explore the data too. Every perspective shared
                  brings us closer to evidence-based solutions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleShare}
                    className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Your Results
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      // TODO: Implement download functionality
                      console.log('Download results')
                    }}
                    className="gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer note */}
          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4"
          >
            <p>
              This personalized action hub is based on your unique journey through{' '}
              {journey.layersCompleted} layers of immigration data. Every element is
              tailored to your perspective, conviction level, and readiness to act.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
