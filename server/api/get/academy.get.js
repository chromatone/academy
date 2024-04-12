import { readSingleton } from '@directus/sdk'


export default defineEventHandler(async event => {

  const db = usePublicDirectus()

  const academy = await db.request(readSingleton('academy'))
  return academy

})