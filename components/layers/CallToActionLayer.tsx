'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
import type {Theme} from '@/types/form'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {
  Megaphone,
  Share2,
  Mail,
  Users,
  DollarSign,
  FileText,
  CheckCircle2,
  Star,
  TrendingUp,
} from 'lucide-react'

interface ActionCard {
  id: string
  icon: typeof Megaphone
  title: string
  description: string
  priority: number
  minScore: number
  buttonText: string
  color: string
  action: string
}

const ACTIONS: ActionCard[] = [
  {
    id: 'email-signup',
    icon: Mail,
    title: 'Stay Informed',
    description: 'Get updates on wage theft legislation and how you can help.',
    priority: 1,
    minScore: 0,
    buttonText: 'Join the Movement',
    color: 'purple',
    action: 'signup',
  },
  {
    id: 'share',
    icon: Share2,
    title: 'Share This Journey',
    description: 'Help others understand the impact of wage theft and the solution.',
    priority: 2,
    minScore: 50,
    buttonText: 'Share Now',
    color: 'blue',
    action: 'share',
  },
  {
    id: 'contact-rep',
    icon: Megaphone,
    title: 'Contact Your Representative',
    description: 'Tell your elected officials you support the $30K wage theft fine.',
    priority: 3,
    minScore: 70,
    buttonText: 'Take Action',
    color: 'green',
    action: 'contact',
  },
  {
    id: 'organize',
    icon: Users,
    title: 'Organize Your Community',
    description: 'Start a local campaign to push for stronger wage theft penalties.',
    priority: 4,
    minScore: 80,
    buttonText: 'Get Started',
    color: 'amber',
    action: 'organize',
  },
  {
    id: 'donate',
    icon: DollarSign,
    title: 'Support the Cause',
    description: 'Fund advocacy efforts to pass wage theft legislation.',
    priority: 5,
    minScore: 90,
    buttonText: 'Donate',
    color: 'pink',
    action: 'donate',
  },
  {
    id: 'learn-more',
    icon: FileText,
    title: 'Deep Dive',
    description: 'Read the full policy proposal and research.',
    priority: 6,
    minScore: 0,
    buttonText: 'Learn More',
    color: 'indigo',
    action: 'learn',
  },
]

const SOCIAL_PROOF = [
  '50,000+ people have taken this journey',
  '12,000+ emails sent to representatives',
  'Active campaigns in 35 states',
]

interface Props {
  theme: Theme
  persuasionScore: number
}

export default function CallToActionLayer({theme, persuasionScore}: Props) {
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  // Show all actions, sorted by priority
  const availableActions = ACTIONS.sort((a, b) => a.priority - b.priority)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would normally send to an API
      console.log('Email submitted:', email)
      setEmailSubmitted(true)
    }
  }

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId)
    // Handle different actions
    switch (actionId) {
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'End Wage Theft with Real Consequences',
            text: 'I just learned about a $30K fine for wage theft. See how it would change everything.',
            url: window.location.origin,
          })
        }
        break
      case 'contact':
        // Open contact form or redirect
        window.open('/contact-rep', '_blank')
        break
      case 'organize':
        // Open organizing toolkit
        window.open('/organize', '_blank')
        break
      case 'donate':
        // Open donation page
        window.open('/donate', '_blank')
        break
      case 'learn':
        // Open full policy page
        window.open('/policy', '_blank')
        break
    }
  }

  const colorClasses = {
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    amber: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-12 h-12 text-yellow-500" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Make It Happen
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          You've completed the journey. Now it's time to turn understanding into action.
        </p>

        {/* Persuasion Score */}
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="inline-block"
        >
          <Card className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 inline-block">
            <CardContent className="p-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Score</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {persuasionScore}%
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        className="mb-12"
      >
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {SOCIAL_PROOF.map((proof, idx) => (
                <motion.div
                  key={idx}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: idx * 0.1}}
                  className="flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{proof}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Capture */}
      {!emailSubmitted && (
        <motion.div
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          className="mb-12"
        >
          <Card className="shadow-2xl border-2 border-purple-200 dark:border-purple-800">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
              <CardTitle className="text-2xl md:text-3xl text-center">
                Start by Staying Connected
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Join thousands fighting for fair wages and real consequences for wage theft.
                </p>
                <div className="flex gap-4 max-w-xl mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-14 text-lg"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Join Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {emailSubmitted && (
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-6 py-3 rounded-full">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Thanks for joining! Check your email for next steps.</span>
          </div>
        </motion.div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableActions.map((action, idx) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: idx * 0.1}}
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
            >
              <Card
                className={`shadow-xl hover:shadow-2xl transition-all cursor-pointer h-full ${
                  selectedAction === action.id ? 'ring-4 ring-purple-400' : ''
                }`}
                onClick={() => action.action !== 'signup' && handleActionClick(action.id)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`bg-gradient-to-br ${colorClasses[action.color as keyof typeof colorClasses]} w-14 h-14 rounded-full flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {action.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {action.description}
                  </p>

                  <Button
                    className={`w-full bg-gradient-to-r ${colorClasses[action.color as keyof typeof colorClasses]} text-white font-bold`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleActionClick(action.id)
                    }}
                  >
                    {action.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Final Message */}
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1}}
        className="text-center mt-16 mb-8"
      >
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Change doesn't happen by accident. It happens when people like you decide to act.
          <span className="block mt-4 font-bold text-purple-600 dark:text-purple-400">
            Thank you for taking this journey. Together, we can end wage theft.
          </span>
        </p>
      </motion.div>
    </div>
  )
}
