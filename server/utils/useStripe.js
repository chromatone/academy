import Stripe from 'stripe'

let stripe

export function useStripe(event) {
  if (!stripe) {
    const config = useRuntimeConfig(event)
    stripe = new Stripe(config.stripeSecretKey)
  }
  return stripe
}

