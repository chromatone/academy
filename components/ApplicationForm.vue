<script setup>
import timezones from 'timezones-list';
import { reactive, ref, onMounted, watch } from 'vue';

const sent = ref(false)
const sending = ref(false)

const program = ref('')

const props = defineProps({
  programId: { type: String, default: '' }
})

const timezone = ref()

const u = reactive({
  first_name: '',
  last_name: '',
  email: '',
  social_platform: 'discord',
  social: '',
  country: '',
  city: '',
  comment: '',
  timezone: computed(() => timezone.value?.utc || ''),
  program: computed(() => props.programId || '')
})

const required = {
  first_name: '',
  last_name: '',
  email: '',
}

onMounted(() => {
  let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timezone.value = timezones.find(val => val.tzCode == tz)
})

const valid = computed(() => Object.keys(required).reduce((prev, next) => prev && !!u?.[next], true))

async function sendApplication() {
  sending.value = true
  try {
    const apply = await $fetch(
      'https://db.chromatone.center/flows/trigger/fd79e220-bcf4-49b0-93d6-e70f206306dd',
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(u),
      });

    console.log(await apply?.json?.())
  } catch (e) {
    console.error(e, e?.errors?.[0]?.message, e?.response?.status)
  }

  Object.assign(u, {
    first_name: '',
    last_name: '',
    email: '',
    social_platform: 'discord',
    social: '',
    country: '',
    city: '',
    comment: '',
  })
  sending.value = false
  sent.value = true
}

</script>

<template lang='pug'>
.m-4.p-4.bg-dark-900.bg-opacity-2.flex.flex-col.gap-6(v-if="sent") Thanks for your application! We will review in in 3 business days and send you links for further steps. 
  button.col-span-3.text-xl.p-4.bg-light-900.dark-bg-dark-700.disabled-opacity-50.rounded-xl(
    @click="sent = false"
  ) Apply again
form#apply.grid.grid-cols-3.gap-4.p-4(
  v-else
  @submit.prevent.stop="sendApplication()"
  style="grid-template-columns: 0.5fr 1fr 1fr"
  ) 
  //- label(for="program") Program
  //- input#program.col-span-2.opacity-50(disabled type="text" v-model="u.program")

  label(for="email") Email*
  input#email.col-span-2(
    type="text" v-model="u.email"
    placeholder="your@gmail.com"
    )

  label(for="first_name") Name*
  input#first_name(
    type="text" v-model="u.first_name"
    placeholder="First name"
    )
  input#last_name(
    type="text" v-model="u.last_name"
    placeholder="Last name"
    )



  label(for="social") Social
  select(v-model="u.social_platform")
    option(value="discord") Discord
    option(value="telegram") Telegram
    option(value="instagram") Instagram
    option(value="whatsapp") Whatsapp 
    option(value="facebook") Facebook
    option(value="line") Line 
    option(value="twitter") Twitter 


  input#social(
    type="text" v-model="u.social"
    placeholder="@handle or link"
    )

  label(for="timezone") Timezone
  select.col-span-2(v-model="timezone")
    option(
      v-for="tz in timezones" :key="tz" :selected="u.timezone.name == tz.name" :value="tz"
      ) {{ tz.label }} 

  label(for="city") Location
  input#city(
    type="text" v-model="u.city"
    placeholder="City"
    )

  input#country(
    type="text" v-model="u.country"
    placeholder="Country"
    )

  label(for="country") Comment
  textarea#country.col-span-2(
    type="text" v-model="u.comment"
    rows="5"
    placeholder="Describe your music skillset and goals that you want to achieve with by participating in the program"
    )

  button.relative.col-span-3.text-xl.p-4.bg-dark-900.text-light-300.dark-bg-light-700.dark-text-dark-300.disabled-opacity-50.rounded-xl(type="submit" :disabled="!valid || sending") {{ valid ? 'Submit your application' :`Please, fill in all the required (*) fields first` }}
    .i-la-redo-alt.animate.animate-spin.absolute.top-5(v-if='sending')

  .text-lg.col-span-3.p-4 Your application will be reviewed in 3 days and we will send you an invite to become a student of this educational program. 
</template>

<style scoped lang="postcss">
label {
  @apply flex items-center font-bold justify-end text-right;
}

input,
select,
textarea {
  @apply w-full p-2 rounded dark-bg-dark-500 border-1 border-dark-100/40 dark-border-light-900/40;
}
</style>