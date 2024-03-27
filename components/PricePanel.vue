<script setup>
import { useClamp } from '@vueuse/math';

const { academy } = await useMeta()

const { getItems } = useDirectusItems()

const { data: plans } = await useAsyncData('plans', async () => await getItems({
  collection: 'plans',
  params: {
    sort: ['sort']
  }
}))

const showPrice = useShowPrice()

const prefer = ref(plans.value[0])

const quantity = useClamp(1, 1, 12)

const details = reactive(plans.value.reduce(
  (acc, plan) => {
    acc[plan?.id] = false
    return acc
  }, {}))

async function subscribe() {

  let res = await $fetch('/api/membership/subscribe', {
    method: 'POST',
    body: {
      price: prefer.value?.stripe_product,
      quantity: quantity.value
    }
  })

  window.location = res
}

</script>

<template lang='pug'>
.glass.flex.flex-wrap.gap-8.p-4.border-dark-300.dark-border-light-300.m-4.max-h-full.overflow-scroll.flex-1.max-w-55ch(v-show="showPrice")
  //- .w-full.absolute.flex.flex-col.items-center.-my-30.-mx-6
  //-   img.w-24(src="/logo.svg")


  .flex.flex-col.gap-4(style="flex: 2 1 400px")
    .text-xl Choose your plan:
    .flex.flex-wrap.gap-2
      .shadow.p-4.border-2.flex.flex-wrap.gap-2.rounded-xl.cursor-pointer.relative(
        style="flex: 1 1 160px"
        :class="{ 'border-purple-500': plan == prefer }"
        v-for="plan in plans"
        :key="plan?.id"  
        @click="prefer = plan"
        )
        //- transition(name="fade")
          .glass.absolute.bottom-0.left-0.right-0.p-2.z-10.overflow-scroll.max-h-full.text-md(
            @click="details[plan.id] = false"
            v-if="details[plan.id]") {{ plan?.description }}
        //- button.absolute.right-4.top-4(@click="details[plan?.id] = !details[plan?.id]")
          .i-la-question-circle
        .flex.flex-col.gap-2(style="flex: 1 1 40px")
          .text-xs.uppercase Membership
          .text-2xl(style="white-space: nowrap;") {{ plan?.title }}

          .text-3xl.flex.items-baseline.gap-2 ${{ +plan?.price }}
            .text-sm.line-through.op-60 ${{ +plan?.old_price }}
          .text-md per {{ plan?.months }} month{{ plan?.months > 1 ? 's' : '' }}
          .text-md.op-50 ${{ (plan?.price / plan?.months).toFixed() }}/mo
        .text-sm.op-60(style="flex: 1 1 100px") {{ plan?.description }}
        //- .text-xl {{ ((plan?.price / plan?.months) * 32).toFixed() }} THB
        //- .text-xl {{ ((plan?.price) * 32).toFixed() }} THB
        //- .text-4xl 

    button.p-2.bg-purple-300.hover-bg-purple-400.dark-bg-purple-700.transition.rounded-xl.mt-4.text-xl(@click="subscribe()") Subscribe 
</template>