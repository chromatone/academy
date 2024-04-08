import { readItems } from '@directus/sdk'

const collections = {
  course: [
    'courses',
    {
      fields: ['*', 'craft.*', 'program.title', 'program.slug', 'program.color', 'modules.*'
      ]
    }],
  craft: [
    'crafts',
    { fields: ['*', 'skills.*', 'courses.*'] }
  ],
  doc: [
    'academy_docs',
    {
      fields: ['*']
    }
  ],
  module: [
    'modules',
    {
      fields: ['*', 'units.*', 'course.*', 'course.program.title', 'course.program.slug'
      ]
    }
  ],
  program: [
    'programs',
    { fields: ['*', 'projects.*', 'projects.program.title', 'courses.*', 'courses.craft.*', 'courses.modules.title', 'tutors.tutors_id.*'] }
  ],
  project: [
    'projects',
    { fields: ['*', 'artifacts.*', 'events.*', 'program.title', 'program.slug', 'program.color', 'partners.partners_id.title', 'partners.partners_id.url'] }
  ]
}

export default defineEventHandler(async event => {

  const collection = getRouterParam(event, 'collection')
  const query = getQuery(event)
  const db = usePublicDirectus()

  if (collections[collection]) {
    return (await db.request(readItems(collections[collection][0], {
      filter: {
        slug: {
          _eq: query?.slug
        }
      },
      ...collections[collection][1]
    })))?.[0]
  }

  console.log('No ' + collection + ' collection')
  return []

})