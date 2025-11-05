'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Twitter, Facebook, Linkedin, Mail, MessageCircle, Copy, Check} from 'lucide-react'
import type {Theme} from '@/types/form'

interface ShareButtonsProps {
  url: string
  title: string
  theme?: Theme
  layout?: 'horizontal' | 'vertical' | 'grid'
}

export default function ShareButtons({
  url,
  title,
  theme,
  layout = 'grid',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const getThemeMessage = (platform: string) => {
    const baseMessage = title

    // Customize message based on theme if needed
    switch (theme) {
      case 'far-left':
        return platform === 'twitter'
          ? `${baseMessage} #ImmigrantJustice #SolidarityForever`
          : baseMessage
      case 'mid-left':
        return platform === 'twitter' ? `${baseMessage} #ImmigrationReform #Progress` : baseMessage
      case 'mid-right':
        return platform === 'twitter' ? `${baseMessage} #BorderSecurity #LawAndOrder` : baseMessage
      case 'far-right':
        return platform === 'twitter'
          ? `${baseMessage} #AmericaFirst #SecureBorders`
          : baseMessage
      default:
        return baseMessage
    }
  }

  const handleShare = (platform: string) => {
    const message = getThemeMessage(platform)
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${message}\n\n${url}`)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')

      // Track share event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: platform,
          content_type: 'page',
          item_id: url,
        })
      }
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      // Track copy event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'page',
          item_id: url,
        })
      }
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const platforms = [
    {
      id: 'twitter',
      name: 'Twitter',
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
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ]

  const layoutClasses = {
    horizontal: 'flex flex-wrap gap-2',
    vertical: 'flex flex-col gap-2',
    grid: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2',
  }

  return (
    <div className="space-y-3">
      <div className={layoutClasses[layout]}>
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            className={`${platform.color} text-white ${layout === 'horizontal' ? 'flex-1 min-w-[100px]' : ''}`}
            size={layout === 'grid' ? 'sm' : 'default'}
          >
            <platform.icon className="w-4 h-4 mr-2" />
            {platform.name}
          </Button>
        ))}
      </div>

      <Button
        onClick={handleCopyLink}
        variant="outline"
        className="w-full"
        size={layout === 'grid' ? 'sm' : 'default'}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2 text-green-600" />
            Link Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  )
}
