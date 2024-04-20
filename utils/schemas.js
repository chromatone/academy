import { z } from 'zod'


export const CourseApplicationSchema = z.object({
  student: z.number(),
  course: z.string(),
  prior_experience: z.string(),
  motivation: z.string(),
  token: z.string()
})

export const ModuleApplicationSchema = z.object({
  students_id: z.number(),
  modules_id: z.string(),
  token: z.string()
})

// export const CourseApplicationSchema = z.object({
//   member: z.string().uuid(),
//   course: z.string(),
//   prior_experience: z.string().min(12, { message: 'Prior experience must be at least 12 characters long' }),
//   motivation: z.string().min(12, { message: 'Motivation must be at least 12 characters long' }),
//   token: z.string().default('no token')
// })