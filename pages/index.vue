<script setup>
definePageMeta({ layout: 'home' })

import LiteYouTubeEmbed from 'vue-lite-youtube-embed'

const user = useDirectusUser()

const { academy } = await useMeta()

const { data: programs } = await useFetch('/api/list/programs')

const plans = await usePublicItems('plans', {
  sort: ['sort'],
  fields: ['*', 'benefits.benefits_id.title', 'benefits.benefits_id.description']
})

</script>

<template lang="pug">
.flex.flex-wrap.relative

  .flex.flex-wrap.pt-30vh.bg-purple-200.bg-op-20.dark-bg-purple-400.dark-bg-op-20.min-h-100vh.items-end.overflow-hidden.pb-8(style="flex: 1 1 100%")
    .top-0.absolute.right-0.-z-4.max-w-90vw
      img.w-full.-scale-x-100(src="~/assets/images/spin.png")
    .w-full.flex.flex-col.gap-2.p-6.z-20
      h1.font-bold.text-6xl Chromatone
      h2.text-6xl Academy

      .flex.flex-wrap.mt-4
        .flex.flex-col.mb-8(style="flex: 2 1 300px")
          h3.text-2xl Visual Music Language 
          h4.text-lg Education and Research Center
          .text-lg.max-w-45ch.mt-4 We're pioneering the connection between senses, illuminating the hidden depths of music and art. Our 7-year odyssey brought us to a treasure trove of practical knowledge, deep music theory understanding, and open-source interactive web apps to play and experiment with. Now, we're building a vibrant community to share these treasures with students worldwide. Join us and embark on a transformative musical journey!
        .flex-1

        .p-0.flex.flex-col.gap-4.self-start(style="flex: 1 1 300px")
          .glass.p-4(v-if="user?.member?.[0]")
            .flex.p-2.flex-wrap.gap-2 Welcome back, {{ user?.first_name }} {{ user?.last_name }}!
              NuxtLink.op-50.hover-op-100.transition(to='/me/') Your profile
          .glass.p-4.gap-4.flex.flex-col
            .text-2xl Membership features
            ul.flex.flex-col.gap-1
              li.rounded.px-2.py-1.bg-purple-200.bg-op-20(
                style="flex: 1"
                v-for="feature in academy?.features") {{ feature?.title }}
            .flex.gap-2.items-center(v-if="!user?.email")
              NuxtLink.max-w-45ch.bg-purple-300.dark-bg-purple-600.p-4.rounded-xl.text-xl.flex-1(to="/membership/subscribe/") Subscribe now
              NuxtLink.bg-purple-300.bg-op-40.op-80.dark-bg-purple-600.dark-bg-op-40.p-4.rounded-xl.text-xl.box-border(to="/auth/login/") Login

        .flex-1
  .flex.flex-col.p-4.flex-1.w-full(style="flex: 1 1 100%")
    PageCount

  .flex.flex-col.gap-2.max-w-55ch.py-10(style="flex: 1 1 500px")
    .gap-4.px-4.flex.flex-col.gap-2.mx-4
      .text-xl.op-90 1 May - 1 June 2024
      .text-4xl Subscriptions Soft Launch
      .text-xl Join us today and get the early bird price
      p Become a founding member! Join us during May and get the early-bird price. Witness the Academy's open-source development firsthand as we grow alongside our first students (including you!).  Actively shape your learning through our feedback system and explore music with an open mind.

      NuxtLink.max-w-45ch.max-w-45ch.bg-purple-300.dark-bg-purple-600.p-4.rounded-xl.text-xl.grayscale-10.hover-grayscale-0.transition(to="/membership/subscribe/" v-if="!user?.member") Subscribe today

    hr.my-4.mx-8

    .gap-4.p-4.flex.flex-col.gap-2.mx-4
      .text-xl 1 June - 1 September 2024
      .text-4xl Pilot Summer Season
      .text-lg For music enthusiasts seeking a unique and interactive learning experience, the Chromatone Academy's Pilot Summer Season offers a dynamic approach to music education.

      p This three-month program marks the first large-scale rollout of the Chromatone system, featuring a suite of educational apps designed to foster a collaborative learning environment. Students will embark on a journey of discovery alongside the Academy, co-creating knowledge through:
      ul.flex.flex-col.gap-1.pl-2.list-circle
        li <b>Open-source, interactive courses</b>: Diataxis, the program's documentation system, provides a personalized learning framework with various materials, including tutorials, guides, explanations, and references.
        li <b>Progressive, collaborative learning</b>: Courses are launched collectively, but explored progressively in a unit-by-unit approach. This fosters an interactive dialogue between students and instructors.
        li <b>Structured framework for personalized learning</b>: The Pilot Summer Season aims to create a comprehensive library of pilot content for various courses. This equips students to build their own learning paths within the structured framework provided by the Academy.

      p The Pilot Summer Season promises an exciting and engaging approach to music education, empowering students to become active participants in their learning journey.

  .flex.flex-wrap.gap-4.p-6(style="flex: 1 1 600px")
    NuxtLink.w-full.text-4xl(to="/programs/") Programs 
    ProgramBlock.overflow-clip.rounded-xl(
      style="flex: 1 1 300px"
      v-for="p in programs"
      :p="p")

    //- h3.mt-8.max-w-45ch.text-xl {{ academy?.description }}


    //- .rounded-2xl.overflow-clip
      LiteYouTubeEmbed(title="Video" 
        :id="academy?.youtube_intro" 
        v-if="academy?.youtube_intro")

      //- button.p-4.text-2xl.bg-purple.rounded-lg.shadow-lg Buy Academy Membership
      NuxtLink.p-4.bg-purple-500.rounded-xl.shadow-lg.text-xl.text-center(to="membership/subscribe" v-if="!user?.email") Subscribe







  //- WaitList.fixed.top-20.right-4(v-if="!user?.email")
</template>

<style scoped lang="postcss"></style>