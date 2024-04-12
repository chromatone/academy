import { readUser } from '@directus/sdk'

import { z } from 'zod'

const requestSchema = z.object({
  user: z.string().uuid(),
})

export default defineEventHandler(async event => {

  const db = usePublicDirectus()

  const { success, data } = await readValidatedBody(event, requestSchema.safeParse)

  if (!success) return createError({
    statusCode: 500,
    statusMessage: 'not valid user UUID'
  })

  try {
    const user = await db.request(readUser(data?.user))
    return user
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: 'No such user found'
    })
  }

})