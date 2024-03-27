
export default defineEventHandler(async event => {

  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const secret = useRuntimeConfig(event).stripeSecretKey

  return ''
})