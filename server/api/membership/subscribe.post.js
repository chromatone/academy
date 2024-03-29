import { z } from 'zod'
import { readItem, readUser } from '@directus/sdk'

const subscriptionSchema = z.object({
  user: z.string().uuid(),
  plan: z.string().uuid(),
})

export default defineEventHandler(async event => {

  const stripe = useStripe()

  const { data: body, error, success } = await readValidatedBody(event, b => subscriptionSchema.safeParse(b))

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The request should include a valid user UUID and a valid subscription plan UUID',
    })
  }

  const plan = await useDirectus().request(readItem('plans', body.plan))

  const user = await useDirectus().request(readUser(body.user))

  console.log(user)

  const products = await stripe.products.list({
    ids: [plan.stripe_product]
  })

  const line_items = products.data?.map(d => ({ price: d?.default_price, quantity: 1 }))

  console.log(line_items)

  // const session = await stripe.checkout.sessions.create({
  //   cancel_url: `${config.public.appDomain}/membership/cancel`,
  //   success_url: `${config.public.appDomain}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
  //   mode: 'subscription',
  //   line_items
  // })


  // return session.url

  return '#'
})