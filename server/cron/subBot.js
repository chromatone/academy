import { defineCronHandler } from '#nuxt/cron'
import { createDirectus, readItems, rest, staticToken, updateItem } from '@directus/sdk'

export default defineCronHandler('daily', async () => {

  const config = useRuntimeConfig()
  const db = createDirectus(config.public.dbUrl).with(rest()).with(staticToken(config.dbManagerKey))




  const subs = await db.request(readItems('subscriptions', {
    filter: {
      status: {
        _eq: 'incomplete'
      },
      date_created: {
        _lt: new Date(Date.now() - 1000 * 60 * 60 * 48)
      }
    }
  }))

  if (subs?.length > 0) {
    console.log(`Found ${subs?.length} incomplete subscriptions.`)
    for (let sub of subs) {

      await db.request(updateItem('subscriptions', sub?.id, {
        status: 'incomplete_expired'
      }))
      console.log(`${sub?.id} marked as unpaid.`)
    }
  }




}, { runOnInit: true })