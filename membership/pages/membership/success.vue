<script setup>
definePageMeta({ middleware: ["auth"] })

const { academy } = await useMeta()

const route = useRoute()
const sessionId = ref(route.query?.session_id || '')

const { data } = await useFetch('/api/membership/session', {
  method: 'POST',
  body: { session_id: sessionId.value }
})
</script>

<template lang='pug'>
.flex.flex-col.gap-6.p-6.glass.max-w-55ch.m-4
  .text-2xl Welcome to the Chromatone Academy!
  .text-md We've received your subscription payment. Your account is upgraded to Student role and you now have the access rights to the Academy.

  DiscordConnect

  .flex.gap-2.flex-col
    NuxtLink.op-95.hover-op-100.transition.p-2.bg-purple-300.dark-bg-purple-700.rounded-xl.shadow.text-lg.flex-1(to="/me/") Go to your member page
</template>