<script setup>
definePageMeta({ middleware: ["auth"] })
const route = useRoute()
</script>

<template lang='pug'>
p {{ route.params }}
</template>