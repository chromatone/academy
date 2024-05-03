import { aggregate, readItems } from '@directus/sdk'

export default defineEventHandler(async event => {

  const collection = getRouterParam(event, 'collection')
  const db = usePublicDirectus()


  try {
    return await db.request(aggregate(collection, {
      aggregate: { count: '*' }
    }))

  } catch (e) {
    console.log(e)
    return 0
  }


})