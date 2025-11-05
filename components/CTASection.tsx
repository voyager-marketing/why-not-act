'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {motion} from 'framer-motion'
import {Share2, FileText, DollarSign, Phone, ExternalLink} from 'lucide-react'

interface Props {
  ctas: string[]
}

const CTA_CONFIG = {
  'spread-word': {
    label: 'Spread the Word',
    description: 'Share on social media',
    icon: Share2,
    gradient: 'from-pink-500 to-rose-500',
    hoverGradient: 'hover:from-pink-600 hover:to-rose-600',
    action: () => console.log('Share functionality'),
  },
  'petition': {
    label: 'Sign the Petition',
    description: 'Add your voice',
    icon: FileText,
    gradient: 'from-yellow-500 to-orange-500',
    hoverGradient: 'hover:from-yellow-600 hover:to-orange-600',
    action: () => console.log('Petition functionality'),
  },
  'donation': {
    label: 'Make a Donation',
    description: 'Support the cause',
    icon: DollarSign,
    gradient: 'from-green-500 to-emerald-500',
    hoverGradient: 'hover:from-green-600 hover:to-emerald-600',
    action: () => console.log('Donation functionality'),
  },
  'contact-reps': {
    label: 'Contact Representatives',
    description: 'Make your voice heard',
    icon: Phone,
    gradient: 'from-blue-500 to-indigo-500',
    hoverGradient: 'hover:from-blue-600 hover:to-indigo-600',
    action: () => console.log('Contact functionality'),
  },
}

export default function CTASection({ctas}: Props) {
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
    hidden: {opacity: 0, scale: 0.9},
    visible: {opacity: 1, scale: 1},
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {ctas.map((ctaKey) => {
        const cta = CTA_CONFIG[ctaKey as keyof typeof CTA_CONFIG]
        const Icon = cta.icon

        return (
          <motion.div
            key={ctaKey}
            variants={itemVariants}
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
          >
            <Card
              onClick={cta.action}
              className="cursor-pointer overflow-hidden group hover:shadow-2xl transition-all h-full border-2"
            >
              <div className={`bg-gradient-to-br ${cta.gradient} ${cta.hoverGradient} p-6 transition-all`}>
                <CardHeader className="p-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon className="w-10 h-10 text-white" />
                    <ExternalLink className="w-5 h-5 text-white/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <CardTitle className="text-white text-2xl">
                    {cta.label}
                  </CardTitle>
                  <CardDescription className="text-white/90 text-base">
                    {cta.description}
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                >
                  Get Started
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
