'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useFormStore} from '@/lib/formStore'
import {motion} from 'framer-motion'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import {ArrowLeft, CheckCircle, Loader2, BookOpen, AlertCircle} from 'lucide-react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'

const storySchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  story: z
    .string()
    .min(50, 'Story must be at least 50 characters')
    .max(2000, 'Story must not exceed 2000 characters'),
  allowPublish: z.boolean(),
  allowContact: z.boolean(),
})

type StoryFormData = z.infer<typeof storySchema>

export default function SubmitStoryPage() {
  const router = useRouter()
  const theme = useFormStore((state) => state.theme)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      allowPublish: false,
      allowContact: false,
    },
  })

  const storyText = watch('story') || ''
  const characterCount = storyText.length
  const characterLimit = 2000

  const onSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data, theme}),
      })

      if (!response.ok) throw new Error('Failed to submit story')

      setIsSuccess(true)
    } catch (error) {
      console.error('Story submission error:', error)
      alert('Failed to submit story. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getThemeMessage = () => {
    switch (theme) {
      case 'far-left':
        return {
          title: 'Share Your Story of Struggle',
          description:
            'Your lived experience is powerful. Share how immigration issues have affected you or your community.',
          prompt:
            'Tell us about your experience with immigration, whether personal or witnessing injustice in your community...',
          thankYou:
            'Thank you for sharing your story! Your voice amplifies the movement for justice. Stories like yours show why we must fight for systemic change.',
        }
      case 'center-left':
        return {
          title: 'Share Your Immigration Story',
          description:
            'Personal stories help build understanding and support for reform. Share yours.',
          prompt:
            'Share your experience with the immigration system, how it has affected your life or community...',
          thankYou:
            'Thank you for sharing! Your story helps others understand the human impact of immigration policy and why reform matters.',
        }
      case 'center-right':
        return {
          title: 'Share Your Perspective',
          description:
            'Tell us how immigration issues have impacted your community or business.',
          prompt:
            'Share your experience with immigration - as a business owner, community member, or concerned citizen...',
          thankYou:
            'Thank you for sharing your perspective! Stories from people like you help inform better, more balanced immigration policy.',
        }
      case 'far-right':
        return {
          title: 'Tell Your Story',
          description:
            'Share how current immigration policies have affected you, your family, or your community.',
          prompt:
            'Tell us how immigration issues have impacted you - crime, jobs, community changes, or other concerns...',
          thankYou:
            'Thank you for speaking up! Your story shows why we must protect American citizens and enforce our laws. Your voice matters in this fight.',
        }
      default:
        return {
          title: 'Share Your Story',
          description: 'Tell us about your experience with immigration issues.',
          prompt: 'Share your story...',
          thankYou: 'Thank you for sharing your story!',
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
                <CardTitle className="text-3xl">Story Submitted!</CardTitle>
                <CardDescription className="text-lg mt-2">{themeMessage.thankYou}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 text-left">
                    <li>• Our team will review your story within 2-3 business days</li>
                    <li>
                      • If you gave permission to publish, it may appear on our website after
                      review
                    </li>
                    <li>• Your story will help inform our advocacy efforts</li>
                    <li>• We'll email you if we have any questions or updates</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-left text-gray-700 dark:text-gray-300">
                      Your story is in our moderation queue. We review all submissions to ensure
                      they meet our community guidelines before publishing.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button onClick={() => router.push('/petition')} className="w-full" size="lg">
                    Sign the Petition
                  </Button>
                  <Button
                    onClick={() => router.push('/share')}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Share on Social Media
                  </Button>
                  <Button
                    onClick={() => router.push('/')}
                    variant="ghost"
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
                <BookOpen className="w-6 h-6 text-purple-600" />
                <Badge>{theme || 'Default'}</Badge>
              </div>
              <CardTitle className="text-3xl">{themeMessage.title}</CardTitle>
              <CardDescription className="text-lg">{themeMessage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field (Optional) */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Anonymous"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank to submit anonymously
                  </p>
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
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Required for follow-up, will not be published
                  </p>
                </div>

                {/* Story Field */}
                <div>
                  <label htmlFor="story" className="block text-sm font-medium mb-2">
                    Your Story <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="story"
                    {...register('story')}
                    rows={12}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder={themeMessage.prompt}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <div>
                      {errors.story && (
                        <p className="text-red-500 text-sm">{errors.story.message}</p>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        characterCount > characterLimit
                          ? 'text-red-500'
                          : characterCount > characterLimit * 0.9
                            ? 'text-yellow-600'
                            : 'text-gray-500'
                      }`}
                    >
                      {characterCount} / {characterLimit}
                    </p>
                  </div>
                </div>

                {/* Permission Checkboxes */}
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <input
                      id="allowPublish"
                      type="checkbox"
                      {...register('allowPublish')}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="allowPublish" className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>I give permission to publish my story</strong> on the WhyNotAct
                      website and in advocacy materials. I understand my story may be edited for
                      length and clarity.
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="allowContact"
                      type="checkbox"
                      {...register('allowContact')}
                      className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="allowContact"
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      I'm open to being contacted by the WhyNotAct team for additional details or
                      media opportunities
                    </label>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-sm mb-2">Your Privacy Matters</h4>
                  <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Your email address will never be published or shared</li>
                    <li>
                      • Stories are reviewed before publication to ensure appropriate content
                    </li>
                    <li>
                      • You can request removal of your story at any time by emailing us
                    </li>
                    <li>
                      • All stories are subject to our community guidelines
                    </li>
                  </ul>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Submit Story
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our{' '}
                  <a href="/privacy" className="text-purple-600 hover:underline">
                    privacy policy
                  </a>{' '}
                  and{' '}
                  <a href="/guidelines" className="text-purple-600 hover:underline">
                    community guidelines
                  </a>
                  .
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  )
}
