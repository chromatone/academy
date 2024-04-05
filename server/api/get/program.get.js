import { readItems } from '@directus/sdk'

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const db = usePublicDirectus()
  const list = await db.request(readItems('programs', {
    filter: {
      slug: {
        _eq: query?.slug
      }
    },
    fields: ['*', 'projects.*', 'projects.program.title', 'courses.*', 'courses.craft.*', 'courses.modules.title', 'tutors.tutors_id.*']
  }))
  return list?.[0]
})