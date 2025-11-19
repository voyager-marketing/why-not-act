import type {UserJourney, Theme, PersuasionProfile} from '@/types/form'

// Persuasion profiles based on score and engagement
const PERSUASION_PROFILES: Record<string, PersuasionProfile> = {
  skeptic: {
    level: 'skeptic',
    scoreRange: [0, 3],
    narrativeTemplate: 'explore',
    emotionalTone: 'cautious',
  },
  curious: {
    level: 'curious',
    scoreRange: [4, 6],
    narrativeTemplate: 'inform',
    emotionalTone: 'optimistic',
  },
  engaged: {
    level: 'engaged',
    scoreRange: [7, 9],
    narrativeTemplate: 'inspire',
    emotionalTone: 'passionate',
  },
  champion: {
    level: 'champion',
    scoreRange: [10, 12],
    narrativeTemplate: 'activate',
    emotionalTone: 'urgent',
  },
}

// Ideology-specific language patterns
const IDEOLOGY_LANGUAGE = {
  'far-left': {
    values: ['justice', 'equity', 'solidarity', 'human rights'],
    frames: ['systemic change', 'collective action', 'transformative policy'],
    concerns: ['inequality', 'exploitation', 'marginalization'],
  },
  'center-left': {
    values: ['fairness', 'opportunity', 'compassion', 'progress'],
    frames: ['practical solutions', 'evidence-based policy', 'reform'],
    concerns: ['inequality', 'access', 'representation'],
  },
  'center-right': {
    values: ['security', 'prosperity', 'stability', 'responsibility'],
    frames: ['fiscal prudence', 'rule of law', 'balanced approach'],
    concerns: ['costs', 'safety', 'sustainability'],
  },
  'far-right': {
    values: ['sovereignty', 'security', 'tradition', 'order'],
    frames: ['national interest', 'border control', 'law and order'],
    concerns: ['security threats', 'economic burden', 'sovereignty'],
  },
}

