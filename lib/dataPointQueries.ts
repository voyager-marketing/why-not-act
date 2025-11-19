import {groq} from 'next-sanity'
import {client} from './sanity.client'
import type {DataPoint} from '@/types/sanity'

/**
 * Server-side functions for fetching data points from Sanity CMS
 * Can be used in Server Components, Server Actions, or API Routes
 */

/**
 * Fetch data points for the Data Reality Layer
 * Returns 3 data points from economic, security, or demographic categories
 */
export async function getDataRealityFacts(): Promise<DataPoint[]> {
  const query = groq`
    *[_type == "dataPoint" && category in ["economic", "security", "demographic"]] | order(_createdAt asc) [0...3] {
      _id,
      category,
      statistic,
      neutralContext,
      source,
      sourceUrl,
      yearCollected,
      isVerified,
      visualization,
      farRightInterpretation {
        headline,
        explanation,
        implication
      },
      centerRightInterpretation {
        headline,
        explanation,
        implication
      },
      centerLeftInterpretation {
        headline,
        explanation,
        implication
      },
      farLeftInterpretation {
        headline,
        explanation,
        implication
      },
      tags,
      lastUpdated
    }
  `

  try {
    const dataPoints = await client.fetch<DataPoint[]>(query)
    return dataPoints
  } catch (error) {
    console.error('Error fetching data reality facts:', error)
    return []
  }
}

/**
 * Fetch data points by category
 */
export async function getDataPointsByCategory(
  category: string,
  limit: number = 10
): Promise<DataPoint[]> {
  const query = groq`
    *[_type == "dataPoint" && category == $category] | order(_createdAt desc) [0...${limit}] {
      _id,
      category,
      statistic,
      neutralContext,
      source,
      sourceUrl,
      yearCollected,
      isVerified,
      visualization,
      farRightInterpretation,
      centerRightInterpretation,
      centerLeftInterpretation,
      farLeftInterpretation,
      tags
    }
  `

  try {
    const dataPoints = await client.fetch<DataPoint[]>(query, {category})
    return dataPoints
  } catch (error) {
    console.error(`Error fetching data points for category ${category}:`, error)
    return []
  }
}

/**
 * Fetch all verified data points
 */
export async function getVerifiedDataPoints(): Promise<DataPoint[]> {
  const query = groq`
    *[_type == "dataPoint" && isVerified == true] | order(yearCollected desc) {
      _id,
      category,
      statistic,
      neutralContext,
      source,
      sourceUrl,
      yearCollected,
      visualization,
      tags
    }
  `

  try {
    const dataPoints = await client.fetch<DataPoint[]>(query)
    return dataPoints
  } catch (error) {
    console.error('Error fetching verified data points:', error)
    return []
  }
}

/**
 * Fetch a single data point by ID with full details
 */
export async function getDataPointById(id: string): Promise<DataPoint | null> {
  const query = groq`
    *[_type == "dataPoint" && _id == $id][0] {
      _id,
      category,
      statistic,
      neutralContext,
      source,
      sourceUrl,
      yearCollected,
      isVerified,
      visualization,
      farRightInterpretation,
      centerRightInterpretation,
      centerLeftInterpretation,
      farLeftInterpretation,
      tags,
      lastUpdated
    }
  `

  try {
    const dataPoint = await client.fetch<DataPoint | null>(query, {id})
    return dataPoint
  } catch (error) {
    console.error(`Error fetching data point ${id}:`, error)
    return null
  }
}
