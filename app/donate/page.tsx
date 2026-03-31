'use client'

import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'
import {NavigationBar} from '@/components/landing/NavigationBar'

export default function DonatePage() {
  const router = useRouter()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://donorbox.org/widgets.js'
    script.type = 'module'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <NavigationBar />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Support WhyNotAct
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          Your donation helps us build tools that bring Americans together on immigration reform. Every dollar makes a difference.
        </p>

        <div className="flex justify-center">
          <dbox-widget
            campaign="why-not-act-research-education-website-and-social-media"
            type="donation_form"
            enable-auto-scroll="true"
          />
        </div>
      </div>
    </main>
  )
}