// Narrative templates by persuasion level and ideology
const NARRATIVE_TEMPLATES = {
  skeptic: {
    'far-left': "You've explored some challenging perspectives on immigration policy. While the data you've seen highlights {keyInsight}, we understand you may have questions about systemic approaches. What matters is that you're thinking critically about how {value1} and {value2} intersect with this issue. Every journey toward understanding starts with curiosity.",
    'center-left': "Thanks for exploring the nuances of immigration policy with us. You've encountered data showing {keyInsight}, and while you may still be weighing the evidence, your engagement shows you care about finding {value1} solutions. We believe that when armed with facts, people like you can make a real difference.",
    'center-right': "You've taken time to review important data about immigration's impact. The information you've seen regarding {keyInsight} presents real questions about {concern1} and {value1}. We appreciate your careful consideration of this complex issue - thoughtful analysis is the foundation of sound policy.",
    'far-right': "Thank you for examining the facts about immigration. The data you've reviewed on {keyInsight} speaks to legitimate concerns about {concern1} and {value1}. Your attention to these issues matters, and we hope this information helps you think through what's at stake for our nation.",
  },
  curious: {
    'far-left': "Your journey through this data reveals a growing understanding of how immigration intersects with {value1} and {value2}. You've discovered that {keyInsight}, which challenges some common misconceptions. Your {layerCount} layers of engagement show you're ready to move beyond simple narratives and embrace the complexity. The question now: how will you use this knowledge to advance {frame}?",
    'center-left': "You're clearly someone who values {value1} and {value2}, and your exploration of immigration data reflects that. Through {layerCount} layers of questions, you've learned that {keyInsight}. This kind of evidence-based understanding is exactly what we need more of. The path forward starts with people like you who are willing to engage with the facts.",
    'center-right': "Your thoughtful engagement with {layerCount} layers of immigration data shows a commitment to understanding the real impacts. You've discovered that {keyInsight}, which has important implications for {concern1} and {value1}. This balanced perspective - grounded in facts rather than rhetoric - is crucial for finding solutions that work.",
    'far-right': "You've engaged seriously with {layerCount} layers of immigration data, showing a real commitment to understanding the facts. The evidence you've reviewed reveals that {keyInsight}, which directly relates to concerns about {concern1} and {value1}. Your willingness to examine the data puts you ahead of those who rely only on talking points.",
  },
  engaged: {
    'far-left': "Your deep engagement speaks volumes. Through {layerCount} layers, you've uncovered powerful evidence that {keyInsight}. This aligns with your commitment to {value1} and {value2}, and shows you understand that immigration isn't just about policy - it's about people and systemic change. You've moved beyond awareness to conviction. The data has shown you why {frame} matters, and why we need voices like yours demanding action now.",
    'center-left': "You've demonstrated real commitment to understanding immigration through {layerCount} layers of engagement. The data has revealed that {keyInsight}, confirming what many of us believe: this is about {value1} and {value2}. Your journey shows you're not content with surface-level understanding. You're someone who can translate evidence into action, and that's exactly what this moment demands.",
    'center-right': "Your thorough exploration of {layerCount} layers shows exceptional dedication to understanding this issue. You've learned that {keyInsight}, which has significant implications for {value1} and {concern1}. This level of engagement - seeking facts, weighing evidence, considering consequences - is precisely what responsible citizenship looks like. You're positioned to be a voice of reason in these debates.",
    'far-right': "Your comprehensive review of {layerCount} layers of data demonstrates serious commitment to the facts. The evidence conclusively shows that {keyInsight}, directly addressing concerns about {concern1} and {value1}. You've gone beyond rhetoric to understand the real stakes. This is about {frame}, and you've shown you're ready to stand for what the data proves matters.",
  },
  champion: {
    'far-left': "You are exactly what this movement needs. Your journey through {layerCount} layers has revealed undeniable truths: {keyInsight}. This isn't just data - it's a call to action for {frame}. You understand that {value1} and {value2} aren't abstract ideals but urgent necessities. You've seen the evidence. You've felt the weight of what's at stake. Now it's time to turn your conviction into action that creates real change.",
    'center-left': "You're a champion for evidence-based change. Through {layerCount} layers of deep engagement, you've discovered that {keyInsight}. This confirms what you already knew in your heart about {value1} and {value2}, but now you have the data to back it up. Your comprehensive understanding makes you uniquely positioned to advocate for reform. The question isn't whether to act - it's how quickly you can start.",
    'center-right': "Your exceptional engagement with {layerCount} layers of data has equipped you with comprehensive understanding. The evidence is clear: {keyInsight}. This has profound implications for {value1} and {concern1}. You've done the work most people won't do - diving deep into facts and emerging with conviction. You're now uniquely positioned to be a voice for balanced, effective policy. Leadership demands action.",
    'far-right': "You've completed a comprehensive review of the facts, and the evidence is overwhelming: {keyInsight}. Your journey through {layerCount} layers proves you're serious about {value1} and {concern1}. You understand the stakes better than most. You've seen the data that others ignore. You know this is about {frame}, and you have the facts to prove it. Champions like you don't just understand the issue - you act on it.",
  },
}

// Generate key insight based on result type and answers
function generateKeyInsight(journey: UserJourney): string {
  const yesCount = Object.values(journey.answers).filter(a => a === 'yes').length
  const engagementLevel = yesCount / journey.layersCompleted

  const insights: Record<string, string> = {
    revenue: engagementLevel > 0.7
      ? "pathways to citizenship could generate billions in revenue while strengthening communities"
      : "immigration policy has significant economic implications worth examining",
    economic: engagementLevel > 0.7
      ? "undocumented immigrants are essential to industries that power our daily lives"
      : "immigration plays a complex role in our economic landscape",
    security: engagementLevel > 0.7
      ? "comprehensive immigration reform enhances national security more than deportation"
      : "security concerns require nuanced, fact-based approaches",
    demographic: engagementLevel > 0.7
      ? "immigration is critical to sustaining communities and institutions across America"
      : "demographic trends reveal important patterns about immigration",
  }

  return insights[journey.resultType]
}

// Get persuasion profile based on score
function getPersuasionProfile(score: number): PersuasionProfile {
  for (const profile of Object.values(PERSUASION_PROFILES)) {
    if (score >= profile.scoreRange[0] && score <= profile.scoreRange[1]) {
      return profile
    }
  }
  return PERSUASION_PROFILES.champion // Default to highest
}

