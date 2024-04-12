<script setup>
const props = defineProps({
  user: { type: String, default: '' }
})

const { data: us } = await useAsyncData('user-' + props.user, () => $fetch('/api/get/user', {
  method: 'POST',
  body: {
    user: props?.user
  }
}))
</script>

<template lang='pug'>

NuxtLink.flex.gap-2.items-center.bg-light-100.dark-bg-dark-100.rounded-full.shadow.pr-3.text-sm(
  :to="`/members/${us?.member?.[0]}/`")
  NuxtImg.rounded-full.max-w-8.max-h-8(
    :width="50" v-if="us?.avatar" :src="us?.avatar")
  .w-8.h-8.bg-dark-300.bg-op-40.rounded-full(v-else)
  .flex.flex-col.flex-1
    .flex.gap-1
      .p-0 {{ us?.first_name }} 
      .p-0 {{ us?.last_name }}
    .op-50.text-xs 
      slot 
</template>