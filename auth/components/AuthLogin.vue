<script setup>
const { login } = useDirectusAuth();
const user = useDirectusUser();

defineEmits(['email'])

const u = reactive({
  email: '',
  password: ''
})

const error = ref('')

const onSubmit = async () => {
  try {
    await login(u);
  } catch (e) {
    error.value = e
  }
};


watch(user, us => us ? navigateTo('/my/') : '')


</script>

<template lang='pug'>
form.p-4.flex.flex-col.gap-4.max-w-55ch.glass(
  @submit.prevent.stop="onSubmit()")
  .text-2xl Login to your account
  .flex.text-right
    label.flex-1(for="email") Email
    input#email(
      @input="$emit('email', $event.target.value)"
      type="text"
      v-model="u.email")
  .flex
    label.text-right.flex-1(for="password") Password
    input#password(
      type="password"
      v-model="u.password")
  button.flex-1(type="s") Login
  .px-2.text-red(v-if="error") Hm... Error. Check both fields and try again.
</template>
