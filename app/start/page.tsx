'use client'

import {motion} from 'framer-motion'
import {PoliticalLensQuiz} from '@/components/PoliticalLensQuiz'
import Link from 'next/link'
import {ArrowLeft} from 'lucide-react'
import {Button} from '@/components/ui/button'

export default function StartPage() {
  return (
    <main className="min-h-screen relative">
      {/* Navy header band */}
      <div className="bg-slate-800 dark:bg-slate-900 pt-4 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          <Button variant="ghost" asChild className="text-slate-300 hover:text-white hover:bg-slate-700 mb-8">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Button>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.4}}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              Let's start with your perspective
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Which statement best describes your views on immigration?
            </p>
          </motion.div>
        </div>
      </div>

      {/* Red accent stripe */}
      <div className="h-1 bg-rose-700" />

      {/* Quiz cards area */}
      <div className="bg-stone-50 dark:bg-stone-950 pb-16">
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.4, delay: 0.1}}
        >
          <PoliticalLensQuiz />
        </motion.div>
      </div>
    </main>
  )
}
