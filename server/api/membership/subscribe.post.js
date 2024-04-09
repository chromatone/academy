import { z } from 'zod'
import { createDirectus, rest, staticToken, readItem, readUser, createItem, updateItem } from '@directus/sdk'

import Stripe from 'stripe'

const subscriptionSchema = z.object({
  user: z.string().uuid(),
  plan: z.string().uuid(),
})

export default defineEventHandler(async event => {

  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  const db = createDirectus(config.public.dbUrl).with(rest()).with(staticToken(config.dbManagerKey))


  const { data: body, error, success } = await readValidatedBody(event, b => subscriptionSchema.safeParse(b))

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The request should include a valid user UUID and a valid subscription plan UUID',
    })
  }

  const plan = await db.request(readItem('plans', body.plan))
  const user = await db.request(readUser(body.user, { fields: ['*'] }))

  if (!user.member || (user?.member && user?.member?.length == 0)) {

    const member = await db.request(createItem('members', {
      active: false,
      user: user.id,
      role: 'aspirant'
    }))

    console.log('created new member')
    user.member = [member.id]
  }


  const member = await db.request(readItem('members', user.member[0]))

  const customerData = {}

  if (member?.stripe_customer_id) {
    customerData.customer = member.stripe_customer_id
  } else {
    customerData.customer_email = user?.email
  }

  const subscription = await db.request(createItem('subscriptions', {
    status: 'draft',
    member: user.member[0],
    plan: plan.id,
  }))


  const session = await stripe.checkout.sessions.create({
    cancel_url: `${config.public.appDomain}/membership/cancel`,
    success_url: `${config.public.appDomain}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: 'subscription',
    ...customerData,
    metadata: {
      member: member.id,
      plan: plan.id,
      subscription: subscription.id
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: plan.title,
            description: plan.description
          },
          recurring: {
            interval: 'month',
          },
          unit_amount: plan.price * 100,
        },
      },
    ]
  })

  await db.request(updateItem('subscriptions', subscription.id, {
    status: 'incomplete',
    stripe_session_id: session.id,
    stripe_session_url: session.url
  }))


  return session.url


})