<script setup>
definePageMeta({ middleware: ["auth"] })

const route = useRoute()

const { getItemById } = useDirectusItems()

const { data: member, error } = await useAsyncData('member-' + route.params?.id, async () => await getItemById({
  collection: 'members',
  id: route.params?.id,
  params: {
    fields: ['active', 'role', 'user']
  }
}))

const { academy } = await useMeta()

const { data: user } = await useFetch('/api/get/user', {
  method: 'POST',
  body: {
    user: member.value?.user
  }
})

</script>

<template lang='pug'>
.p-4.flex.flex-wrap.flex-1.gap-4
  .flex.flex-col.gap-4.flex-1
    NuxtLink.glass.p-4.flex-1(to="/members/")
      .text-xl Member
    .rounded-full.overflow-clip.max-w-64.max-h-64
      NuxtImg(width="300" :src="user?.avatar || academy?.default_avatar")
    .glass.p-4.flex.flex-col.gap-4
      .flex.gap-2.flex-wrap
        .text-2xl {{ user?.first_name }}
        .text-2xl {{ user?.last_name }}
    NuxtLink.glass.p-4(
      :to="`/team/${route.params?.id}/`"
      v-if="member?.team?.length > 0")
      .text-md Team member
  .flex.flex-col.gap-4(
    style="flex: 1 1 400px"
    )


</template>