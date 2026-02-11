'use client'

import posthog from 'posthog-js'
import {PostHogProvider as PHProvider} from 'posthog-js/react'
import {useEffect} from 'react'

export function PostHogProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NODE_ENV === 'production') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        capture_pageview: false, // We capture manually for App Router
        capture_pageleave: true,
        persistence: 'localStorage+cookie',
      })
    }
  }, [])

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.NODE_ENV !== 'production') {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
