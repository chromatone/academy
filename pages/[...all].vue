<script setup>
const route = useRoute()
</script>

<template>
  <div>
    <h1>404!</h1>
    <p>Current route: {{ route.path }}</p>
  </div>
</template>
