<script setup>

</script>

<template lang='pug'>
.flex.flex-col.gap-4.min-h-100vh
  DarkToggle.fixed.top-8.right-6.scale-120.z-100
  main.flex-auto.flex-1
    slot
  PageFooter
</template>