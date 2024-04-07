import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const db = usePublicDirectus()
  const list = await db.request(readItems('projects', {
    filter: {
      slug: {
        _eq: query?.slug
      }
    },
    fields: ['*', 'artifacts.*', 'events.*', 'program.title', 'program.slug', 'program.color', 'partners.partners_id.title', 'partners.partners_id.url']
  }))
  return list?.[0]
})