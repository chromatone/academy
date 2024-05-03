<script setup>

</script>

<template lang='pug'>
.m-4.max-w-55ch.flex.flex-col.gap-8
  AuthLogin

  .glass.p-4.flex.flex-col.gap-4
    .text-2xl Don't have one?
    NuxtLink.border-op-40.op-80.hover-op-100.transition.text-xl.p-4.border-6.border-purple-400.rounded-xl(to="/auth/signup/") Create a new aspirant account
</template>
