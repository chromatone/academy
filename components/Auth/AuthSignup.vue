<script setup>
const u = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: ''
})


const statusCode = ref(0)

const onSubmit = async () => {
  const { createUser, login } = useDirectusAuth();

  try {
    await createUser(u)
    await login(u)
    await navigateTo('/student/')
  } catch (e) {

    console.log(JSON.stringify(e))
    statusCode.value = e.statusCode
  }
};
</script>

<template lang='pug'>
.glass.max-w-55ch
  .text-2xl.text-center.p-2 Sign Up {{ statusCode || '' }}
  form.p-4.flex.flex-col.gap-4(
    @submit.prevent.stop="onSubmit()")
    .flex.gap-4
      label(for="first_name") First name
      input#first_name(
        type="text"
        v-model="u.first_name")
    .flex.gap-4
      label(for="email") Email
      input#email(
        type="text"
        v-model="u.email")
    .flex.gap-4
      label(for="password") Password
      input#password(
        type="password"
        v-model="u.password")
    button(type="submit") Sign up
</template>
