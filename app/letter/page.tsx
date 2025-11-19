'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {ArrowLeft, FileText, Download, Mail, CheckCircle, Search} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

const letterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipcode: z.string().regex(/^\d{5}$/, 'Zipcode must be 5 digits'),
  email: z.string().email('Invalid email address').optional(),
  representative: z.string().optional(),
})

type LetterFormData = z.infer<typeof letterSchema>

const LETTER_TEMPLATES = {
  'far-left': {
    tone: 'Progressive & Activist',
    opening:
      'As your constituent and a believer in justice and human rights, I am writing to demand comprehensive immigration reform that centers human dignity.',
    body: `Our current immigration system is fundamentally broken and unjust. We need:

• Immediate pathways to citizenship for all undocumented immigrants
• Abolition of ICE and reformation of immigration enforcement
• Restoration and expansion of refugee protections
• Investment in immigrant communities and workers' rights
• An end to detention and family separation

The WhyNotAct proposal represents the minimum necessary to create a just immigration system. I urge you to support comprehensive reform that treats all people with dignity and respect.`,
    closing:
      'The time for incremental change has passed. I expect you to fight for justice and human rights. The world is watching.',
  },
  'center-left': {
    tone: 'Progressive & Pragmatic',
    opening:
      'As your constituent, I am writing to urge your support for sensible, humane immigration reform as outlined in the WhyNotAct proposal.',
    body: `Our immigration system needs practical updates that reflect our values:

• Create pathways to legal status for undocumented immigrants who contribute to our communities
• Streamline legal immigration processes to reduce backlogs
• Strengthen refugee and asylum protections
• Invest in border management that is both secure and humane
• Support immigrant integration and community programs

These reforms are both compassionate and economically sound. Studies show that immigration reform benefits our economy and strengthens our communities.`,
    closing:
      'I hope you will support evidence-based immigration reform that reflects our values as a nation. Thank you for your consideration.',
  },
  'center-right': {
    tone: 'Conservative & Pragmatic',
    opening:
      'As your constituent, I am writing to urge your support for responsible immigration reform that prioritizes security while maintaining fairness.',
    body: `Our immigration system requires reform that serves American interests:

• Secure our borders through modern technology and adequate staffing
• Enforce existing immigration laws consistently and fairly
• Streamline legal immigration for those who follow the rules
• Address the status of long-term residents through merit-based criteria
• Ensure employers verify legal work status and face consequences for violations

The WhyNotAct proposal balances security with economic needs and the rule of law.`,
    closing:
      'I urge you to support reform that protects American workers and national security while respecting legal processes. Thank you.',
  },
  'far-right': {
    tone: 'Nationalist & Strong',
    opening:
      'As your constituent and an American patriot, I am writing to demand strong action on immigration that puts American citizens first.',
    body: `Our nation's sovereignty is under threat. We need:

• Complete border security with a physical barrier and advanced technology
• Strict enforcement of all immigration laws with serious consequences for violations
• Mandatory E-Verify for all employers with penalties for non-compliance
• Merit-based immigration that serves American economic and security interests
• End to sanctuary policies and chain migration
• Deportation of criminal aliens and those who violate immigration law

America must come first. The WhyNotAct proposal represents the minimum necessary to protect our citizens and sovereignty.`,
    closing:
      'I expect you to stand up for American citizens and our national sovereignty. No compromise on American security.',
  },
}

