// Legacy schema - kept for backward compatibility
import {questionType} from './question'

// New multi-layered system schemas
import {layeredQuestionType} from './layeredQuestion'
import {dataPointType} from './dataPoint'
import {impactPointType} from './impactPoint'
import {callToActionType} from './callToAction'

// User engagement schemas
import {petitionSignatureType} from './petitionSignature'
import {storyType} from './story'

// Export all schema types
export const schemaTypes = [
  // Legacy (deprecated but functional)
  questionType,

  // New multi-layered system
  layeredQuestionType,
  dataPointType,
  impactPointType,
  callToActionType,

  // User engagement
  petitionSignatureType,
  storyType,
]
