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
  } catch (e) {

    console.log(JSON.stringify(e))
    statusCode.value = e.statusCode
  }
};
</script>

<template lang='pug'>
.glass.p-4.flex.flex-col.gap-4
  slot  
  form.p-4.flex.flex-col.gap-4(
    @submit.prevent.stop="onSubmit()")
    .flex.gap-4
      label(for="first_name") First name
      input#first_name(
        type="text"
        v-model="u.first_name")
    .flex.gap-4
      label(for="last_name") Last name
      input#last_name(
        type="text"
        v-model="u.last_name")
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
    .text-sm.text-red(v-if="statusCode") {{ statusCode }}
</template>
