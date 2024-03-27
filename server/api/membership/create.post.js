import Stripe from 'stripe'

export default defineEventHandler(async event => {

  const config = useRuntimeConfig(event)
  const stripe = new Stripe(config.stripeSecretKey)

  const body = await readBody(event)


  return ''
})