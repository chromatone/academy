<script setup>
const { requestPasswordReset } = useDirectusAuth();
const user = useDirectusUser();

const u = reactive({
  email: '',
  reset_url: 'https://academy.chromatone.center/auth/reset'
})

const props = defineProps({
  email: { type: String, default: '' }
})

watch(() => props.email, email => {
  u.email = email
})

const onSubmit = async () => {
  try {
    await requestPasswordReset(u);
    isReset.value = true
  } catch (e) {
    console.log(e)
  }
};

const isReset = ref(false)
</script>

<template lang='pug'>
.p-4.flex.flex-col.gap-4.max-w-55ch.glass(v-if="isReset") 
  .text-xl Your password reset request has been processed. Check your inbox for a reset link.
.max-w-55ch.glass.p-4(v-else)
  form.form.flex.flex-col.gap-4(
    @submit.prevent.stop="onSubmit()")
    .text-center.text-2xl Request password reset 
    .flex.text-right
      label.flex-1(for="email") Email
      input#email(
        type="text"
        v-model="u.email")
    button.flex-1.bg-purple-500(type="submit") Request reset
</template>
