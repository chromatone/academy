<script setup>

</script>

<template lang='pug'>
.flex.flex-col.min-h-100vh
  NavBar.mb-3
  main.shadow-xl.flex-auto.pb-8.flex-1
    slot
  PageNav
  PageFooter
</template>