export default function LetterPage() {
  const router = useRouter()
  const theme = useFormStore((state) => state.theme)
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<'download' | 'email'>('download')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<LetterFormData>({
    resolver: zodResolver(letterSchema),
  })

  const zipcode = watch('zipcode')

  const handleLookupRepresentative = async () => {
    if (!zipcode || zipcode.length !== 5) {
      alert('Please enter a valid 5-digit ZIP code')
      return
    }

    setIsLookingUp(true)
    try {
      // Placeholder for representative lookup API
      // In production, use an API like congress.gov or civic information API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock result
      setValue('representative', 'Rep. John Smith')
      alert('Representative found! (This is a placeholder - integrate real API in production)')
    } catch (error) {
      console.error('Lookup error:', error)
      alert('Failed to lookup representative. Please enter manually.')
    } finally {
      setIsLookingUp(false)
    }
  }

  const onSubmit = async (data: LetterFormData) => {
    const template = LETTER_TEMPLATES[theme as keyof typeof LETTER_TEMPLATES] || LETTER_TEMPLATES['center-left']

    const letterContent = `${data.name}
${data.address}
${data.city}, ${data.state} ${data.zipcode}

${data.representative || 'Dear Representative'}

${template.opening}

${template.body}

${template.closing}

Sincerely,
${data.name}
${data.email ? `Email: ${data.email}` : ''}`

    if (deliveryMethod === 'download') {
      // Generate PDF (placeholder - in production use jsPDF or similar)
      const blob = new Blob([letterContent], {type: 'text/plain'})
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'letter-to-congress.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // Send via email (placeholder - in production use SendGrid or similar)
      console.log('Sending letter via email:', data.email)
      alert('Email feature coming soon! For now, please download and mail yourself.')
    }

    setIsSuccess(true)
  }

  const template = LETTER_TEMPLATES[theme as keyof typeof LETTER_TEMPLATES] || LETTER_TEMPLATES['center-left']

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
                <CardTitle className="text-3xl">Letter Generated!</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Your personalized letter to Congress is ready.
                  {deliveryMethod === 'email'
                    ? ' Check your email for confirmation.'
                    : ' The file has been downloaded to your device.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Next Steps:</strong>
                    <br />
                    1. Review your letter and make any personal edits
                    <br />
                    2. Print and mail to your representative, or send via email
                    <br />
                    3. Consider calling their office to follow up
                    <br />
                    4. Share your action on social media to inspire others
                  </p>
                </div>

                <div className="space-y-3">
                  <Button onClick={() => router.push('/share')} className="w-full" size="lg">
                    Share Your Action
                  </Button>
                  <Button onClick={() => router.push('/petition')} variant="outline" className="w-full" size="lg">
                    Sign the Petition
                  </Button>
                  <Button onClick={() => router.push('/')} variant="ghost" className="w-full" size="lg">
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
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-6 h-6 text-purple-600" />
                <Badge>{theme || 'Default'}</Badge>
              </div>
              <CardTitle className="text-3xl">Write to Congress</CardTitle>
              <CardDescription className="text-lg">
                Generate a personalized letter to your representative supporting immigration reform
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Letter Template Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Letter Template</CardTitle>
              <CardDescription>
                Tone: {template.tone} | This template will be personalized with your information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-h-96 overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap">{template.opening}</p>
                <p className="text-sm whitespace-pre-wrap mt-4">{template.body}</p>
                <p className="text-sm whitespace-pre-wrap mt-4">{template.closing}</p>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                Enter your details to personalize the letter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
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
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    {...register('address')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="123 Main St"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                {/* City, State, Zip */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register('city')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Springfield"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      {...register('state')}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
                      placeholder="CA"
                      maxLength={2}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                  </div>
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
                    {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>}
                  </div>
                </div>

                {/* Representative Lookup */}
                <div>
                  <label htmlFor="representative" className="block text-sm font-medium mb-2">
                    Your Representative (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="representative"
                      type="text"
                      {...register('representative')}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Will be auto-filled"
                    />
                    <Button
                      type="button"
                      onClick={handleLookupRepresentative}
                      disabled={isLookingUp || !zipcode || zipcode.length !== 5}
                      variant="outline"
                    >
                      {isLookingUp ? (
                        'Looking up...'
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Lookup
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your ZIP code above, then click Lookup
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Method</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('download')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        deliveryMethod === 'download'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Download className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                      <div className="font-medium">Download</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Print and mail yourself
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('email')}
                      className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                        deliveryMethod === 'email'
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <Mail className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                      <div className="font-medium">Email (Coming Soon)</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        We'll send it for you
                      </div>
                    </button>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Letter
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
