<script setup>
const user = useDirectusUser();

const { academy } = await useMeta()

const config = useRuntimeConfig()

const plans = await usePublicItems('plans', {
  sort: ['sort'],
  fields: ['*', 'benefits.benefits_id.title', 'benefits.benefits_id.description']
})

const prefer = usePreferPlan()

prefer.value = plans.value?.[0]


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

  if (res) {
    window.location = res
  }
}

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")
    .glass.p-4.flex.flex-col.gap-2
      .text-4xl Academy Membership 
      .text-sm.uppercase Subscription

    //- .glass.p-4.flex.flex-col.gap-2
    //-   .text-lg During Pilot Summer Semester every subscribed member gets:
    //-   ul.list-inside.list-circle
    //-     li.list-item(v-for="feature in academy?.features") {{ feature.title }},
    //-   p and other rapidly improving features of the platform.

    .glass.p-4.items-center.flex.gap-2
      .text-2xl 1. Choose your plan
      .i-la-check-circle.absolute.right-4.text-green.text-2xl(v-if="prefer")
      .i-la-circle.right-4(v-else)

    .glass.flex.flex-col.gap-6(
      style="flex: 2 1 200px"
      )
      .flex.gap-4.p-4.flex-wrap
        PriceCard(
          :class="{ 'border-purple-500': plan == prefer }"
          v-for="plan in plans"
          :key="plan"
          @click="prefer = plan"
          :plan="plan")


  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 500px")
    .glass.p-4.text-2xl.relative.flex.items-center 2. Sign up for an aspirant account
      .i-la-check-circle.absolute.right-4.text-green(v-if="user?.email")
      .i-la-circle.right-4(v-else)
    template(v-if="!user?.email") 
      AuthSignup
    UserCard(v-else)
      .text-sm.text-green-700.dark-text-green.op-80 You are signed up and logged in as 

    .text-2xl.glass.p-4.flex.items-center 3. Proceed to checkout
      .i-la-check-circle.absolute.right-4.text-green(v-if="sending")
      .i-la-circle.absolute.right-4.text-2xl(v-else)
    .flex.p-4.flex-col.gap-2.font-mono.text-sm.glass(v-if="prefer")
      .p-0.text-xl.flex 
        .flex-1 {{ prefer?.title }}
        .p-0.text-lg ${{ Number(prefer?.price) }}/mo
      .p-0 Starts on: {{ new Date().toISOString().slice(0,10) }}
      .p-0 Estimated renewal date: {{ new Date(Date.now()+1000*60*60*24*30).toISOString().slice(0,10) }}

    .glass.flex.flex-col.gap-4.p-4.border-dark-300.dark-border-light-300.max-h-full.overflow-scroll(:class="{'op-40 pointer-events-none': !prefer || !user?.email}" )

      button.relative.p-2.bg-purple-300.hover-bg-purple-400.dark-bg-purple-600.dark-hover-bg-purple-500.dark-active-bg-purple-800.transition.rounded-xl.items-center.flex.items-center.disabled-op-40(@click="subscribe()" :disabled="!config?.public?.subscriptionsOpen")
        .i-la-spinner.animate-spin.absolute(v-if="sending")
        .i-la-lock.absolute.op-50(v-else)
        .flex-1.text-xl Subscribe 
        .i-fa6-brands-stripe.text-2xl.absolute.right-4.op-60

      .flex.flex-col.gap-0
        .text-sm.op-70 Secure payment processing provided by 
          <a href="https://stripe.com" target="_blank">Stripe</a>.
        .text-sm.op-70 Please contact <a href="mailto:support@chromatone.center"  target="_blank">support@chromatone.center</a> in case of any problems with checkout.

      //- .text-lg.text-red(v-if="!config.public.subscriptionsOpen") {{ academy?.subscription_notice }}
    
</template>