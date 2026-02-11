'use client'

import {useState} from 'react'
import {motion} from 'framer-motion'
import {usePostHog} from 'posthog-js/react'
import type {Theme} from '@/types/form'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {
  Megaphone,
  Share2,
  Mail,
  Users,
  DollarSign,
  Download,
  CheckCircle2,
  Star,
  Clock,
  Home,
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
  comingSoon?: boolean
}

const ACTIONS: ActionCard[] = [
  {
    id: 'email-signup',
    icon: Mail,
    title: 'Stay Informed',
    description: 'Get updates on immigration reform legislation and how you can help.',
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
    description: 'Help others understand the real impact of immigration reform.',
    priority: 2,
    minScore: 50,
    buttonText: 'Share Now',
    color: 'blue',
    action: 'share',
  },
  {
    id: 'contact-rep',
    icon: Download,
    title: 'Contact Your Representative',
    description: 'Download a ready-made letter to send to your elected officials.',
    priority: 3,
    minScore: 70,
    buttonText: 'Download Letter',
    color: 'green',
    action: 'contact',
  },
  {
    id: 'organize',
    icon: Users,
    title: 'Organize Your Community',
    description: 'Start a local campaign to push for immigration reform that works.',
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
    description: 'Fund advocacy efforts for comprehensive immigration reform.',
    priority: 5,
    minScore: 90,
    buttonText: 'Coming Soon',
    color: 'pink',
    action: 'donate',
    comingSoon: true,
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
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const posthog = usePostHog()

  // Show all actions, sorted by priority
  const availableActions = ACTIONS.sort((a, b) => a.priority - b.priority)

  const handleActionClick = (action: ActionCard) => {
    if (action.comingSoon) return
    setSelectedAction(action.id)

    posthog.capture('cta_clicked', {
      cta_id: action.id,
      cta_title: action.title,
      political_lens: theme,
      persuasion_score: persuasionScore,
    })
    switch (action.id) {
      case 'email-signup': {
        window.location.href = 'mailto:info@whynotact.org'
        break
      }
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Immigration Reform That Works',
            text: 'I just learned about a comprehensive immigration reform approach. See how it would change everything.',
            url: window.location.origin,
          })
        }
        break
      case 'contact':
        // Download the form letter
        window.open('/Form letter to present elected officials.docx', '_blank')
        break
      case 'organize':
        window.open('/organize', '_blank')
        break
    }
  }

  // Unused colorClasses removed - all actions use civic palette

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Star className="w-12 h-12 text-rose-700" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Make It Happen
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          You've completed the journey. Now it's time to turn understanding into action.
        </p>

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
                  <CheckCircle2 className="w-5 h-5 text-slate-700 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{proof}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        className="mb-12 text-center"
      >
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Want to get involved or have questions? Reach out to us at{' '}
          <a
            href="mailto:info@whynotact.org"
            className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 underline"
          >
            info@whynotact.org
          </a>
        </p>
      </motion.div>

      {/* Action Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {availableActions.map((action, idx) => {
          const Icon = action.icon
          return (
            <motion.div
              key={action.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: idx * 0.1}}
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
            >
              <Card
                className={`shadow-xl hover:shadow-2xl transition-all h-full ${
                  action.comingSoon ? 'opacity-60 cursor-default' : 'cursor-pointer'
                } ${selectedAction === action.id ? 'ring-4 ring-slate-400' : ''}`}
                onClick={() => !action.comingSoon && handleActionClick(action)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className="bg-slate-800 dark:bg-slate-700 w-14 h-14 rounded-full flex items-center justify-center mb-4"
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
                    disabled={action.comingSoon}
                    className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (!action.comingSoon) handleActionClick(action)
                    }}
                  >
                    {action.comingSoon && <Clock className="w-4 h-4 mr-2" />}
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
          <span className="block mt-4 font-bold text-slate-800 dark:text-slate-200">
            Thank you for taking this journey. Together, we can build immigration reform that works.
          </span>
        </p>
        <Button
          variant="outline"
          className="mt-8 gap-2"
          onClick={() => (window.location.href = '/')}
        >
          <Home className="w-4 h-4" />
          Back to Website
        </Button>
      </motion.div>
    </div>
  )
}
