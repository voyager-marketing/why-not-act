import {getQuestions} from '@/lib/queries'
import FormWizard from '@/components/FormWizard'
import Link from 'next/link'

export default async function FormPage({params}: {params: Promise<{theme: string}>}) {
  const {theme} = await params
  const questions = await getQuestions()

  // Handle no questions case
  if (!questions || questions.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-12 text-center">
          <h1 className="text-3xl font-bold mb-4">No Questions Available</h1>
          <p className="text-gray-600 mb-8">
            Please add questions to your Sanity CMS before taking the survey.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/studio"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Go to Sanity Studio
            </Link>
            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return <FormWizard questions={questions} theme={theme} />
}
