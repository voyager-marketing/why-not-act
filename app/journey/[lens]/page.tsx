import JourneyWizard from '@/components/JourneyWizard'
import type {Theme} from '@/types/form'

interface PageProps {
  params: Promise<{
    lens: Theme
  }>
}

export default async function JourneyPage({params}: PageProps) {
  const {lens} = await params

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <JourneyWizard theme={lens} />
    </main>
  )
}

// Generate static params for all lens options
export async function generateStaticParams() {
  return [
    {lens: 'far-left'},
    {lens: 'mid-left'},
    {lens: 'mid-right'},
    {lens: 'far-right'},
  ]
}
