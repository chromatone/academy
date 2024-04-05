import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const db = usePublicDirectus()
  const list = await db.request(readItems('courses', {
    filter: {
      slug: {
        _eq: query?.slug
      }
    },
    fields: ['*', 'craft.*', 'program.title', 'program.slug', 'program.color', 'modules.*'
    ]
  }))
  return list?.[0]
})