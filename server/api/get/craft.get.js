import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const db = usePublicDirectus()
  const list = await db.request(readItems('crafts', {
    filter: {
      slug: {
        _eq: query?.slug
      }
    },
    fields: ['*', 'skills.*', 'courses.*']
  }))
  return list?.[0]
})