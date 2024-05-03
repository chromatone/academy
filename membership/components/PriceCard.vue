<script setup>

const props = defineProps({
  plan: { type: Object, default: () => ({}) }
})

const user = useDirectusUser()

const { academy } = await useMeta()

const config = useRuntimeConfig()

</script>

<template lang='pug'>

.shadow.border-2.flex.flex-col.gap-2.rounded-xl.cursor-pointer.relative.p-4(
  style="flex: 1 1 160px"

  ) 
  .flex.flex-col.gap-2
    .text-xs.uppercase.flex Membership plan
      .flex-1
      .p-0 {{plan?.subscriptions?.length}} / {{ plan?.limit || '∞' }}
    .text-2xl(style="white-space: nowrap;") {{ plan?.title }}

    .text-3xl.flex.items-baseline.gap-2 ${{ +plan?.price }}/mo
      .text-sm.line-through.op-60 ${{ +plan?.old_price }}

  .text-sm.op-60.mb-2 {{ plan?.description }}
  .flex.flex-col.gap-2.w-full
    .text-sm.bg-light-900.p-1.px-2.rounded.bg-op-20(
      v-for="benefit in plan.benefits" 
      v-tooltip.bottom="{ popperClass: 'max-w-45ch',content: benefit?.benefits_id?.description}"
      :title="benefit?.benefits_id?.description") {{ benefit.benefits_id?.title }}

  
</template>