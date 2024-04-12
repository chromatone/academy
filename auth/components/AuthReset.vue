<script setup>
import z from 'zod'

const schema = z.object({
  token: z.string(null, 'Token needed'),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/(?=.*\d)/, " - Include at least one digit (0-9)")
    .regex(/(?=.*[a-z])/, " - Include at least one lowercase letter (a-z)")
    .regex(/(?=.*[A-Z])/, " - Include at least one uppercase letter (A-Z)")
    .regex(/(?=.*[!@#$%^&*()_+}{';'?>.<,])/, " - Include at least one special character (!@#$%^&*)")
    .regex(/(?!.*\s).*$/i, " - No whitespace characters allowed")
});


const route = useRoute()

const { resetPassword } = useDirectusAuth();

const update = reactive({
  token: computed(() => route.query?.token),
  password: ''
})

const valid = computed(() => schema.safeParse(update))

const errorList = computed(() => valid.value?.error?.format())

const onSubmit = async () => {
  if (!valid.value) {
    return
  }
  try {

    await resetPassword(update)
    await navigateTo('/auth/login')
  } catch (e) { }
};

const inputType = ref('password')

function flipType() {
  if (inputType.value == 'password') {
    inputType.value = 'text'
  } else {
    inputType.value = 'password'
  }
}

</script>

<template lang='pug'>
.max-w-55ch.m-4(v-if="!update?.token") 
  .p-4.text-xl You have a new password!
  AuthLogin
.p-4.flex.flex-col.gap-4(v-else)
  .glass.p-4.max-w-55ch
    .text-2xl Set your new password

  form.form.glass.p-4.max-w-55ch.flex.flex-wrap.gap-6(submit.stop.prevent="onSubmit")
    .flex.gap-2.w-full
      input.flex-1.dark-bg-dark-200.border-2(
        :class="{ 'border-red': valid?.error, 'border-green': valid?.data }"
        :type="inputType" v-model="update.password" placeholder="Type here")
      button(@click.stop.prevent="flipType()")
        .i-la-eye(v-if="inputType == 'text'")
        .i-la-eye-slash(v-else)
      button(@click.stop.prevent="update.password = generatePassword()")
        .i-la-lock
    .p-2(v-for="error in errorList?.password?._errors"
      :key="error") {{ error }}
    button.w-full.text-xl(@click.stop.prevent="onSubmit" v-if="!valid?.error"
    :class="{ 'op-70': valid?.error }") Submit
</template>
