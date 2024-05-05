<script setup>
import { useClipboard } from '@vueuse/core'

const discordSecret = ref('')

const activationMessage = computed(() => `activate ${discordSecret.value}`)

const { academy } = await useMeta()

const config = useRuntimeConfig()

const user = useDirectusUser();

const { getItemById, updateItem } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user.value?.member?.[0],
  params: {
    fields: ['discord_username', 'discord_user']
  }
})

const { copy, copied } = useClipboard({ source: activationMessage })

async function generateDiscordSecret() {
  const mem = await updateItem({
    collection: 'members',
    id: user.value?.member?.[0],
    item: {
      discord_secret: generatePassword(12)
    }
  })
  discordSecret.value = mem?.discord_secret
}

</script>

<template lang='pug'>
.glass.flex.gap-4.items-center.p-4(v-if="member.discord_active") 
  NuxtLink.flex.items-center.bg-purple-300.dark-bg-purple-600.p-2.pr-3.rounded-2xl.gap-2.shadow(:to="academy?.discord_invite")
    .i-la-discord.text-4xl
    .text-xl Discord

  .p-2.text-xl.flex.gap-2.items-center You are connected as {{ member.discord_username }}
    NuxtLink.text-red.text-xl(
      :to="`https://discord.com/channels/920977894002540555/1236009672583024703`"
      v-tooltip="`Type 'disconnect' in the Role Request channel to disconnect your user`"
      @click="disconnectDiscord()")
      .i-la-times

.glass.flex.gap-4.items-center.p-4(v-else)
  .form.w-full
    .flex.flex-wrap.gap-2.items-center.w-full(v-if="!discordSecret")
      .p-0 You have no active user on the server
      .flex-1
      button.button.px-4.flex.items-center.gap-2(
        @click="generateDiscordSecret()")
        .i-la-discord.text-2xl
        .text-xl  Connect your user

    .flex.flex-col.gap-4.w-full(v-else)
      .flex.gap-2
        input.font-mono.text-lg.flex-1(
          disabled
          type="text" :value="activationMessage")
        button.button(@click="copy()") {{ copied ? 'Copied' : 'Copy' }}
      .text-lg Paste this secret phrase the Role Request channel and the bot will activate your Student role on the server
      NuxtLink.button(:to="`https://discord.com/channels/920977894002540555/1236009672583024703`") Proceed to the Role Requests channel on Discord
</template>