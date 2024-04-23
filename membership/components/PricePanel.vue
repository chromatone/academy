<script setup>
const user = useDirectusUser()

const plans = await usePublicItems('plans', {
  sort: ['sort'],
  fields: ['*', 'benefits.benefits_id.title', 'benefits.benefits_id.description']
})

const { academy } = await useMeta()

const showPrice = useShowPrice()

const prefer = ref(plans.value[0])

const sending = ref(false)

async function subscribe() {
  if (!user?.value?.email) return

  sending.value = true

  let res
  try {
    res = await $fetch('/api/membership/subscribe', {
      method: 'POST',
      body: {
        user: user?.value?.id,
        plan: prefer?.value?.id
      }
    })
  } catch (e) {
    console.log(e)
    push.error(e.message)
  }

  sending.value = false
  if (res) {
    window.location = res
  }
}

const config = useRuntimeConfig()

</script>

<template lang='pug'>
.glass.flex.flex-wrap.gap-4.p-4.border-dark-300.dark-border-light-300.max-h-full.overflow-scroll.flex-1(v-show="showPrice") 

  slot

  .flex.flex-col.gap-6(
    style="flex: 2 1 400px"
    :class="{ 'pointer-events-none cursor-cross op-50': !user?.email }"
    )
    .text-xl Choose your plan
    .flex.flex-wrap.gap-4
      .shadow.border-2.flex.flex-wrap.gap-2.rounded-xl.cursor-pointer.relative.p-4(
        style="flex: 1 1 160px"
        :class="{ 'border-purple-500': plan == prefer }"
        v-for="plan in plans"
        :key="plan?.id"  
        @click="prefer = plan"
        ) 
        .flex.flex-col.gap-2(
          style="flex: 1 1 120px")
          .text-xs.uppercase.flex Membership plan
            .flex-1
            .p-0 {{plan?.subscriptions?.length}} / {{ plan?.limit || '∞' }}
          .text-2xl(style="white-space: nowrap;") {{ plan?.title }}

          .text-3xl.flex.items-baseline.gap-2 ${{ +plan?.price }}/mo
            .text-sm.line-through.op-60 ${{ +plan?.old_price }}
        .text-sm.op-60.mb-2(style="flex: 1 1 200px") {{ plan?.description }}
        .flex.flex-col.gap-2.w-full
          .text-sm.bg-light-900.p-1.px-2.rounded.bg-op-20(
            v-for="benefit in plan.benefits" 
            v-tooltip.bottom="{ popperClass: 'max-w-45ch',content: benefit?.benefits_id?.description}"
            :title="benefit?.benefits_id?.description") {{ benefit.benefits_id?.title }}

    button.relative.p-2.bg-purple-300.hover-bg-purple-400.dark-bg-purple-600.dark-hover-bg-purple-500.dark-active-bg-purple-800.transition.rounded-xl.text-xl.items-center.flex.items-center.disabled-op-40(@click="subscribe()" :disabled="!config?.public?.subscriptionsOpen") 
      .i-la-spinner.animate-spin.absolute(v-if="sending")
      .flex-1 Subscribe 
      .i-fa6-brands-stripe.text-2xl.absolute.right-4.op-60

  .flex.flex-col.gap-0
    .text-sm.op-70 Secure payment processing provided by 
      <a href="https://stripe.com" target="_blank">Stripe</a>.
    .text-sm.op-70 Please <a href="mailto:support@chromatone.center"  target="_blank">contact us</a> in case of any problems with checkout.
    
</template>