<script setup>
definePageMeta({ middleware: ["auth"] })

const user = useDirectusUser();
const { logout } = useDirectusAuth();

watch(user, us => !us?.email ? navigateTo('/auth/login') : '')

const onSubmit = async () => { await logout(); await navigateTo('/auth/') };

const { getItemById } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user.value?.member?.[0],
  params: {
    fields: ['role', 'active', 'subscriptions.current_period_end', 'subscriptions.status', 'subscriptions.stripe_session_id', 'subscriptions.plan.title']
  }
})

</script>

<template lang='pug'>
.flex.flex-col.gap-4.mx-4.max-w-55ch
  .glass.p-4.flex.flex-col.gap-4.justify-center 
    .flex.flex-wrap.gap-2
      .text-4xl {{ user?.first_name }} 
      .text-4xl {{ user?.last_name }}
    .font-mono  {{ user?.email }}
    button.absolute.right-4.rounded-xl.flex-1.p-2.border-1.shadow-lg(@click="onSubmit()") Logout
    NuxtLink(to="/api/auth/discord" target="_blank") Connect Discord

  .glass.p-4.flex-1.flex.flex-col.gap-2.items-stretch
    .flex.gap-2.items-center.flex-wrap
      .uppercase.op-90.text-lg {{ member.role }}
      .uppercase.op-70.text-sm {{ member.active ? 'Active' : 'Disabled' }}
      .flex-1 
      NuxtLink.bg-purple-500.px-2.py-1.rounded-xl.shadow.bg-op-80.op-60(to="/membership/subscribe") New subscription

  .glass.flex.flex-wrap.gap-2.items-center.p-4.rounded-lg
    .flex.gap-2.font-mono.w-full.items-center.flex-wrap(v-for="sub in member?.subscriptions" :key="sub")
      .op-90 {{ sub?.plan?.title }}
      .op-50 {{ sub?.status }}
      .flex-1
      .op-90(v-if="sub?.status == 'active'") PAID TILL {{ new Date(sub?.current_period_end).toLocaleDateString() }}
      form(action="/api/membership/manage" method="POST")
        input(type="hidden" id="session-id" name="session_id" :value="sub.stripe_session_id")
        button.px-2.py-2.bg-purple.rounded-xl.shadow(type="submit") Manage


  .p-2.flex.flex-col.gap-4(v-if="!user?.member?.[0]")
    .p-2 No membership yet.
    NuxtLink.flex-1.text-xl.bg-purple-500.p-4.rounded-xl.shadow(to="/membership/subscribe/") Subscribe for membership


  

</template>