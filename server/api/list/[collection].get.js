import { readItems } from '@directus/sdk'

const collections = {
  members: ['members', {
    fields: ['*', 'user.*',]
  }],
  team: ['members', {
    fields: ['*', 'user.*'],
    filter: {
      team: {
        _nnull: true
      }
    }
  }],
  students: ['members', {
    fields: ['*', 'user.*'],
    filter: {
      student: {
        _nnull: true
      }
    }
  }],
  courses: ['courses', {
    fields: ['*', 'program.title', 'program.slug']
  }],
  modules: ['modules', {
    fields: ['*', 'course.title', 'course.slug']
  }],
  units: ['units', {
    fields: ['*', 'module.title', 'module.slug', 'module.course.slug', 'module.course.title']
  }],
  crafts: [
    'crafts',
    {
      sort: ['sort'],
      fields: ['*']
    }
  ],
  skills: [
    'skills',
    {
      sort: ['sort'],
      fields: ['*']
    }
  ],
  programs: [
    'programs',
    {
      sort: ['sort'],
      fields: ['slug', 'color', 'projects', 'title', 'description', 'cover', 'courses']
    }],
  projects: [
    'projects',
    {
      sort: ['sort'],
      fields: ['slug', 'color', 'title', 'description', 'cover', 'courses', 'events', 'artifacts', {
        program: ['title', 'slug']
      }]
    }],
  events: ['events', {
    fields: ['*', 'project.slug', 'project.title']
  }],
  docs: [
    'academy_docs',
    {
      sort: ['sort'],
      fields: ['*']
    }],
  newsletters: [
    'newsletters',
    {
      fields: ['title', 'description', {
        issues: ['title', 'description', {
          news: ['title', 'description']
        }]
      }]
    }
  ],
  news: [
    'news',
    { fields: ['slug', 'title', 'description', 'date'] }
  ],
  updates: [
    'project_updates',
    { fields: ['*', 'project.slug', 'project.title'] }
  ]

}

export default defineEventHandler(async event => {

  const collection = getRouterParam(event, 'collection')
  const db = usePublicDirectus()

  if (collections[collection]) {
    try {
      return await db.request(readItems(collections[collection][0], collections[collection][1]))
    } catch (e) {
      console.log(e)
    }

  }

  console.log('No ' + collection + ' collection')
  return []

})