import { readItems } from '@directus/sdk'

const collections = {
  course: [
    'courses',
    {
      fields: ['*', 'craft.*', 'program.title', 'program.slug', 'program.color', 'modules.*', 'team.team_id.member.user', 'team.team_id.member.id', 'team.position', 'students.students_id.member.user', 'students.students_id.member.id']
    }],
  craft: [
    'crafts',
    { fields: ['*', 'skills.*', 'courses.*'] }
  ],
  skill: [
    'skills',
    { fields: ['*', 'module.*', 'module.course.title', 'module.course.slug'] }
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
      fields: ['*', 'units.*', 'course.*', 'course.program.title', 'course.program.slug', 'students.students_id.id', 'students.students_id.member.user', 'team.team_id.member.user', 'team.team_id.member.id', 'students.students_id.member.id'
      ]
    }
  ],
  program: [
    'programs',
    { fields: ['*', 'projects.*', 'projects.program.title', 'courses.*', 'courses.craft.*', 'courses.modules.title', 'team.team_id.member.user', 'team.team_id.member.id', 'team.position'] }
  ],
  project: [
    'projects',
    { fields: ['*', 'artifacts.*', 'events.*', 'program.title', 'program.slug', 'program.color', 'partners.partners_id.title', 'partners.partners_id.url'] }
  ],
  event: [
    'events',
    {
      fields: ['*', 'project.title', 'project.slug', 'project.program.title', 'project.program.slug', 'project.program.color', 'place.title', 'place.url']
    }
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