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

  .flex.flex-wrap.pt-30vh.bg-purple-100.bg-op-20.dark-bg-purple-400.dark-bg-op-20.min-h-100vh.items-end.overflow-hidden.pb-8(style="flex: 1 1 100%")
    .top-0.absolute.right-0.-z-1.max-w-90vw
      img.w-full.-scale-x-100(src="~/assets/images/spin.png")
    .w-full.flex.flex-col.gap-2.p-6.z-20
      h1.font-bold.text-6xl Chromatone
      h2.text-6xl Academy

      .flex.flex-wrap.mt-4
        .flex.flex-col.mb-8(style="flex: 2 1 300px")
          h3.text-2xl Visual Music Language 
          h4.text-lg Education and Research Center
          .text-lg.max-w-45ch.mt-4 We are exploring the new frontiers of interconnected senses research and development. This novel approach brings light to somewhat obscure depths of Music and Arts. Our ventures of the last 7 years resulted in practical knowledge, deeper understanding of music theory and open source interactive web-apps. And here now we are building a medium to share all of this experience with involved students worldwide.
        .flex-1
        .p-0.flex.flex-col.gap-4.glass.p-4.self-start(style="flex: 1 1 300px")
          .text-2xl Membership features
          ul.flex.flex-col.gap-2
            li.rounded.px-2.py-1.bg-purple-200.bg-op-20(
              style="flex: 1"
              v-for="feature in academy?.features") {{ feature?.title }}
          .flex.gap-2.items-center
            NuxtLink.max-w-45ch.bg-purple-300.dark-bg-purple-600.p-4.rounded-xl.text-xl.flex-1(to="/membership/subscribe/") Subscribe now
            NuxtLink.bg-purple-300.bg-op-40.op-80.dark-bg-purple-600.dark-bg-op-40.p-4.rounded-xl.text-xl.box-border(to="/auth/login/") Login
        .flex-1
  .flex.flex-col.p-4.flex-1.w-full(style="flex: 1 1 100%")
    PageCount

  .flex.flex-col.gap-2.max-w-55ch.py-10(style="flex: 1 1 500px")
    .flex.flex-col.gap-2.relative.overflow-clip.rounded-xl
      //- NuxtImg.rounded-xl.w-full.absolute(src="a8079849-f231-46ac-ae90-0e7a08e14d3a" width="600")

      .gap-4.p-4.flex.flex-col.gap-2.mx-4
        .text-2xl.op-90.uppercase 1 May - 1 June 2024
        .text-4xl May Soft Launch
        .text-xl Join us today and get the early bird price
        p From open source to open minds. You will see how we're growing from the ground up, from the very first students with you among them. There will be constant documented improvements and warm feedback loop for you to be able to learn the things you want to explore. We're open for 

        NuxtLink.max-w-45ch.max-w-45ch.bg-purple-300.dark-bg-purple-600.p-4.rounded-xl.text-xl.grayscale-10.hover-grayscale-0.transition(to="/membership/subscribe/") Subscribe today

  .flex.flex-wrap.gap-8.p-6(style="flex: 1 1 600px")
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



  //- .flex.flex-col.gap-2.p-4.max-w-65ch(style="flex: 1 1 500px")
  //-   //- NuxtImg.rounded-xl.w-full(src="3dd2f4c5-8054-4697-ad03-11da325d3ff0.jpg" width="600")
  //-   .glass.gap-4.p-4.flex.flex-col.gap-2.mx-4
  //-     .text-md 1 June - 1 September 2024
  //-     .text-2xl Pilot Summer Season
  //-     p First full-scale real life implementations of the educational  potential of Chromatone system and all the apps it provides. We launch from ground up to move and grow along with our first students and team members.
  //-     p Three months of good news and interesting pieces of universal knowledge coming together in courses and projects, being carefully producing here in the Academy. What do mean by carefully? First of all - through open source interactive experiences.
  //-     p Courses include with materials of four kinds: Tutorials, How-To Guides, Explanations and Reference. This documentation system called Diataxis opens up new async personalized education experiences within one simple framework.
  //-     p Pilot Summer Season is where we will be launching all the courses all together, but looking at them as progressive and collaborative, not fixed and prerecorded. In such a way we will go unit by unit through the most awaited modules of the most popular courses. 
  //-     p In three months we plan to get most of the courses structure filled with pilot content. It means that you can find yourself pretty confident in building your path through complex music theory concepts. We give you structured framework to build your own framework by yourself.
  //-     p We have personalized approach for a limited group of students on intensive plan too. If you know where you're at and where you want to get, being it a music composition, a skill acquisition, a function implementation or some other performative actions. Our exprertise will be transformed into personal educational plans and supply of resources and materials for your purpose. Let's go!



  //- WaitList.fixed.top-20.right-4(v-if="!user?.email")
</template>

<style scoped lang="postcss"></style>