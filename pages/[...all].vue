<script setup>
const route = useRoute()
</script>

<template lang="pug">
.p-4.glass.flex.flex-col
  h1.text-2xl 404!
  p Current route: {{ route.path }}
</template>
