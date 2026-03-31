import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'dbox-widget': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          campaign?: string
          type?: string
          'enable-auto-scroll'?: string
        },
        HTMLElement
      >
    }
  }
}
