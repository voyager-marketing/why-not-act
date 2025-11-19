'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {ArrowLeft, CheckCircle, Heart, DollarSign, Zap} from 'lucide-react'
import ShareButtons from '@/components/ShareButtons'

const donationAmounts = [
  {
    amount: 10,
    impact: 'Helps reach 100+ people with our message',
    icon: Heart,
  },
  {
    amount: 25,
    impact: 'Funds petition delivery to 5 representatives',
    icon: DollarSign,
  },
  {
    amount: 50,
    impact: 'Supports grassroots organizing in your district',
    icon: Zap,
  },
  {
    amount: 100,
    impact: 'Powers our advocacy for an entire day',
    icon: Heart,
  },
]

export default function DonatePage() {
  const router = useRouter()
  const theme = useFormStore((state) => state.theme)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isMonthly, setIsMonthly] = useState(false)
  const [receiptEmail, setReceiptEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDonate = async () => {
    const amount = selectedAmount || parseFloat(customAmount)
    if (!amount || amount < 5) {
      alert('Please enter a donation amount of at least $5')
      return
    }

    // Placeholder for Stripe integration
    // In production, this would create a Stripe checkout session
    console.log({
      amount,
      isMonthly,
      receiptEmail,
      theme,
    })

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSuccess(true)
  }

  const getThemeMessage = () => {
    switch (theme) {
      case 'far-left':
        return {
          title: 'Fund the Revolution',
          description:
            'Your contribution powers grassroots organizing for systemic change and immigrant justice.',
          thankYou:
            'Solidarity forever! Your contribution fuels the movement for justice and equality. Together we rise!',
        }
      case 'center-left':
        return {
          title: 'Invest in Progress',
          description:
            'Support evidence-based advocacy for sensible, compassionate immigration reform.',
          thankYou:
            'Thank you for investing in meaningful change! Your donation helps build a better immigration system for all.',
        }
      case 'center-right':
        return {
          title: 'Support Responsible Reform',
          description:
            'Fund advocacy for secure borders and fair, lawful immigration processes.',
          thankYou:
            'Thank you for supporting principled reform! Your contribution helps advance security and fairness.',
        }
      case 'far-right':
        return {
          title: 'Defend American Values',
          description:
            'Support the fight for strong borders and immigration policies that protect American citizens.',
          thankYou:
            'Thank you, patriot! Your contribution defends American sovereignty and our way of life.',
        }
      default:
        return {
          title: 'Support Immigration Reform',
          description: 'Your donation powers our advocacy for meaningful policy change.',
          thankYou: 'Thank you for your generous support!',
        }
    }
  }

  const themeMessage = getThemeMessage()
  const finalAmount = selectedAmount || parseFloat(customAmount) || 0

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5}}
          >
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl">Donation Successful!</CardTitle>
                <CardDescription className="text-lg mt-2">{themeMessage.thankYou}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <div className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                    ${finalAmount.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {isMonthly ? 'Monthly contribution' : 'One-time donation'}
                  </p>
                </div>

                {receiptEmail && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    A receipt has been sent to {receiptEmail}
                  </p>
                )}

                <div className="space-y-3">
                  <p className="font-semibold text-lg">Share Your Support:</p>
                  <ShareButtons
                    url="https://whynotact.com/donate"
                    title="I just donated to WhyNotAct to support immigration reform!"
                    theme={theme || undefined}
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <Button onClick={() => router.push('/petition')} className="w-full" size="lg">
                    Sign the Petition
                  </Button>
                  <Button
                    onClick={() => router.push('/')}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Return Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    )
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
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-6 h-6 text-purple-600" />
                <Badge>{theme || 'Default'}</Badge>
              </div>
              <CardTitle className="text-3xl">{themeMessage.title}</CardTitle>
              <CardDescription className="text-lg">{themeMessage.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Frequency Toggle */}
              <div className="flex justify-center">
                <div className="inline-flex rounded-lg border p-1 bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => setIsMonthly(false)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      !isMonthly
                        ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    One-Time
                  </button>
                  <button
                    onClick={() => setIsMonthly(true)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      isMonthly
                        ? 'bg-white dark:bg-gray-700 text-purple-600 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    Monthly
                    {isMonthly && (
                      <Badge className="ml-2 bg-green-500" variant="default">
                        2x Impact
                      </Badge>
                    )}
                  </button>
                </div>
              </div>

              {/* Donation Amount Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Amount:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {donationAmounts.map((item) => (
                    <motion.button
                      key={item.amount}
                      onClick={() => {
                        setSelectedAmount(item.amount)
                        setCustomAmount('')
                      }}
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedAmount === item.amount
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl font-bold">${item.amount}</span>
                        <item.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.impact}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label htmlFor="custom-amount" className="block text-sm font-medium mb-2">
                  Or Enter Custom Amount:
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="5"
                    step="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    className="w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum donation: $5</p>
              </div>

              {/* Your Impact */}
              {finalAmount >= 5 && (
                <motion.div
                  initial={{opacity: 0, height: 0}}
                  animate={{opacity: 1, height: 'auto'}}
                  className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                >
                  <h4 className="font-semibold mb-2">Your Impact:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    ${finalAmount.toFixed(2)} {isMonthly && 'per month '}
                    will help us reach more people, organize communities, and advocate for
                    meaningful immigration reform.
                  </p>
                  {isMonthly && (
                    <p className="text-sm text-green-700 dark:text-green-400 mt-2 font-medium">
                      Monthly donors provide 2x the impact with sustained support!
                    </p>
                  )}
                </motion.div>
              )}

              {/* Receipt Email */}
              <div>
                <label htmlFor="receipt-email" className="block text-sm font-medium mb-2">
                  Receipt Email (Optional):
                </label>
                <input
                  id="receipt-email"
                  type="email"
                  value={receiptEmail}
                  onChange={(e) => setReceiptEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              {/* Donate Button */}
              <Button
                onClick={handleDonate}
                size="lg"
                className="w-full"
                disabled={finalAmount < 5}
              >
                <Heart className="w-4 h-4 mr-2" />
                Donate ${finalAmount.toFixed(2)} {isMonthly && '/ month'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                This is a placeholder for Stripe integration. Your donation is secure and
                tax-deductible. We never sell or share your information.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
