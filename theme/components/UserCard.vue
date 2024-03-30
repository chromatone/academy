<script setup>
const { fetchUser, setUser } = useDirectusAuth();
const user = useDirectusUser();
if (!user.value) {
  const user = await fetchUser();
  setUser(user.value);
}
</script>

<template lang='pug'>
.glass.p-4.flex.flex-col.gap-2
  slot
  .text-2xl {{ user?.first_name }} {{ user?.last_name }}
  .text-sm.font-mono {{ user?.email }}

</template>