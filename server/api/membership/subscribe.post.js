import Stripe from 'stripe'

export default defineEventHandler(async event => {
  // console.log(event)

  const config = useRuntimeConfig(event)
  const stripe = new Stripe(config.stripeSecretKey)

  const body = await readBody(event)

  const products = await stripe.products.list({
    ids: [body?.price]
  })

  const line_items = products.data?.map(d => ({ price: d?.default_price, quantity: body?.quantity || 1 }))

  const session = await stripe.checkout.sessions.create({
    cancel_url: `${config.public.appDomain}/membership/cancel`,
    success_url: `${config.public.appDomain}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
    mode: 'subscription',
    line_items
  })

  return session.url
})