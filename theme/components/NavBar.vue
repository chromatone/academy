<script setup>
const user = useDirectusUser();

const { getItemById } = useDirectusItems()

const member = user.value?.member?.[0] ? await getItemById({
  collection: 'members',
  id: user.value?.member?.[0]
}) : {}

</script>

<template lang='pug'>
.flex.flex-wrap.items-center.gap-4.glass.p-3.mt-2.mx-4.sticky.top-2.z-9000
  NuxtLink(to="/") academy
  NuxtLink.op-40(to="https://chromatone.center" target="_blank") chromatone.center
  DarkToggle
  .flex-1
    slot
  template(v-if="!user?.email")
    NuxtLink(to="/auth/") Login
  template(v-else)
    NuxtLink.flex.gap-1(to="/me/")
      .i-la-user(v-if="!member?.active")
      .i-la-user-check(v-else)

      .text-sm {{ user?.first_name }}
      .text-sm {{ user?.last_name }}
  NuxtLink.bg-purple-400.dark-bg-purple-600.p-2.-my-2.rounded-xl(
    v-if="!user?.member?.[0]"
    to="/membership/subscribe") Subscribe
</template>