import {groq} from 'next-sanity'
import {client} from './sanity.client'
import type {Question} from '@/types/form'

export async function getQuestions(): Promise<Question[]> {
  const query = groq`*[_type == "question"] | order(order asc) {
    order,
    topic,
    coreIdea,
    "farLeft": {
      "headline": farLeftHeadline,
      "bullets": farLeftBullets
    },
    "midLeft": {
      "headline": midLeftHeadline,
      "bullets": midLeftBullets
    },
    "midRight": {
      "headline": midRightHeadline,
      "bullets": midRightBullets
    },
    "farRight": {
      "headline": farRightHeadline,
      "bullets": farRightBullets
    }
  }`

  return client.fetch(query)
}
