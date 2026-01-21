'use client'

import {useEffect, useState, useRef} from 'react'
import {useInView} from 'framer-motion'

/**
 * Hook that animates a number counting up from 0 to the target value
 * Only starts counting when the element is in view
 */
export function useCountUp(
  end: number,
  options: {
    duration?: number
    delay?: number
    startOnView?: boolean
  } = {}
) {
  const {duration = 2000, delay = 0, startOnView = true} = options
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted) return

    setHasStarted(true)

    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [end, duration, delay, isInView, startOnView, hasStarted])

  return {count, ref}
}

/**
 * Parse a stat value string and return the numeric part and suffix
 * e.g., "11M+" => { value: 11, suffix: "M+", prefix: "", hasDecimal: false }
 * e.g., "$315B+" => { value: 315, suffix: "B+", prefix: "$", hasDecimal: false }
 * e.g., "$11.7B" => { value: 117, suffix: "B", prefix: "$", hasDecimal: true, decimalPlaces: 1 }
 * e.g., "72%" => { value: 72, suffix: "%", prefix: "", hasDecimal: false }
 * e.g., "4.4M" => { value: 44, suffix: "M", prefix: "", hasDecimal: true, decimalPlaces: 1 }
 */
export function parseStatValue(str: string): {
  value: number
  suffix: string
  prefix: string
  hasDecimal: boolean
  decimalPlaces: number
} {
  const match = str.match(/^([^0-9]*)([0-9,.]+)(.*)$/)
  if (!match) return {value: 0, suffix: '', prefix: '', hasDecimal: false, decimalPlaces: 0}

  const numStr = match[2].replace(/,/g, '')
  const hasDecimal = numStr.includes('.')
  const decimalPlaces = hasDecimal ? (numStr.split('.')[1]?.length || 0) : 0

  // For decimals, multiply by 10^decimalPlaces to animate as integer
  const value = hasDecimal
    ? Math.round(parseFloat(numStr) * Math.pow(10, decimalPlaces))
    : parseInt(numStr, 10)

  return {
    prefix: match[1] || '',
    value,
    suffix: match[3] || '',
    hasDecimal,
    decimalPlaces,
  }
}

/**
 * Format a number with commas for display
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

// Shared animation variants for consistent motion across the site
// Using tuple type for cubic bezier easing to satisfy Framer Motion's type requirements
const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export const fadeInUp = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, ease: easeOut},
  },
}

export const fadeIn = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {duration: 0.6, ease: easeOut},
  },
}

export const slideInLeft = {
  hidden: {opacity: 0, x: -60},
  visible: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.6, ease: easeOut},
  },
}

export const slideInRight = {
  hidden: {opacity: 0, x: 60},
  visible: {
    opacity: 1,
    x: 0,
    transition: {duration: 0.6, ease: easeOut},
  },
}

export const scaleIn = {
  hidden: {opacity: 0, scale: 0.9},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {duration: 0.5, ease: easeOut},
  },
}

// Container variant for staggered children
export const staggerContainer = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Faster stagger for grids with many items
export const staggerContainerFast = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}
