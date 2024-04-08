import { readItems } from '@directus/sdk'

const collections = {
  crafts: [
    'crafts',
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
      fields: ['slug', 'color', 'title', 'description', 'cover', 'courses', 'events', {
        program: ['title', 'slug']
      }]
    }],
  docs: [
    'academy_docs',
    {
      sort: ['sort'],
      fields: ['*']
    }]
}

export default defineEventHandler(async event => {

  const collection = getRouterParam(event, 'collection')
  const db = usePublicDirectus()

  if (collections[collection]) {
    return await db.request(readItems(collections[collection][0], collections[collection][1]))
  }

  console.log('No ' + collection + ' collection')
  return []

})