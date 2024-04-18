import { z } from 'zod'


export const courseApplicationSchema = z.object({
  student: z.number(),
  course: z.string(),
  prior_experience: z.string(),
  motivation: z.string(),
  token: z.string().default('no token')
})

// export const courseApplicationSchema = z.object({
//   member: z.string().uuid(),
//   course: z.string(),
//   prior_experience: z.string().min(12, { message: 'Prior experience must be at least 12 characters long' }),
//   motivation: z.string().min(12, { message: 'Motivation must be at least 12 characters long' }),
//   token: z.string().default('no token')
// })