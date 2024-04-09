<script setup>
const { academy } = await useMeta()
const user = useDirectusUser()
const { getItemById } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user.value?.member?.[0],
  params: {
    // deep: {
    //   subscriptions: {
    //     _filter: {
    //       status: {
    //         _eq: 'active'
    //       }
    //     }
    //   }
    // },
    filter: {

    },
    fields: ['*', 'subscriptions.*', 'subscriptions.plan.title']
  }
})

</script>

<template lang='pug'>
.flex.flex-col.gap-4.max-w-55ch
  .glass.p-4.flex-1.flex.flex-col.gap-2
    .text-xl.uppercase {{ member.role }}
    .p-0 {{ member.active ? 'Active' : 'Disabled' }} account
  .flex.gap-2
    .text-sm.uppercase.px-4.flex-1 Subscriptions
    NuxtLink.bg-purple-500.rounded-xl.shadow-lg.px-2.py-1(to="/membership/subscribe/") Subscribe
  .flex.flex-col.gap-4
    .glass.p-4.flex-1.flex.flex-col.gap-4.font-mono(v-for="sub in member.subscriptions" :key="sub" :class="{'op-50':sub.status != 'active'}") 
      .flex.gap-2.items-center.flex-1
        .px-2.rounded-full(:class="{'bg-green-400':sub.status =='active', 'bg-gray-400': !sub.status!='active'}") {{ sub.status }}
        .font-bold.flex-1 {{ sub.plan.title }}
        .p-0 {{ Number(sub.amount_total) }} 
        .uppercase {{ sub.currency }}
      .flex.gap-2.items-center.flex-1
        .px-2.flex-1 START: {{ new Date(sub.start_date).toLocaleDateString(undefined, {day:'numeric', month:'long', year: 'numeric'}) }}
        .px-2.flex-1(v-if="sub.cancel_at") CANCEL: {{ new Date(sub.cancel_at).toLocaleDateString(undefined, {day:'numeric', month:'long', year: 'numeric'}) }}
      .flex.gap-2.items-center.flex-1
        .px-2.flex-1 FROM: {{ new Date(sub.current_period_start).toLocaleDateString(undefined, {day:'numeric', month:'long', year: 'numeric'}) }}
        .px-2.flex-1 TILL: {{ new Date(sub.current_period_end).toLocaleDateString(undefined, {day:'numeric', month:'long', year: 'numeric'}) }}
      form(action="/api/membership/manage" method="POST")
        input(type="hidden" id="session-id" name="session_id" :value="sub.stripe_session_id")
        button.p-4.bg-purple.rounded-xl.shadow(type="submit") Manage
  

</template>