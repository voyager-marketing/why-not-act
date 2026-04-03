'use client'

import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {usePostHog} from 'posthog-js/react'
import type {Theme} from '@/types/form'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
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
  Check,
  ExternalLink,
} from 'lucide-react'

interface ActionCard {
  id: string
  icon: typeof Megaphone
  title: string
  description: string
  priority: number
  minScore: number
  buttonText: string
  colorClasses: {
    iconBg: string
    button: string
    buttonHover: string
    ring: string
    border: string
  }
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
    buttonText: 'Stay Informed',
    colorClasses: {
      iconBg: 'bg-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      buttonHover: 'hover:bg-purple-700',
      ring: 'ring-purple-400',
      border: 'border-t-4 border-t-purple-500',
    },
    action: 'signup',
  },
  {
    id: 'share',
    icon: Share2,
    title: 'Share the Journey',
    description: 'Help others understand the real impact of immigration reform.',
    priority: 2,
    minScore: 50,
    buttonText: 'Share Now',
    colorClasses: {
      iconBg: 'bg-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      buttonHover: 'hover:bg-blue-700',
      ring: 'ring-blue-400',
      border: 'border-t-4 border-t-blue-500',
    },
    action: 'share',
  },
  {
    id: 'contact-rep',
    icon: Download,
    title: 'Contact Your Representative or Senator',
    description: 'Download a ready-made letter to send to your elected officials.',
    priority: 3,
    minScore: 70,
    buttonText: 'Download Letter',
    colorClasses: {
      iconBg: 'bg-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      buttonHover: 'hover:bg-emerald-700',
      ring: 'ring-emerald-400',
      border: 'border-t-4 border-t-emerald-500',
    },
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
    colorClasses: {
      iconBg: 'bg-amber-500',
      button: 'bg-amber-500 hover:bg-amber-600',
      buttonHover: 'hover:bg-amber-600',
      ring: 'ring-amber-400',
      border: 'border-t-4 border-t-amber-500',
    },
    action: 'organize',
  },
  {
    id: 'donate',
    icon: DollarSign,
    title: 'Support the Cause',
    description: 'Fund advocacy efforts for comprehensive immigration reform.',
    priority: 5,
    minScore: 90,
    buttonText: 'Donate',
    colorClasses: {
      iconBg: 'bg-rose-600',
      button: 'bg-rose-600 hover:bg-rose-700',
      buttonHover: 'hover:bg-rose-700',
      ring: 'ring-rose-400',
      border: 'border-t-4 border-t-rose-500',
    },
    action: 'donate',
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

function StayInformedDialog({
  onSubmit,
}: {
  onSubmit: (email: string) => void
}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'stay-informed', email}),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }
      onSubmit(email)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Thank you for signing up!
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          We'll be in touch with updates soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Thank you for your interest in moving our country forward concerning the
        integration of undocumented immigrants. Please provide us with your
        email, we will only send you updates to include access to studies, white
        papers, and other educational products. No spamming.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stay-informed-email">Email address</Label>
          <Input
            id="stay-informed-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          {submitting ? 'Submitting...' : 'Subscribe for Updates'}
        </Button>
      </form>
    </div>
  )
}

function ShareJourneyDialog() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText('https://www.whynotact.org')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Thank you for wanting others to know about our immigration solution.
        Please do share this website with any US citizen, even if you believe
        they are against this idea. We want all people to gain better insights
        into what the undocumented immigrant population brings to our nation. We
        will soon be adding Social Media Channels to widen out the audience.
      </p>
      <div className="flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <span className="text-blue-600 dark:text-blue-400 font-semibold flex-1">
          www.whynotact.org
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            'Copy Link'
          )}
        </Button>
      </div>
      <div className="flex gap-3 justify-center pt-2">
        <Button
          variant="outline"
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent('Discover a new approach to immigration reform')}&url=${encodeURIComponent('https://www.whynotact.org')}`,
              '_blank',
              'noopener,noreferrer'
            )
          }}
        >
          Share on X
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://www.whynotact.org')}`,
              '_blank',
              'noopener,noreferrer'
            )
          }}
        >
          Share on Facebook
        </Button>
      </div>
    </div>
  )
}

function ContactRepDialog() {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/Form letter to present elected officials.docx'
    link.download = 'Form letter to present elected officials.docx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloaded(true)
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Thank you for your interest in moving our country forward concerning
        integrating undocumented immigrants. You can download a form letter and
        some supporting data for sending to your elected official in the US
        House of Representatives and/or Senate.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        The following link will help you find the name and address to send the
        letter to:{' '}
        <a
          href="https://www.congress.gov/members/find-your-member"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-emerald-700 underline inline-flex items-center gap-1"
        >
          Find Your Member of Congress
          <ExternalLink className="w-3 h-3" />
        </a>
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        If you use this Form Letter we ask that you do not materially change the
        tone or the data in the letter. Please do include any factual and
        personal stories you have which strengthens the idea and position.
        Concerning tone, it is also very important to encourage calm, civil
        discourse.
      </p>
      <Button
        onClick={handleDownload}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        {downloaded ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Downloaded!
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Download Form Letter
          </>
        )}
      </Button>
    </div>
  )
}

