<script setup>
const user = useDirectusUser();

const { academy } = await useMeta()

const config = useRuntimeConfig()

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-4.flex.flex-col.gap-2
      .text-4xl Academy Membership 
      .text-sm.uppercase Subscription

    //- .glass.p-4.flex.flex-col.gap-2
    //-   .text-lg During Pilot Summer Semester every subscribed member gets:
    //-   ul.list-inside.list-circle
    //-     li.list-item(v-for="feature in academy?.features") {{ feature.title }},
    //-   p and other rapidly improving features of the platform.

    .glass.p-4.text-2xl.relative.flex.items-center 1. Sign up as an aspirant
      .i-la-check-circle.absolute.right-4.text-green(v-if="user?.email")
    template(v-if="!user?.email") 
      AuthSignup
    UserCard(v-else)
      .text-sm.text-green.op-60 You are signed up and logged in as 
  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")

    PricePanel
      .text-2xl 2. Subscribe for student membership
      //- .text-lg.text-red(v-if="!config.public.subscriptionsOpen") {{ academy?.subscription_notice }}
    
</template>