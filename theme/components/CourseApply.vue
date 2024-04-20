<script setup>
import { createDirectus, readMe, rest, withToken } from '@directus/sdk';

const props = defineProps({
  course: { type: String, default: '' }
})

const { token } = useDirectusToken()

const db = createDirectus(useRuntimeConfig().public.dbUrl).with(rest())

const usr = await db.request(withToken(token.value, readMe({
  fields: ['member.*']
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
    error.issues.forEach(e => push.error(e.message))

  }
}
</script>

<template lang='pug'>
.flex.flex-wrap.overflow-clip.items-start.px-4.gap-4
  .max-w-55ch.glass.p-4.flex.flex-col.gap-4
    h1.text-4xl Welcome!
    .text-md To participate in this course you need to apply to it by filling out this simple form. Just press Apply and you will immediately get access to the course and we will get to know our students a bit better. 

  form.form.max-w-55ch.glass.p-4.flex.flex-col.gap-4(
    @submit.prevent="sendApplication()"
    )
    .text-xl Prior experience
    .text-sm Tell us about your journey. How and when did you start being interested in the topics of this course? What level of knowledge and practical skills do you have by now. Where, how and how long did you study to get there? 
    textarea(
      v-model="application.prior_experience"
      placeholder="I've learned a bit by myself back in my school days, then..."
      )
    .text-xl Motivation
    .text-sm Tell us about your goals and aspirations. Why are you interested in studying this topic? What do you see the most important to learn? How do you suppose to use the skills and knowledge, aquired throughout this course?
    textarea(
      v-model="application.motivation"
      placeholder="I'm interested in this course because..."
      )
    button.button(type="submit") Apply
</template>