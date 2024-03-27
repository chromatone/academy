<script setup>
import { useStorage } from '@vueuse/core'

const joined = ref(false)
const closed = ref(false)
const email = useStorage('email', '')

async function join() {
  joined.value = true
  try {
    await $fetch('/api/join', {
      method: 'POST',
      body: {
        email: email.value
      }
    })
  } catch (e) {
    console.log(e)
  }

  setTimeout(() => {
    closed.value = true
  }, 3000)

}

onMounted(() => {
  if (email.value) {
    joined.value = true
    setTimeout(() => {
      closed.value = true
    }, 3000)
  }

})

</script>

<template lang='pug'>
.p-4.glass.z-9000.max-w-55ch(v-if="!closed")
  .flex.flex-col.gap-4(v-if="!joined")
    //- button.absolute.top-4.right-4(@click="closed = true")
      .i-la-times
    .p-0.flex.flex-col.gap-2
      .text-xl Chromatone Academy is opening soon! 
      .text-lg Book a place among the first students

    .flex.flex-col.gap-2
      .flex.gap-2.flex-col
        input.border-2.border-dark-200.w-full.flex-1.p-4.rounded-lg.dark-bg-dark-800(type="text" v-model="email" placeholder="your@gmail.com")
        button.p-4.bg-purple-500.text-light-400.font-bold.uppercase.rounded-xl.shadow-md(@click="join()") Join waitlist
        .text-xs.text-center Fill in your e-mail and we will add you to the waitlist to invite you once we open.

  .flex.items-center(v-else)
    .flex-1 You've joined the Academy waitlist as 
      b {{ email }}

    .i-la-check(@click="closed=true")
    .i-la-times(@click="email=''; joined = false")
</template>