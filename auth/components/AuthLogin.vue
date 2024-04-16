<script setup>
import { z } from 'zod'

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

const emailSchema = z.string().email();

const valid = computed(() => emailSchema.safeParse(u?.email))


watch(user, us => us ? navigateTo('/my/') : '')


</script>

<template lang='pug'>
.p-4.glass.flex.flex-col.gap-4
  form.form.flex.flex-col.gap-4(
    @submit.prevent.stop="onSubmit()")
    slot
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

    AuthRequestReset(:email="u.email")

    button.button.flex-1(
      type="submit"
      :disabled="!valid?.success") Login
    .px-2.text-red(v-if="error") Hm... Error. Check both fields and try again.



</template>
