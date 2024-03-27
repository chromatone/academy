<script setup>
const { academy } = await useMeta()
</script>

<template lang='pug'>
.flex.flex-col.gap-4.p-2
  .p-4.flex-1.flex.flex-col.gap-2.max-w-55ch
    .text-4xl Membership 
    .text-sm.uppercase Subscription

    .text-lg Chromatone Academy is funded directly by it's students membership fees. You can choose the plan that best suits your goals and pace.
    .text-2xl Features
    ul
      li.list-circle.ml-4.py-1.text-lg(v-for="feature in academy?.features") {{ feature?.title }}
  PricePanel
</template>