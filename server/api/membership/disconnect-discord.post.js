import { z } from 'zod'

const subscriptionSchema = z.object({
  user: z.string().uuid(),
  discord_user: z.string(),
})

export default defineEventHandler(async event => {

  console.log('here')

  const config = useRuntimeConfig(event)
  const { data: body, error, success } = await readValidatedBody(event, b => subscriptionSchema.safeParse(b))

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The request should include a valid User UUID and a valid Discord User Id',
    })
  }

  console.log(body)


  return ''
})