import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const db = usePublicDirectus()
  const list = await db.request(readItems('modules', {
    filter: {
      slug: {
        _eq: query?.slug
      }
    },
    fields: ['*', 'units.*', 'course.*', 'course.program.title', 'course.program.slug'
    ]
  }))
  return list?.[0]
})