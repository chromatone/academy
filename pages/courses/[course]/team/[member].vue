<script setup>
definePageMeta({ middleware: ["auth", "course"] })

// const user = useDirectusUser()

const route = useRoute()

// const showPrice = useShowPrice()

// const { getItems } = useDirectusItems()

// const { data: course } = await useFetch('/api/get/course', { query: { slug: route.params?.course } })

// useHead({
//   title: course.value?.title,
//   titleTemplate: '%s course'
// })
</script>

<template lang='pug'>

.flex.gap-2.items-center {{ route.params }}
  //- .p-0.uppercase.text-xs.op-70 Team 
  //- NuxtLink(
  //-   v-for="t in course?.team" :key="t"
  //-   :to="`/team/${t?.team_id?.member?.id}/`")
  //-   UserPill(
  //-     :user="t?.team_id?.member?.user") {{ t?.position }}


</template>