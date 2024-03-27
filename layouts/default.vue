<script setup>
const secret = useRuntimeConfig().public.envTest
</script>

<template lang='pug'>
.flex.flex-col.gap-4.min-h-100vh
  NavBar {{ secret }}
  //- PricePanel
  .shadow-xl.flex-auto.pb-8.pt-4.flex-1
    slot
  PageFooter
</template>