function OrganizeDialog({
  onSubmit,
}: {
  onSubmit: (data: {email: string; name: string; state: string; message: string}) => void
}) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    state: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: 'organize', ...formData}),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }
      onSubmit(formData)
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Thank you for volunteering!
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          We'll reach out to schedule a call soon.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        We are grateful for your interest in teaming with us in organizing and
        educating your community. We need volunteers in every State and
        Territory. We understand this can be an emotionally charged topic and are
        looking for people who can calmly deliver the WhyNotAct.org message. We
        need people that can engage in the dialogue required to help people
        understand the value the undocumented immigrant population brings to our
        communities.
      </p>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        When you submit your information, we will set up a time for a
        video/audio call to go over the vision, ethics, available tools, and
        educational products. We will also need to gain some information about
        you which will include a background check and references.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="organize-name">Full name</Label>
          <Input
            id="organize-name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organize-email">Email address</Label>
          <Input
            id="organize-email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organize-state">State / Territory</Label>
          <Input
            id="organize-state"
            type="text"
            placeholder="e.g., Virginia"
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="organize-message">Tell us about yourself (optional)</Label>
          <Textarea
            id="organize-message"
            placeholder="Any experience, skills, or motivation you'd like to share..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={3}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        >
          {submitting ? 'Submitting...' : 'Volunteer as Community Organizer'}
        </Button>
      </form>
    </div>
  )
}

function DonateDialog() {
  return (
    <div className="space-y-4">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Thank you so much for your desire to financially support WhyNotAct.org.
        We are a 501c3 non-profit corporation registered in the State of
        Virginia and have been approved by the IRS to take in tax deductible
        donations. Your donation is being put to work to educate the US public
        on seeing the current undocumented immigrant community as assets, not
        liabilities.
      </p>
      <div className="flex justify-center">
        <dbox-widget
          campaign="why-not-act-research-education-website-and-social-media"
          type="donation_form"
          enable-auto-scroll="true"
        />
      </div>
    </div>
  )
}

export default function CallToActionLayer({theme, persuasionScore}: Props) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const posthog = usePostHog()

  // Show all actions, sorted by priority
  useEffect(() => {
    if (!document.querySelector('script[src="https://donorbox.org/widgets.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://donorbox.org/widgets.js'
      script.type = 'module'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

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

    setOpenDialog(action.id)
  }

  const handleEmailSignup = (email: string) => {
    posthog.capture('email_signup', {email, political_lens: theme})
    // TODO: Send to backend/API
    console.log('Email signup:', email)
  }

  const handleOrganizeSignup = (data: {email: string; name: string; state: string; message: string}) => {
    posthog.capture('organize_signup', {...data, political_lens: theme})
    // TODO: Send to backend/API
    console.log('Organize signup:', data)
  }

  const getDialogTitle = (actionId: string) => {
    switch (actionId) {
      case 'email-signup':
        return 'Stay Informed'
      case 'share':
        return 'Share the Journey'
      case 'contact-rep':
        return 'Contact Your Representative or Senator'
      case 'organize':
        return 'Organize Your Community'
      case 'donate':
        return 'Support the Cause'
      default:
        return ''
    }
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
                  <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0" />
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
        <a
          href="/WhyNotAct Integration proposal v4.pdf"
          download
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Download Proposal
        </a>
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
                className={`shadow-xl hover:shadow-2xl transition-all h-full ${action.colorClasses.border} ${
                  action.comingSoon ? 'opacity-60 cursor-default' : 'cursor-pointer'
                } ${selectedAction === action.id ? `ring-4 ${action.colorClasses.ring}` : ''}`}
                onClick={() => handleActionClick(action)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`${action.colorClasses.iconBg} w-14 h-14 rounded-full flex items-center justify-center mb-4`}
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
                    className={`w-full ${action.colorClasses.button} text-white font-bold`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleActionClick(action)
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

      {/* Dialog Modals */}
      <Dialog open={openDialog !== null} onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent className={`max-h-[90vh] overflow-y-auto ${openDialog === 'donate' ? 'max-w-2xl' : 'max-w-lg'}`}>
          <DialogHeader>
            <DialogTitle>{openDialog ? getDialogTitle(openDialog) : ''}</DialogTitle>
            <DialogDescription className="sr-only">
              {openDialog ? getDialogTitle(openDialog) : 'Action details'}
            </DialogDescription>
          </DialogHeader>
          {openDialog === 'email-signup' && (
            <StayInformedDialog onSubmit={handleEmailSignup} />
          )}
          {openDialog === 'share' && <ShareJourneyDialog />}
          {openDialog === 'contact-rep' && <ContactRepDialog />}
          {openDialog === 'organize' && (
            <OrganizeDialog onSubmit={handleOrganizeSignup} />
          )}
          {openDialog === 'donate' && <DonateDialog />}
        </DialogContent>
      </Dialog>

      {/* Donate Section - Embedded Donorbox */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.6}}
        className="mt-12"
      >
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          Support the Cause
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
          Your tax-deductible donation helps us educate the public and advocate for practical immigration reform.
        </p>
        <div className="flex justify-center">
          <dbox-widget
            campaign="why-not-act-research-education-website-and-social-media"
            type="donation_form"
            enable-auto-scroll="true"
          />
        </div>
      </motion.div>

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
