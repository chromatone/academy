import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {

  const db = usePublicDirectus()
  return await db.request(readItems('academy_docs', {
    sort: ['sort'],
    fields: ['*']
  }))
})