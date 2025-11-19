'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {
  ArrowLeft,
  Share2,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Copy,
  Download,
} from 'lucide-react'

const PLATFORMS = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    color: 'bg-black hover:bg-gray-800',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    color: 'bg-gray-600 hover:bg-gray-700',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'bg-green-600 hover:bg-green-700',
  },
]

export default function SharePage() {
  const router = useRouter()
  const theme = useFormStore((state) => state.theme)
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null)
  const [shareCount, setShareCount] = useState(0)

  const getThemeMessages = () => {
    const baseUrl = 'https://whynotact.com'

    switch (theme) {
      case 'far-left':
        return {
          title: 'Spread the Movement',
          description: 'Share our message and build solidarity for immigrant justice.',
          twitter:
            'Join the fight for comprehensive immigration reform and human rights! Together we can create a just society. #WhyNotAct #ImmigrantJustice #SolidarityForever',
          facebook:
            'I just took action for immigration reform at WhyNotAct! Our immigration system needs radical change that centers human rights and dignity. Join me in demanding justice for all immigrants.',
          linkedin:
            "I'm supporting comprehensive immigration reform through WhyNotAct. As progressives, we must fight for a system that treats all people with dignity. Join the movement.",
          email: {
            subject: 'Join me in fighting for immigrant justice',
            body: `I wanted to share WhyNotAct with you - a platform fighting for comprehensive immigration reform and immigrant rights.\n\nOur current system fails immigrants and our communities. We need radical change that centers human dignity and justice.\n\nTake action: ${baseUrl}\n\nIn solidarity,`,
          },
          whatsapp:
            'Check out WhyNotAct - fighting for immigrant justice and comprehensive reform! Join the movement: ' +
            baseUrl,
        }

      case 'center-left':
        return {
          title: 'Share for Progress',
          description: 'Help us build support for sensible, humane immigration reform.',
          twitter:
            'Just took action on immigration reform at WhyNotAct! We need practical solutions that reflect our values of compassion and fairness. #WhyNotAct #ImmigrationReform #Progress',
          facebook:
            'I just joined WhyNotAct to support practical immigration reform! Our system needs updates that are both compassionate and effective. Join me in advocating for sensible change.',
          linkedin:
            'Supporting evidence-based immigration reform through WhyNotAct. We need policies that are both humane and practical. Join me in advocating for progress.',
          email: {
            subject: 'Help support practical immigration reform',
            body: `I wanted to introduce you to WhyNotAct - a platform advocating for sensible immigration reform.\n\nOur current system needs practical updates that reflect our values while addressing real challenges. We can create better policies together.\n\nLearn more and take action: ${baseUrl}\n\nBest,`,
          },
          whatsapp:
            'Found this great platform for immigration reform - WhyNotAct. Check it out and take action: ' +
            baseUrl,
        }

      case 'center-right':
        return {
          title: 'Share the Solution',
          description: 'Help us advocate for secure borders and fair processes.',
          twitter:
            'Supporting balanced immigration reform at WhyNotAct - secure borders with fair, lawful processes. #WhyNotAct #BorderSecurity #LawAndOrder',
          facebook:
            'Just took action with WhyNotAct on immigration reform! We need secure borders AND fair processes. Join me in supporting responsible reform that protects American interests.',
          linkedin:
            'Advocating for responsible immigration reform through WhyNotAct. We need security, fairness, and respect for the rule of law. Join me.',
          email: {
            subject: 'Support responsible immigration reform',
            body: `I want to share WhyNotAct with you - advocating for responsible immigration reform.\n\nWe need policies that secure our borders while maintaining fair, lawful processes. It's about both security and the rule of law.\n\nLearn more: ${baseUrl}\n\nBest regards,`,
          },
          whatsapp:
            'Check out WhyNotAct - advocating for secure borders and fair immigration processes: ' +
            baseUrl,
        }

      case 'far-right':
        return {
          title: 'Defend Our Nation',
          description: 'Share our mission to protect American sovereignty and values.',
          twitter:
            'Standing up for American sovereignty! Supporting WhyNotAct for strong borders and immigration policies that put Americans first. #WhyNotAct #AmericaFirst #SecureBorders',
          facebook:
            "Just joined WhyNotAct to fight for strong borders and immigration policies that protect American citizens! Our nation's sovereignty depends on it. Join me in defending America.",
          linkedin:
            "Supporting WhyNotAct's mission for strong immigration enforcement and border security. America must come first. Join the movement.",
          email: {
            subject: 'Defend American sovereignty - join WhyNotAct',
            body: `I'm reaching out about WhyNotAct - fighting for strong borders and immigration policies that put Americans first.\n\nOur nation's sovereignty is at stake. We need policies that protect American citizens and our way of life.\n\nTake action: ${baseUrl}\n\nGod bless America,`,
          },
          whatsapp:
            'Stand up for America! Join WhyNotAct fighting for strong borders: ' + baseUrl,
        }

      default:
        return {
          title: 'Share WhyNotAct',
          description: 'Help us spread the word about immigration reform.',
          twitter:
            'Just took action on immigration reform at WhyNotAct! Join me in making a difference. #WhyNotAct #ImmigrationReform',
          facebook:
            'I just joined WhyNotAct to support immigration reform. Check it out and join me!',
          linkedin: 'Supporting immigration reform through WhyNotAct. Join me in taking action.',
          email: {
            subject: 'Check out WhyNotAct',
            body: `I wanted to share WhyNotAct with you - a platform for immigration reform advocacy.\n\nLearn more: ${baseUrl}`,
          },
          whatsapp: 'Check out WhyNotAct for immigration reform: ' + baseUrl,
        }
    }
  }

  const messages = getThemeMessages()

  const handleShare = (platform: string) => {
    const baseUrl = 'https://whynotact.com'
    let url = ''

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(messages.twitter)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}&quote=${encodeURIComponent(messages.facebook)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(baseUrl)}`
        break
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(messages.email.subject)}&body=${encodeURIComponent(messages.email.body)}`
        break
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(messages.whatsapp)}`
        break
    }

    window.open(url, '_blank', 'width=600,height=400')
    setShareCount((prev) => prev + 1)

    // Track share event
    console.log('Share tracked:', {platform, theme})
  }

  const handleCopy = async (platform: string) => {
    let text = ''
    switch (platform) {
      case 'twitter':
        text = messages.twitter
        break
      case 'facebook':
        text = messages.facebook
        break
      case 'linkedin':
        text = messages.linkedin
        break
      case 'whatsapp':
        text = messages.whatsapp
        break
    }

    await navigator.clipboard.writeText(text)
    setCopiedPlatform(platform)
    setTimeout(() => setCopiedPlatform(null), 2000)
  }

  const handleDownloadImage = () => {
    // Placeholder for shareable image generation
    alert('Image download feature coming soon!')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="space-y-6"
        >
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="w-6 h-6 text-purple-600" />
                <Badge>{theme || 'Default'}</Badge>
              </div>
              <CardTitle className="text-3xl">{messages.title}</CardTitle>
              <CardDescription className="text-lg">{messages.description}</CardDescription>
            </CardHeader>
          </Card>

          {/* Share Stats */}
          {shareCount > 0 && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">
                      Shared {shareCount} time{shareCount !== 1 ? 's' : ''}!
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Social Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Share on Social Media</CardTitle>
              <CardDescription>
                Choose a platform below - we've pre-written messages tailored to your perspective
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {PLATFORMS.map((platform, idx) => (
                <motion.div
                  key={platform.id}
                  initial={{opacity: 0, x: -20}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: idx * 0.1}}
                  className="flex items-center gap-3"
                >
                  <Button
                    onClick={() => handleShare(platform.id)}
                    className={`flex-1 ${platform.color} text-white`}
                    size="lg"
                  >
                    <platform.icon className="w-5 h-5 mr-2" />
                    Share on {platform.name}
                  </Button>
                  {platform.id !== 'email' && (
                    <Button
                      onClick={() => handleCopy(platform.id)}
                      variant="outline"
                      size="lg"
                      className="w-24"
                    >
                      {copiedPlatform === platform.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Pre-written Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Your Pre-Written Messages</CardTitle>
              <CardDescription>
                Click to copy any message and customize it for your audience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter/X
                </h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  {messages.twitter}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  {messages.facebook}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </h4>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                  {messages.linkedin}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shareable Image */}
          <Card>
            <CardHeader>
              <CardTitle>Shareable Image</CardTitle>
              <CardDescription>
                Download a custom image for social media sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">WhyNotAct</h3>
                  <p className="text-lg">Immigration Reform Now</p>
                </div>
              </div>
              <Button onClick={handleDownloadImage} className="w-full" variant="outline" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>More Ways to Help</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => router.push('/petition')} className="w-full" size="lg">
                Sign the Petition
              </Button>
              <Button
                onClick={() => router.push('/donate')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Make a Donation
              </Button>
              <Button
                onClick={() => router.push('/letter')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Write to Congress
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
