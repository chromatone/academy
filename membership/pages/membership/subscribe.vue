<script setup>
const user = useDirectusUser();

const { academy } = await useMeta()

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.gap-4

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 200px")
    .glass.p-4.flex-1.flex.flex-col.gap-2
      .text-4xl Academy Membership 
      .text-sm.uppercase Subscription
      .text-lg.text-red.mt-4 {{ academy?.subscription_notice }}
    .glass.p-4.text-2xl.relative.flex.items-center 1. Sign up as a new student
      .i-la-check-circle.absolute.right-4.text-green(v-if="user?.email")
    AuthSignup(v-if="!user?.email") 
    UserCard(v-else)
      .text-sm.text-green.op-60 You are signed up and logged in as

  .flex.flex-col.gap-4.max-w-55ch(style="flex: 1 1 300px")
    .glass.p-4.text-2xl 2. Subscribe for membership
    PricePanel
    
</template>