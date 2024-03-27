<script setup>
definePageMeta({ middleware: ["auth"] })

const user = useDirectusUser();
const { logout } = useDirectusAuth();

watch(user, us => !us ? navigateTo('/auth/login') : '')
</script>

<template lang='pug'>
.flex.flex-col.gap-4.mt-20.glass.mx-4.max-w-55ch.p-4
  .font-mono.text-right  {{ user?.email }}
  .flex.flex-wrap.gap-2.mb-8
    .text-4xl {{ user?.first_name }} 
    .text-4xl {{ user?.last_name }}

  button.p-4.border-1.shadow-lg(@click="logout()") Logout

</template>