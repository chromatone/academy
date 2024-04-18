import { courseApplicationSchema } from "~/utils/schemas"
import { createDirectus, rest, createItem, staticToken, withToken, readMe } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => courseApplicationSchema.safeParse(body))

  if (!result.success) throw result.error.issues

  const dbManager = createDirectus(useRuntimeConfig().public.dbUrl).with(rest()).with(staticToken(useRuntimeConfig().dbManagerKey))

  const { course, student, token, prior_experience, motivation } = result.data

  const toAdd = {
    courses_slug: course,
    students_id: student,
    prior_experience,
    motivation,
    active: true,
  }

  try {

    const usr = await createDirectus(useRuntimeConfig().public.dbUrl).with(rest()).request(withToken(token, readMe({ fields: ['member.student'] })))

    const isMyStudent = usr.member?.[0]?.student?.[0] == student

    if (!isMyStudent) return createError({ status: 500, statusMessage: 'This is not your student' })

    const ok = await dbManager.request(createItem('courses_students', toAdd))
    return ok.id
  } catch (e) {
    return createError({ status: '500', message: 'Could not create an application' })
  }

})