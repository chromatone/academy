<script setup>
const user = useDirectusUser();

const { academy } = await useMeta()

const config = useRuntimeConfig()

const plans = await usePublicItems('plans', {
  sort: ['sort'],
  fields: ['*', 'benefits.benefits_id.title', 'benefits.benefits_id.description']
})

const prefer = usePreferPlan()

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 500px")
    .glass.p-4.flex.flex-col.gap-2
      .text-4xl Academy Membership 
      .text-sm.uppercase Subscription

    //- .glass.p-4.flex.flex-col.gap-2
    //-   .text-lg During Pilot Summer Semester every subscribed member gets:
    //-   ul.list-inside.list-circle
    //-     li.list-item(v-for="feature in academy?.features") {{ feature.title }},
    //-   p and other rapidly improving features of the platform.

    .glass.p-4
      .text-2xl 1. Choose your plan

    .glass.flex.flex-col.gap-6(
      style="flex: 2 1 400px"
      )
      .flex.gap-4.p-4.flex-wrap
        PriceCard(
          :class="{ 'border-purple-500': plan == prefer }"
          v-for="plan in plans"
          :key="plan"
          @click="prefer = plan"
          :plan="plan")


  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-4.text-2xl.relative.flex.items-center 2. Sign up as an aspirant
      .i-la-check-circle.absolute.right-4.text-green(v-if="user?.email")
    template(v-if="!user?.email") 
      AuthSignup
    UserCard(v-else)
      .text-sm.text-green-700.dark-text-green.op-80 You are signed up and logged in as 

    .text-2xl.glass.p-4 3. Pay for student subscription
    .flex.p-4.flex-col.gap-2.font-mono.text-sm.bg-light-100.shadow-xl.rounded(v-if="prefer")
      .p-0.text-xl.flex 
        .flex-1 {{ prefer?.title }}
        .p-0.text-lg ${{ Number(prefer?.price) }}/mo
      .p-0 Starts on: {{ new Date().toISOString().slice(0,10) }}
      .p-0 Estimated renewal date: {{ new Date(Date.now()+1000*60*60*24*30).toISOString().slice(0,10) }}
    PricePanel(:class="{'op-40 pointer-events-none': !prefer || !user?.email}")

      //- .text-lg.text-red(v-if="!config.public.subscriptionsOpen") {{ academy?.subscription_notice }}
    
</template>