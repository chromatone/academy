<script setup>
const { academy } = await useMeta()
</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.px-4
  //- .flex.flex-col.gap-4.flex-1.max-w-55ch
  AuthLogin 
  .p-4.glass.flex-1.items-center.flex.justify-center
    .text-lg.text-center or
  AuthSignup 
    .text-2xl Create a new account
</template>

<style lang="postcss" scoped>
input {
  @apply p-2 text-lg rounded dark-bg-dark-200;
  flex: 1 1 200px
}

label {
  @apply p-2 text-lg;
}
</style>
