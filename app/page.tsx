'use client'

import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import type {Theme} from '@/types/form'
import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {ArrowRight, Vote, Users, Target} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const setTheme = useFormStore((state) => state.setTheme)

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme)
    router.push(`/form/${theme}`)
  }

  const themes = [
    {
      id: 'far-left',
      label: 'Far Left',
      description: 'Progressive & Socialist',
      gradient: 'from-blue-600 to-blue-700',
      hoverGradient: 'hover:from-blue-700 hover:to-blue-800',
    },
    {
      id: 'mid-left',
      label: 'Mid Left',
      description: 'Liberal & Center-Left',
      gradient: 'from-blue-400 to-blue-500',
      hoverGradient: 'hover:from-blue-500 hover:to-blue-600',
    },
    {
      id: 'mid-right',
      label: 'Mid Right',
      description: 'Conservative & Center-Right',
      gradient: 'from-red-400 to-red-500',
      hoverGradient: 'hover:from-red-500 hover:to-red-600',
    },
    {
      id: 'far-right',
      label: 'Far Right',
      description: 'Traditional & Nationalist',
      gradient: 'from-red-600 to-red-700',
      hoverGradient: 'hover:from-red-700 hover:to-red-800',
    },
  ]

  const features = [
    {icon: Vote, title: 'Personalized', description: 'Tailored to your political perspective'},
    {icon: Target, title: 'Actionable', description: 'Clear steps to make an impact'},
    {icon: Users, title: 'Community', description: 'Join thousands making a difference'},
  ]

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900" />

      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          className="text-center mb-16"
        >
          {/* Hero Section */}
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            Political Action Platform
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            WhyNotAct
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
            Discover your political alignment and take meaningful action
          </p>
          <p className="text-md text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Answer questions tailored to your perspective, then receive personalized calls-to-action
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto mb-2 text-purple-600" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6, delay: 0.3}}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Select Your Political Perspective
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {themes.map((theme, idx) => (
              <motion.div
                key={theme.id}
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.4, delay: idx * 0.1}}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
              >
                <Card
                  onClick={() => handleThemeSelect(theme.id as Theme)}
                  className="cursor-pointer overflow-hidden group hover:shadow-xl transition-all"
                >
                  <div className={`bg-gradient-to-br ${theme.gradient} ${theme.hoverGradient} p-8 transition-all`}>
                    <CardHeader className="p-0 space-y-2">
                      <CardTitle className="text-white text-2xl flex items-center justify-between">
                        {theme.label}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </CardTitle>
                      <CardDescription className="text-white/90 text-lg">
                        {theme.description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.6, delay: 0.8}}
          className="text-center mt-16"
        >
          <p className="text-gray-500 dark:text-gray-400">
            Ready to make a difference? Select your perspective to get started.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
