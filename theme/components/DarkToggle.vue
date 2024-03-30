<script setup>
const colorMode = useColorMode()
</script>

<template lang='pug'>
button.bg-light-300.dark-bg-dark-300.rounded-full(@click="colorMode.preference = colorMode.preference == 'dark' ? 'light' : 'dark'")
  .i-carbon-sun(v-if="colorMode.preference == 'light'")
  .i-carbon-moon(v-else)
</template>