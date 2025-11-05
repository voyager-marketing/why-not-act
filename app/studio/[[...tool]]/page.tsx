'use client'

import dynamic from 'next/dynamic'

const StudioClient = dynamic(() => import('./StudioClient').then(mod => mod.default), {
  ssr: false,
  loading: () => <div>Loading Studio...</div>
})

export default function Studio() {
  return <StudioClient />
}
