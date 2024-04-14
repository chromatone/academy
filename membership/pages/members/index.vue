<script setup>
const { data: members } = await useFetch('/api/list/members')

const { academy } = await useMeta()
</script>

<template lang='pug'>

.p-4.flex.flex-col.flex-1.gap-4
  .glass.p-4.flex-1
    .text-2xl Members
  .flex.flex-wrap.gap-4
    NuxtLink.glass.p-2.text-lg.flex.flex-wrap.gap-3.items-center(
      style="flex: 1 1 240px"
      :to="`/members/${member?.id}`"
      v-for="member in members"
      :key="member"
      ) 
      .w-8.h-8.overflow-clip.rounded-full
        NuxtImg.w-full(:src="member?.user?.avatar || academy?.default_avatar" width="50")
      .flex.flex-col.gap-2
        .flex.flex-wrap.gap-2
          .text-xl {{ member?.user?.first_name }}
          .text-xl {{ member?.user?.last_name }}
        .text-sm(v-if="member?.user?.location") {{ member?.user?.location }}
      
</template>