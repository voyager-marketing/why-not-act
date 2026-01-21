'use client'

import {useEffect, useState, useRef, useCallback} from 'react'
import {parseStatValue, formatNumber} from '@/lib/animations'

interface AnimatedCounterProps {
  value: string
  className?: string
  duration?: number
  delay?: number
}

export function AnimatedCounter({
  value,
  className,
  duration = 2000,
  delay = 0,
}: AnimatedCounterProps) {
  const {prefix, value: numericValue, suffix, hasDecimal, decimalPlaces} = parseStatValue(value)
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  const startAnimation = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)

    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * numericValue))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(numericValue)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [numericValue, duration, delay, hasStarted])

  // Use native IntersectionObserver for reliability
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation()
            observer.disconnect()
          }
        })
      },
      {rootMargin: '-50px', threshold: 0.1}
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [startAnimation])

  // Format the display value
  const displayCount = hasDecimal
    ? (count / Math.pow(10, decimalPlaces)).toFixed(decimalPlaces)
    : formatNumber(count)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayCount}
      {suffix}
    </span>
  )
}
