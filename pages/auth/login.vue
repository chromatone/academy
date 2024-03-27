<script setup>
import PricePanel from '~/components/PricePanel.vue';
const email = ref('')
</script>

<template lang='pug'>
.flex.flex-wrap 
  .flex.flex-col.gap-4.px-4.flex-1
    AuthLogin(@email="email = $event")
    .p-4.text-center.max-w-55ch 
      .text-xl - or - {{ email }}
    AuthRequestReset(:email)
</template>
