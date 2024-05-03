<script setup>
import { createDirectus, readMe, rest, withToken } from '@directus/sdk';

const props = defineProps({
  course: { type: String, default: '' }
})

const { token } = useDirectusToken()

const db = createDirectus(useRuntimeConfig().public.dbUrl).with(rest())

const usr = await db.request(withToken(token.value, readMe({
  fields: ['*', 'member.*', 'member.student']
})))

const application = reactive({
  student: usr?.member?.[0]?.student?.[0],
  course: props.course,
  prior_experience: '',
  motivation: '',
  token: token.value,
})

async function sendApplication() {

  const { success, error, data } = CourseApplicationSchema.safeParse
    (application)

  if (success) {
    await $fetch('/api/apply/course', {
      method: 'POST',
      body: data
    })
    navigateTo(`/courses/${props.course}/`)
  } else {
    error.issues.forEach(e => {
      console.log(usr)
      push.error(e.message)
    })

  }
}
</script>

<template lang='pug'>
.flex.flex-wrap.overflow-clip.items-start.gap-4
  .max-w-55ch.glass.p-4.flex.flex-col.gap-4
    h1.text-4xl Welcome!
    .text-md Apply to the course by sharing a snapshot of where you are and where are you going.

  form.form.flex.flex-col.gap-4(
    @submit.prevent="sendApplication()"
    )
    .max-w-55ch.glass.p-4.flex.flex-col.gap-4
      .text-2xl Prior experience
      .text-sm Tell us about your journey. 
        ul.p-4.flex.flex-col.gap-2
          li.list-circle When and how did you become interested in topics of the course? 
          li.list-circle What level of knowledge and practical skills do you currently have? 
          li.list-circle Where, when and how long have you studied to get to this point? 
      textarea(
        v-model="application.prior_experience"
        placeholder="I've learned a bit by myself back in my school days, then..."
        )
    .max-w-55ch.glass.p-4.flex.flex-col.gap-4
      .text-2xl Motivation
      .text-sm Tell us about your goals and aspirations. 
        ul.p-4.flex.flex-col.gap-2 
          li.list-circle Why are you interested in studying this topic? 
          li.list-circle What do you see the most important to learn? 
          li.list-circle How do you suppose to use the skills and knowledge, aquired throughout this course?
      textarea(
        v-model="application.motivation"
        placeholder="I'm interested in this course because..."
        )
    .text-md Press Apply button and you will be automatically enrolled into the course and get full access to it's content. 
    button.button(type="submit") Apply for course
    .text-sm Your Experience and Motivation texts may be shared on your personal Student page and may be viewed by other students.
</template>