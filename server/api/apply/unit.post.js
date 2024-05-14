import { UnitApplicationSchema } from "~/utils/schemas"
import { createDirectus, rest, createItem, staticToken, withToken, readMe, updateItem } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => UnitApplicationSchema.safeParse(body))

  if (!result.success) {
    throw createError({ statusCode: '501', statusMessage: 'Invalid input' })
  }

  const { units_id, students_id, token } = result.data

  const directus = createDirectus(useRuntimeConfig().public.dbUrl).with(rest())

  const dbManager = directus.with(staticToken(useRuntimeConfig().dbManagerKey))

  const usr = await directus.request(withToken(token, readMe({ fields: ['member.student.*', 'member.student.units.*'] })))

  if (usr.member?.[0]?.student?.[0]?.id != students_id) return createError({ status: 500, statusMessage: 'This is not your student' })

  const hasUnit = usr.member?.[0]?.student?.[0]?.units?.find(u => u.units_id == units_id)

  const date = new Date().toISOString()

  if (!hasUnit) {
    dbManager.request(createItem('units_students', {
      units_id,
      students_id,
      start_date: date,
      last_visit: date
    }))
  } else {
    dbManager.request(updateItem('units_students', hasUnit?.id, {
      last_visit: date
    }))
  }

  return hasUnit

})