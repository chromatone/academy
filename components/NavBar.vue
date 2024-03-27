<script setup>
const user = useDirectusUser();

</script>

<template lang='pug'>
.flex.flex-wrap.items-center.gap-4.glass.p-3.my-1.mx-4.sticky.top-1.z-9000
  NuxtLink(to="/") academy
  NuxtLink.op-40(to="https://chromatone.center" target="_blank") chromatone.center
  DarkToggle
  .flex-1
    slot
  template(v-if="!user")
    NuxtLink(to="/auth/login") Login
    NuxtLink.bg-purple-400.dark-bg-purple-600.p-2.rounded-xl(to="/membership/subscribe") Subscribe
  template(v-else)
    NuxtLink.flex.gap-1(to="/student/")
      .i-la-user
      .text-sm {{ user?.first_name }}
      .text-sm {{ user?.last_name }}
  
</template>