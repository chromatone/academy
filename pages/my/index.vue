<script setup>
definePageMeta({ middleware: ["auth"] })

const user = useDirectusUser();
const { logout } = useDirectusAuth();

watch(user, us => !us?.email ? navigateTo('/auth/login') : '')

const onSubmit = async () => { await logout(); await navigateTo('/auth/') };
</script>

<template lang='pug'>
.flex.flex-col.gap-4.mx-4.max-w-55ch
  .glass.p-4
    .font-mono.text-right  {{ user?.email }}
    .flex.flex-wrap.gap-2
      .text-4xl {{ user?.first_name }} 
      .text-4xl {{ user?.last_name }}

  MembershipManage(v-if="user && user?.member?.[0]")
  .p-2.flex.flex-col.gap-4(v-else)
    .p-2 No membership yet
    NuxtLink.flex-1.text-xl.bg-purple-500.p-4.rounded-xl.shadow(to="/membership/subscribe/") Subscribe for membership


  button.flex-1.p-4.border-1.shadow-lg(@click="onSubmit()") Logout

</template>