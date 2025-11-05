/**
 * @deprecated This store is kept for backward compatibility only.
 * New features should use lib/journeyStore.ts which implements the enhanced
 * 4-layer persuasion architecture with multi-dimensional scoring.
 *
 * Migration guide: See lib/journeyStore.ts for the new API
 */

import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import type {Theme, Answer, FormState} from '@/types/form'

interface FormStore extends FormState {
  setTheme: (theme: Theme) => void
  setAnswer: (questionId: number, answer: Answer) => void
  calculateScore: () => void
  reset: () => void
}

const scoreMap: Record<Answer, number> = {
  yes: 2,
  maybe: 1,
  no: 0,
}

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      theme: null,
      answers: {},
      score: 0,

      setTheme: (theme) => set({theme}),

      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: {...state.answers, [questionId]: answer},
        })),

      calculateScore: () => {
        const {answers} = get()
        const score = Object.values(answers).reduce(
          (total, answer) => total + scoreMap[answer],
          0
        )
        set({score})
      },

      reset: () => set({theme: null, answers: {}, score: 0}),
    }),
    {name: 'whynotact-form'}
  )
)
