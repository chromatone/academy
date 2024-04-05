import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {

  const db = usePublicDirectus()
  return await db.request(readItems('courses', {
    sort: ['sort'],
    fields: ['slug', 'color', 'projects', 'title', 'description', 'cover']
  }))
})