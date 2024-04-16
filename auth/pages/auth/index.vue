<script setup>
const { academy } = await useMeta()
</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.px-4
  //- .flex.flex-col.gap-4.flex-1.max-w-55ch
  AuthLogin.max-w-55ch(style="flex: 1 1 300px") 
    .text-2xl Login to your existing account...
  AuthSignup.max-w-55ch(style="flex: 1 1 300px")
    .text-2xl ...or create a new account
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
