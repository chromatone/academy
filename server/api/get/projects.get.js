import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {

  const db = usePublicDirectus()
  return await db.request(readItems('projects', {
    sort: ['sort'],
    fields: ['slug', 'color', 'title', 'description', 'cover', 'courses', 'events', {
      program: ['title', 'slug']
    }]
  }))
})