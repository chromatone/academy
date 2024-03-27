import { z } from 'zod'

const userSchema = z.object({
  name: z.string().default('Guest'),
  email: z.string().email(),
})

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => userSchema.safeParse(body)) // or `.parse` to directly throw an error

  if (!result.success)
    throw result.error.issues

  await joinWaitlist(result.data)
  // User object is validated and typed!
  return result.data
})