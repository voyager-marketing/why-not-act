'use client'

import {motion} from 'framer-motion'
import {PoliticalLensQuiz} from '@/components/PoliticalLensQuiz'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'

export default function StartPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background - App-like feel for quiz */}
      <div className="fixed inset-0 bg-gradient-brand-soft dark:from-brand-950 dark:via-gray-900 dark:to-brand-950 -z-10" />

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-400/20 to-brand-700/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back to home link */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Quiz Content - Keeps app-like animations */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className="min-h-screen flex items-center justify-center w-full py-16"
      >
        <PoliticalLensQuiz />
      </motion.div>
    </main>
  )
}
