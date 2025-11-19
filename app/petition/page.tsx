'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {ArrowLeft, CheckCircle, Loader2, FileText, Users} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import ShareButtons from '@/components/ShareButtons'

const petitionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  zipcode: z.string().regex(/^\d{5}$/, 'Zipcode must be 5 digits'),
  phone: z.string().optional(),
  reason: z.string().max(500, 'Maximum 500 characters').optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy',
  }),
})

type PetitionFormData = z.infer<typeof petitionSchema>

export default function PetitionPage() {
  const router = useRouter()
  const theme = useFormStore((state) => state.theme)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [signatureCount, setSignatureCount] = useState(12847) // Mock count

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PetitionFormData>({
    resolver: zodResolver(petitionSchema),
  })

  const onSubmit = async (data: PetitionFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/petition', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data, theme}),
      })

      if (!response.ok) throw new Error('Failed to submit petition')

      setIsSuccess(true)
      setSignatureCount((prev) => prev + 1)
    } catch (error) {
      console.error('Petition submission error:', error)
      alert('Failed to submit petition. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getThemeMessage = () => {
    switch (theme) {
      case 'far-left':
        return {
          title: 'Join the Movement for Justice',
          description:
            'Your voice matters in the fight for comprehensive immigration reform and human rights.',
          thankYou:
            'Thank you, comrade! Together we build a more just and equitable society. Your signature joins thousands fighting for immigrant rights and dignity for all.',
        }
      case 'center-left':
        return {
          title: 'Support Progressive Immigration Policy',
          description:
            'Add your voice to demand sensible, humane immigration reform that reflects our values.',
          thankYou:
            'Thank you for taking action! Your signature helps build momentum for practical, compassionate immigration reform that benefits everyone.',
        }
      case 'center-right':
        return {
          title: 'Demand Secure Borders and Fair Process',
          description:
            'Sign to support immigration reform that prioritizes security while maintaining fairness.',
          thankYou:
            'Thank you for standing up! Your signature supports a balanced approach to immigration that protects American interests while respecting the rule of law.',
        }
      case 'far-right':
        return {
          title: 'Protect Our Nation, Secure Our Borders',
          description:
            'Join patriots demanding strong borders and immigration policies that put Americans first.',
          thankYou:
            'Thank you, patriot! Your signature helps protect American sovereignty and ensures our immigration system serves American citizens first.',
        }
      default:
        return {
          title: 'Sign the Immigration Reform Petition',
          description: 'Add your voice to demand meaningful immigration policy change.',
          thankYou: 'Thank you for signing! Your voice has been heard.',
        }
    }
  }

  const themeMessage = getThemeMessage()

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
                <CardTitle className="text-3xl">Petition Signed!</CardTitle>
                <CardDescription className="text-lg mt-2">{themeMessage.thankYou}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300">
                    <Users className="w-5 h-5" />
                    <span className="text-2xl font-bold">{signatureCount.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total signatures</p>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-lg">Amplify Your Impact:</p>
                  <ShareButtons
                    url="https://whynotact.com/petition"
                    title="I just signed the immigration reform petition at WhyNotAct!"
                    theme={theme || undefined}
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <Button onClick={() => router.push('/donate')} className="w-full" size="lg">
                    Support the Cause
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
      <div className="container mx-auto px-4 py-16 max-w-3xl">
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
                <FileText className="w-6 h-6 text-purple-600" />
                <Badge>{theme || 'Default'}</Badge>
              </div>
              <CardTitle className="text-3xl">{themeMessage.title}</CardTitle>
              <CardDescription className="text-lg">{themeMessage.description}</CardDescription>
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{signatureCount.toLocaleString()}</span>
                  <span className="text-sm">signatures so far</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Zipcode Field */}
                  <div>
                    <label htmlFor="zipcode" className="block text-sm font-medium mb-2">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="zipcode"
                      type="text"
                      {...register('zipcode')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="12345"
                      maxLength={5}
                    />
                    {errors.zipcode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>
                    )}
                  </div>

                  {/* Phone Field (Optional) */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Reason Field (Optional) */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium mb-2">
                      Why I'm Signing (Optional)
                    </label>
                    <textarea
                      id="reason"
                      {...register('reason')}
                      rows={4}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Share your reason for signing this petition (max 500 characters)..."
                      maxLength={500}
                    />
                    {errors.reason && (
                      <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <input
                      id="consent"
                      type="checkbox"
                      {...register('consent')}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{' '}
                      <a href="/privacy" className="text-purple-600 hover:underline">
                        privacy policy
                      </a>{' '}
                      and consent to receive updates about this petition and related campaigns.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.consent.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Sign the Petition
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your information is secure and will only be used for this petition. We respect
                  your privacy and will never sell your data.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
