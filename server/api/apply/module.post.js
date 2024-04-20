import { ModuleApplicationSchema } from "~/utils/schemas"
import { createDirectus, rest, createItem, staticToken, withToken, readMe, updateItem } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => ModuleApplicationSchema.safeParse(body))

  if (!result.success) {
    throw createError({ statusCode: '501', statusMessage: 'Invalid input' })
  }

  const { modules_id, students_id, token } = result.data

  const directus = createDirectus(useRuntimeConfig().public.dbUrl).with(rest())

  const dbManager = directus.with(staticToken(useRuntimeConfig().dbManagerKey))

  const usr = await directus.request(withToken(token, readMe({ fields: ['member.student.*', 'member.student.modules.*'] })))

  if (usr.member?.[0]?.student?.[0]?.id != students_id) return createError({ status: 500, statusMessage: 'This is not your student' })

  const hasModule = usr.member?.[0]?.student?.[0]?.modules.find(m => m.modules_id == modules_id)

  if (!hasModule) {
    dbManager.request(createItem('modules_students', {
      modules_id,
      students_id,
      last_visit: new Date().toISOString()
    }))
  } else {
    dbManager.request(updateItem('modules_students', hasModule.id, {
      last_visit: new Date().toISOString()
    }))
  }

  return 'ok'

})