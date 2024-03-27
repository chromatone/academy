<script setup>
const { login } = useDirectusAuth();
const user = useDirectusUser();

const { academy } = await useMeta()

async function onSubmit() {

  const res = await $fetch('/api/membership/subscribe', {
    method: 'POST',
    body: {
      price: academy.value?.full_membership_price_id,
      quantity: 1,
    }
  })
  window.location = res
}

</script>

<template lang='pug'>
.p-0.flex.flex-col.gap-4
  .glass.p-4.p-4.mx-4.flex-1.flex.flex-col.gap-2.max-w-55ch
    .text-4xl Membership 
    .text-sm.uppercase Subscription
  PricePanel
</template>