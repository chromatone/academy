<script setup>
import { z } from 'zod'
import { createDirectus, rest, passwordRequest } from '@directus/sdk';

const props = defineProps({
  email: { type: String, default: '' }
})

const emailSchema = z.string().email();

const valid = computed(() => emailSchema.safeParse(props.email))

const isReset = ref(false)

const onReset = async () => {
  try {

    const db = createDirectus(useRuntimeConfig().public.dbUrl).with(rest())
    const result = await db.request(passwordRequest(props.email, 'https://academy.chromatone.center/auth/reset'));
    isReset.value = result
  } catch (e) {
    console.log(e)
  }
};


</script>

<template lang='pug'>
.p-2.flex.flex-col.gap-4(v-if="isReset") 
  .text-xl Your password reset request has been processed. Check your inbox for an email with a reset link.

form.flex.flex-wrap.items-baseline.gap-4(
  v-else
  @submit.prevent.stop="onReset()")
  .text-right.text-lg Forgot your password?
  .p-0.op-60(v-if="!email") Provide account email to request a reset link
  .p-0.op-60(v-else-if="!valid?.success") Type a valid email to request a reset link
  button.flex-1.text-purple-500.text-left(
    v-else
    type="submit") Request reset to {{ email }}
</template>
