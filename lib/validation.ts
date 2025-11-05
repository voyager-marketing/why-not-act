import {z} from 'zod'

// Common validation schemas for forms

// Email validation
export const emailSchema = z.string().email('Invalid email address')

// Phone validation (US format)
export const phoneSchema = z
  .string()
  .regex(/^(\+1)?[\s.-]?\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/, 'Invalid phone number')
  .optional()

// ZIP code validation (US 5-digit)
export const zipcodeSchema = z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits')

// State code validation (US 2-letter)
export const stateSchema = z
  .string()
  .length(2, 'State must be 2 characters')
  .regex(/^[A-Z]{2}$/, 'State must be uppercase letters')

// Name validation
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100)

// Address validation
export const addressSchema = z.string().min(5, 'Address is required').max(200)

// City validation
export const citySchema = z.string().min(2, 'City is required').max(100)

// Consent validation
export const consentSchema = z.boolean().refine((val) => val === true, {
  message: 'You must agree to continue',
})

// Text content validation (for stories, comments, etc.)
export const textContentSchema = (minLength: number, maxLength: number) =>
  z
    .string()
    .min(minLength, `Must be at least ${minLength} characters`)
    .max(maxLength, `Must not exceed ${maxLength} characters`)

// Petition signature schema
export const petitionSignatureSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  zipcode: zipcodeSchema,
  phone: phoneSchema,
  reason: z.string().max(500, 'Maximum 500 characters').optional(),
  consent: consentSchema,
})

// Story submission schema
export const storySubmissionSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema,
  story: textContentSchema(50, 2000),
  allowPublish: z.boolean(),
  allowContact: z.boolean(),
})

// Letter to Congress schema
export const letterSchema = z.object({
  name: nameSchema,
  address: addressSchema,
  city: citySchema,
  state: stateSchema,
  zipcode: zipcodeSchema,
  email: emailSchema.optional(),
  representative: z.string().optional(),
})

// Helper functions for validation

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

/**
 * Validate US ZIP code
 */
export function isValidZipcode(zipcode: string): boolean {
  try {
    zipcodeSchema.parse(zipcode)
    return true
  } catch {
    return false
  }
}

/**
 * Validate US phone number
 */
export function isValidPhone(phone: string): boolean {
  try {
    phoneSchema.parse(phone)
    return true
  } catch {
    return false
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Validate content length
 */
export function validateContentLength(
  content: string,
  minLength: number,
  maxLength: number
): {valid: boolean; error?: string} {
  if (content.length < minLength) {
    return {valid: false, error: `Content must be at least ${minLength} characters`}
  }
  if (content.length > maxLength) {
    return {valid: false, error: `Content must not exceed ${maxLength} characters`}
  }
  return {valid: true}
}

/**
 * Format phone number to standard format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

/**
 * Rate limiting check (simple in-memory implementation)
 * In production, use Redis or similar
 */
const rateLimitMap = new Map<string, {count: number; resetTime: number}>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000
): {allowed: boolean; remaining: number; resetTime: number} {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    // Create new record or reset existing
    const newResetTime = now + windowMs
    rateLimitMap.set(identifier, {count: 1, resetTime: newResetTime})
    return {allowed: true, remaining: maxRequests - 1, resetTime: newResetTime}
  }

  if (record.count >= maxRequests) {
    return {allowed: false, remaining: 0, resetTime: record.resetTime}
  }

  record.count++
  rateLimitMap.set(identifier, record)
  return {allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime}
}

/**
 * Clean up old rate limit entries (call periodically)
 */
export function cleanupRateLimits() {
  const now = Date.now()
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// Type exports
export type PetitionSignatureData = z.infer<typeof petitionSignatureSchema>
export type StorySubmissionData = z.infer<typeof storySubmissionSchema>
export type LetterData = z.infer<typeof letterSchema>
