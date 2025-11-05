export type Theme = 'far-left' | 'mid-left' | 'mid-right' | 'far-right'

export type Answer = 'yes' | 'no' | 'maybe'

export interface ThemedFraming {
  headline: string
  bullets: string[]
}

export interface Question {
  order: number
  topic: string
  coreIdea: string
  farLeft: ThemedFraming
  midLeft: ThemedFraming
  midRight: ThemedFraming
  farRight: ThemedFraming
}

export interface FormState {
  theme: Theme | null
  answers: Record<number, Answer>
  score: number
}

export type ResultType = 'revenue' | 'economic' | 'security' | 'demographic'
