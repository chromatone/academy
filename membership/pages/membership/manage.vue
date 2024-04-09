<script setup>
const { academy } = await useMeta()
const user = useDirectusUser()
const { getItemById } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user.value?.member?.[0],
  params: {
    fields: ['*', 'subscriptions.*']
  }
})

</script>

<template lang='pug'>
.flex.flex-col.gap-4.p-4
  .glass.p-4.flex-1.flex.flex-col.gap-2.max-w-55ch
    .text-4xl Manage your membership

  MembershipManage

</template>