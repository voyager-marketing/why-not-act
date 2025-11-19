import type {Theme, ResultType} from '@/types/form'

export function getResultType(score: number, theme: Theme): ResultType {
  const isLeft = theme === 'far-left' || theme === 'center-left'
  const isRight = theme === 'center-right' || theme === 'far-right'

  // High engagement (8-10 points)
  if (score >= 8) {
    return isLeft ? 'revenue' : 'security'
  }

  // Moderate engagement (4-7 points)
  if (score >= 4) {
    return isLeft ? 'economic' : 'demographic'
  }

  // Low engagement (0-3 points)
  return isLeft ? 'economic' : 'demographic'
}

export const RESULT_PAGE_CONTENT = {
  revenue: {
    title: 'Revenue Generation',
    color: 'bg-red-500',
    bullets: [
      'Generated from a fine of $30,000 collected from each Undocumented Immigrant',
      'Increase in the number of taxing paying members/companies into the US society',
      'Lowered impact to the costs of the healthcare system',
      'Increased number of legal applications for the banking industry',
      'Lowered risk of monetary flight of off-shored monies when faced with deportation',
      'Increased ability of Undocumented Immigrant owned companies to expand the US economy',
    ],
    ctas: ['petition', 'contact-reps'],
  },
  economic: {
    title: 'Economic Impact',
    color: 'bg-gray-500',
    bullets: [
      'Percent of Undocumented Immigrants working in Elder Care',
      'Percent of Undocumented Immigrants working in Construction',
      'Percent of Undocumented Immigrants working in Agriculture',
      'Percent of Undocumented Immigrants working in Logistics/Warehousing',
      'Percent of Undocumented Immigrants working in Transportation / Shipping',
      'Percent of Undocumented Immigrants working in Manufacturing',
    ],
    ctas: ['donation', 'spread-word'],
  },
  security: {
    title: 'National Security',
    color: 'bg-black',
    bullets: [
      'By applying the collected fines, the Border Wall could be more quickly and easily funded and built',
      'Lowers the mission of ICE in finding the criminal Undocumented Immigrant elements',
      'Creates safer and more table communities',
      'Could create a method for Undocumented Immigrants to join the military',
      'Could create more aligned and unified countries in the NORTHCOM / SOUTHCOM Area of Responsibility',
    ],
    ctas: ['spread-word', 'donation'],
  },
  demographic: {
    title: 'Demographic Impact',
    color: 'bg-yellow-500',
    bullets: [
      'Future population growth with and without Undocumented Immigrants',
      'Increase the tax base of the of smaller communities currently struggling to keep their infrastructures intact',
      'Increased legal immigrants will reduce small town economies and increase overall participation in institutions like Schools (at all levels), Churches, Charities, etc...',
    ],
    ctas: ['contact-reps', 'petition'],
  },
}
