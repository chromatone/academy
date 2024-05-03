<script setup>
import { useClipboard } from '@vueuse/core'

definePageMeta({ middleware: ["auth"] })

const user = useDirectusUser();
const { logout } = useDirectusAuth();

watch(user, us => !us?.email ? navigateTo('/auth/login') : '')

const onSubmit = async () => { await logout(); await navigateTo('/auth/') };

const { getItemById, updateItem } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user.value?.member?.[0],
  params: {
    fields: ['*', 'role', 'active', 'subscriptions.current_period_end', 'subscriptions.status', 'subscriptions.stripe_session_id', 'subscriptions.stripe_session_url', 'subscriptions.plan.title']
  }
})

const discordSecret = ref('')
const activationMessage = computed(() => `activate ${discordSecret.value}`)

const { copy, copied } = useClipboard({ source: activationMessage })

async function generateDiscordSecret() {
  const mem = await updateItem({
    collection: 'members',
    id: user.value?.member?.[0],
    item: {
      discord_secret: generatePassword(12)
    }
  })
  discordSecret.value = mem.discord_secret
}

</script>

<template lang='pug'>
.flex.flex-col.gap-4.mx-4.max-w-55ch
  .glass.p-4.flex.flex-col.gap-4.justify-center 
    .flex.flex-wrap.gap-2
      .text-4xl {{ user?.first_name }} 
      .text-4xl {{ user?.last_name }}
    .font-mono  {{ user?.email }}
    button.absolute.right-4.rounded-xl.flex-1.p-2.border-1.shadow-lg(@click="onSubmit()") Logout

  .glass.flex.gap-4.items-center.p-4(v-if="member.discord_user") 
    .i-la-discord.text-4xl
    .p-2.text-2xl {{ member.discord_username }}

  .glass.p-4.flex.flex-wrap.gap-4.items-center.form(v-else)
    .flex.flex-col.gap-4(v-if="!discordSecret")
      button.button.flex.items-center.gap-2(
        @click="generateDiscordSecret()")
        .i-la-discord.text-4xl
        p  Connect Discord User
    //- NuxtLink(to="/api/auth/discord" target="_blank") Connect Discord
    .flex.flex-col.gap-4.w-full(v-else)

      .flex.gap-2
        input.font-mono.text-lg.flex-1(
          disabled
          type="text" :value="activationMessage")
        button.button(@click="copy()") {{ copied ? 'Copied' : 'Copy' }}
      .text-lg Paste this secret phrase the special channel on Discord and our bot will activate your Student role on the server
      NuxtLink.button(:to="`https://discord.com/channels/920977894002540555/1236009672583024703`") Open the Role Requests channel on Discord

  .glass.p-4.flex-1.flex.flex-col.gap-2.items-stretch
    .flex.gap-2.items-center.flex-wrap
      .uppercase.op-90.text-lg {{ member?.role }}
      .uppercase.op-70.text-sm {{ member?.active ? 'Active' : 'Disabled' }}
      .flex-1 
      NuxtLink.bg-purple-500.px-2.py-1.rounded-xl.shadow.bg-op-80.op-60(to="/membership/subscribe") New subscription

  .glass.flex.flex-wrap.gap-2.items-center.p-4.rounded-lg
    .flex.gap-2.font-mono.w-full.items-center.flex-wrap(v-for="sub in member?.subscriptions" :key="sub")
      .op-90 {{ sub?.plan?.title }}
      .op-50 {{ sub?.status }}
      .flex-1
      .op-90(v-if="sub?.status == 'active'") PAID TILL {{ new Date(sub?.current_period_end).toLocaleDateString() }}
      NuxtLink.button(:to="sub?.stripe_session_url" v-if="sub?.status == 'incomplete'") PAY
      form(action="/api/membership/manage" method="POST")
        input(type="hidden" id="session-id" name="session_id" :value="sub.stripe_session_id")
        button.button(type="submit") Manage


  .p-2.flex.flex-col.gap-4(v-if="!user?.member?.[0]")
    .p-2 No membership yet.
    NuxtLink.flex-1.text-xl.bg-purple-500.p-4.rounded-xl.shadow(to="/membership/subscribe/") Subscribe for membership


  

</template>