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
    .flex.flex-wrap.gap-4
      PriceCard(
        :class="{ 'border-purple-500': plan == prefer }"
        v-for="plan in plans"
        :key="plan"
        @click="prefer = plan"
        :plan="plan")

    button.relative.p-2.bg-purple-300.hover-bg-purple-400.dark-bg-purple-600.dark-hover-bg-purple-500.dark-active-bg-purple-800.transition.rounded-xl.text-xl.items-center.flex.items-center.disabled-op-40(@click="subscribe()" :disabled="!config?.public?.subscriptionsOpen") 
      .i-la-spinner.animate-spin.absolute(v-if="sending")
      .flex-1 Subscribe 
      .i-fa6-brands-stripe.text-2xl.absolute.right-4.op-60

  .flex.flex-col.gap-0
    .text-sm.op-70 Secure payment processing provided by 
      <a href="https://stripe.com" target="_blank">Stripe</a>.
    .text-sm.op-70 Please <a href="mailto:support@chromatone.center"  target="_blank">contact us</a> in case of any problems with checkout.
    
</template>