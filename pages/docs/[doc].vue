<script setup>
const route = useRoute()

const { getItemById } = useDirectusItems()

const { data: doc, error } = await useAsyncData(route.params.doc, () => getItemById({
  collection: 'academy_docs',
  id: route.params.doc
}))

</script>

<template lang='pug'>
.p-6.flex.flex-col.gap-4
  NuxtLink.op-70.hover-op-100.transition.underline(to="/docs/") Academy Documents
  .text-4xl {{ doc?.title }}
  MDC.prose(:value="doc?.content || ''" tag="article")
</template>