// Calculate conviction scores from journey
export function calculateConvictionScores(journey: UserJourney): void {
  const maxScore = journey.layersCompleted * 2 // Max is 2 points per question
  const yesCount = Object.values(journey.answers).filter(a => a === 'yes').length
  const maybeCount = Object.values(journey.answers).filter(a => a === 'maybe').length

  // Value alignment: How aligned are their answers with the progressive position
  journey.convictionScores.valueAlignment = Math.round(
    ((yesCount * 2 + maybeCount * 1) / maxScore) * 100
  )

  // Data awareness: How many layers they completed (completion rate)
  journey.convictionScores.dataAwareness = Math.round(
    (journey.layersCompleted / 5) * 100 // Assuming 5 questions max
  )

  // Persuasion level: Based on score relative to max
  journey.convictionScores.persuasionLevel = Math.round(
    (journey.score / maxScore) * 100
  )

  // Engagement depth: Time spent and answer diversity
  const hasVariety = new Set(Object.values(journey.answers)).size > 1
  const depthBonus = hasVariety ? 20 : 0
  journey.convictionScores.engagementDepth = Math.min(100,
    Math.round((journey.layersCompleted / 5) * 80) + depthBonus
  )
}

// Main narrative generation function
export function generateNarrative(journey: UserJourney): string {
  const profile = getPersuasionProfile(journey.score)
  const ideology = IDEOLOGY_LANGUAGE[journey.theme]
  const template = NARRATIVE_TEMPLATES[profile.level][journey.theme]

  const keyInsight = generateKeyInsight(journey)

  // Replace template variables
  let narrative = template
    .replace('{keyInsight}', keyInsight)
    .replace('{layerCount}', journey.layersCompleted.toString())
    .replace('{value1}', ideology.values[0])
    .replace('{value2}', ideology.values[1])
    .replace('{frame}', ideology.frames[0])
    .replace('{concern1}', ideology.concerns[0])

  return narrative
}

// Generate personalized CTA priority scores
export interface CTAPriority {
  ctaId: string
  priority: number // 0-100
  reasoning: string
}

export function prioritizeCTAs(journey: UserJourney): CTAPriority[] {
  const profile = getPersuasionProfile(journey.score)
  const baseScore = journey.convictionScores.persuasionLevel

  // CTA priority based on persuasion level
  const ctaPriorities: Record<string, Record<string, number>> = {
    skeptic: {
      'spread-word': 30,
      'petition': 50,
      'donation': 20,
      'contact-reps': 40,
    },
    curious: {
      'spread-word': 60,
      'petition': 70,
      'donation': 40,
      'contact-reps': 65,
    },
    engaged: {
      'spread-word': 80,
      'petition': 85,
      'donation': 70,
      'contact-reps': 90,
    },
    champion: {
      'spread-word': 95,
      'petition': 100,
      'donation': 90,
      'contact-reps': 100,
    },
  }

  const priorities = ctaPriorities[profile.level]

  return Object.entries(priorities).map(([ctaId, basePriority]) => ({
    ctaId,
    priority: Math.round((basePriority + baseScore) / 2),
    reasoning: profile.level === 'champion'
      ? "Your conviction demands action"
      : profile.level === 'engaged'
      ? "You're ready to make a difference"
      : profile.level === 'curious'
      ? "Take the next step in your journey"
      : "Explore ways to stay engaged",
  }))
}

// Generate share message based on journey
export function generateShareMessage(journey: UserJourney): string {
  const profile = getPersuasionProfile(journey.score)
  const ideology = IDEOLOGY_LANGUAGE[journey.theme]

  const shareMessages: Record<string, string> = {
    skeptic: `I just explored some eye-opening data about immigration policy. Worth checking out.`,
    curious: `I learned some surprising facts about immigration that challenge common assumptions. Take a look.`,
    engaged: `The data on immigration is compelling. I'm convinced we need to talk about ${ideology.frames[0]}.`,
    champion: `I just completed a deep dive into immigration data and I'm ready to act. Join me in pushing for ${ideology.frames[0]}.`,
  }

  return shareMessages[profile.level]
}
