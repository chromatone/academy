import { readItem } from '@directus/sdk'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const db = usePublicDirectus()
  return await db.request(readItem('academy_docs', query.slug, {
    sort: ['sort'],
    fields: ['*']
  }))
})