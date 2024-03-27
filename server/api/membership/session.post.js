import Stripe from 'stripe'


export default defineEventHandler(async event => {

  const config = useRuntimeConfig(event)

  const stripe = new Stripe(config.stripeSecretKey)
  const body = await readBody(event)
  const session_id = body.session_id

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

  const { amount_total, created, currency, customer_details: { email, name, address }, payment_status, subscription, status } = checkoutSession

  return { amount_total, created, currency, email, name, address, payment_status, subscription, status }

})