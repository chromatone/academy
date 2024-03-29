import Stripe from 'stripe'

// import { z } from 'zod'

// const subscriptionSchema = z.object({
//   name: z.string().default('Guest'),
//   email: z.string().email(),
// })

export default defineEventHandler(async event => {
  const directus = useManagerDirectus()

  const stripe = useStripe()

  const body = await readBody(event)

  console.log(body)

  return '#'

  // const products = await stripe.products.list({
  //   ids: [body?.price]
  // })

  // const line_items = products.data?.map(d => ({ price: d?.default_price, quantity: body?.quantity || 1 }))


  // const session = await stripe.checkout.sessions.create({
  //   cancel_url: `${config.public.appDomain}/membership/cancel`,
  //   success_url: `${config.public.appDomain}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
  //   mode: 'subscription',
  //   line_items
  // })

  // return session.url
})