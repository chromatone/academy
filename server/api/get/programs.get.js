import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {

  const db = usePublicDirectus()
  return await db.request(readItems('programs', {
    sort: ['sort'],
    fields: ['slug', 'color', 'projects', 'title', 'description', 'cover', 'courses']
  }))
})