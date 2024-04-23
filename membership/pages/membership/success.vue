<script setup>

const route = useRoute()
const sessionId = ref(route.query?.session_id || '')

const { data } = await useFetch('/api/membership/session', {
  method: 'POST',
  body: { session_id: sessionId.value }
})
</script>

<template lang='pug'>
.flex.flex-col.gap-6.p-6.glass.max-w-55ch.m-4
  .text-2xl Payment successful!
  .text-md We've received your subscription payment. Your account will be upgraded to Student and you will receive all the access rights to the Academy along with an invitation to the Discord server soon.
  .flex.gap-2
    NuxtLink.op-95.hover-op-100.transition.p-2.bg-purple.rounded-xl.shadow.text-lg(to="/me") Go to my member page
    form(action="/api/membership/manage" method="POST")
      input(type="hidden" id="session-id" name="session_id" :value="sessionId")
      button.text-left.w-full.p-2.bg-purple.op-80.hover-op-100.transition.rounded-xl.shadow.text-lg(type="submit") Manage your subscription on Stripe

  .text-xl Stay tuned!  
</template>