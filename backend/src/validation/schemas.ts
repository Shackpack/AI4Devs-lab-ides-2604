import { z } from 'zod';

// Email validation regex (RFC 5322 compliant)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Phone number validation regex (international format)
const phoneRegex = /^\+?[\d\s-]{10,}$/;

// Education schema
const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional()
});

// Experience schema
const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  description: z.string().optional()
});

// Candidate creation schema
export const createCandidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').regex(emailRegex, 'Invalid email format'),
  phone: z.string().min(1, 'Phone is required').regex(phoneRegex, 'Invalid phone number format'),
  address: z.string().optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional()
});

// Candidate update schema
export const updateCandidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  email: z.string().min(1, 'Email is required').regex(emailRegex, 'Invalid email format').optional(),
  phone: z.string().min(1, 'Phone is required').regex(phoneRegex, 'Invalid phone number format').optional(),
  address: z.string().optional(),
  education: z.array(educationSchema).optional(),
  experience: z.array(experienceSchema).optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

// Document upload schema
export const uploadDocumentSchema = z.object({
  candidateId: z.string().min(1, 'Candidate ID is required')
});

// Export email and phone regex for reuse
export { emailRegex, phoneRegex };
