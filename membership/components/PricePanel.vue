<script setup>
import { useClamp } from '@vueuse/math';

const { academy } = await useMeta()
const user = useDirectusUser()

const plans = await usePublicItems('plans', {
  sort: ['sort']
})

const showPrice = useShowPrice()

const prefer = ref(plans.value[0])

const quantity = useClamp(1, 1, 12)

const details = reactive(plans.value.reduce(
  (acc, plan) => {
    acc[plan?.id] = false
    return acc
  }, {}))

const sending = ref(false)
const error = ref('')

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

</script>

<template lang='pug'>
.glass.flex.flex-wrap.gap-8.p-4.border-dark-300.dark-border-light-300.max-h-full.overflow-scroll.flex-1(v-show="showPrice")

  slot

  .flex.flex-col.gap-6(
    style="flex: 2 1 400px"

    )
    .text-xl Choose your plan
    .flex.flex-wrap.gap-4
      .shadow.p-4.border-2.flex.flex-wrap.gap-2.rounded-xl.cursor-pointer.relative(
        style="flex: 1 1 160px"
        :class="{ 'border-purple-500': plan == prefer }"
        v-for="plan in plans"
        :key="plan?.id"  
        @click="prefer = plan"
        )
        .flex.flex-col.gap-2(
          style="flex: 1 1 120px")
          .text-xs.uppercase Membership
          .text-2xl(style="white-space: nowrap;") {{ plan?.title }}

          .text-3xl.flex.items-baseline.gap-2 ${{ +plan?.price }}
            .text-sm.line-through.op-60 ${{ +plan?.old_price }}
          .text-md per {{ plan?.months }} month{{ plan?.months > 1 ? 's' : '' }}
          .text-md.op-50 ${{ (plan?.price / plan?.months).toFixed() }}/mo
        .text-sm.op-60(style="flex: 1 1 200px") {{ plan?.description }}


    button.relative.p-2.bg-purple-300.hover-bg-purple-400.dark-bg-purple-600.dark-hover-bg-purple-500.dark-active-bg-purple-800.transition.rounded-xl.text-xl.items-center.flex.items-center(@click="subscribe()") 
      .i-la-spinner.animate-spin.absolute(v-if="sending")
      .flex-1 Subscribe 
      .i-fa6-brands-stripe.text-2xl.absolute.right-4.op-60
  .text-sm 
    p Secure payment processing provided by 
      <a href="https://stripe.com" target="_blank">Stripe</a>.
    p Please <a href="mailto:support@chromatone.center"  target="_blank">contact us</a> in case of any problems with checkout.
    
</template>