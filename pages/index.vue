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
.flex.flex-wrap.bg-purple-100.dark-bg-purple-400.dark-bg-op-20
  .p-0.flex.flex-wrap.gap-4(style="flex: 1 1 100%")
    .left-0.right-0.top-10.max-w-55ch
      img.w-full(src="~/assets/images/spin.png")
    .flex.flex-col.gap-2.p-6
      h1.font-bold.text-6xl Chromatone
      h2.text-6xl Academy
      h3.text-2xl.mt-4 From open source to open minds
      .text-lg.max-w-55ch  We are exploring the new frontiers of the Visual Music Language for more than seven years. This novel approach brings light to obscure depths of Music and Arts. Our ventures result in practical knowledge, deeper understanding and open source web-apps. And now we have a way to share all of this with engaged students worldwide.

      .p-0.flex.flex-col.gap-4
        .text-2xl Membership Features
        ul
          li.py-1.text-xl(v-for="feature in academy?.features") {{ feature?.title }}

    //- h3.mt-8.max-w-45ch.text-xl {{ academy?.description }}


    //- .rounded-2xl.overflow-clip
      LiteYouTubeEmbed(title="Video" 
        :id="academy?.youtube_intro" 
        v-if="academy?.youtube_intro")

      //- button.p-4.text-2xl.bg-purple.rounded-lg.shadow-lg Buy Academy Membership
      NuxtLink.p-4.bg-purple-500.rounded-xl.shadow-lg.text-xl.text-center(to="membership/subscribe" v-if="!user?.email") Subscribe

  .flex.flex-col.gap-2.max-w-45ch(style="flex: 1 1 500px")
    .flex.flex-col.gap-2.relative.overflow-clip.rounded-xl
      //- NuxtImg.rounded-xl.w-full.absolute(src="a8079849-f231-46ac-ae90-0e7a08e14d3a" width="600")

      .glass.gap-4.p-4.flex.flex-col.gap-2.mx-4
        .text-2xl.op-90.uppercase 1 May - 1 June 2024
        .text-4xl Membership Soft Launch
        .text-xl Join us in May and get the early access subscription price

        //- NuxtLink.button(to="/membership/subscribe/") Subscribe with discounted price
        PriceCard(
          v-for="plan in plans"
          :key="plan"
          @click="prefer = plan"
          :plan="plan")
        NuxtLink.max-w-45ch.button(to="/membership/subscribe/") Subscribe today
  .flex.flex-col.gap-2.p-4.max-w-65ch(style="flex: 1 1 500px")
    //- NuxtImg.rounded-xl.w-full(src="3dd2f4c5-8054-4697-ad03-11da325d3ff0.jpg" width="600")
    .glass.gap-4.p-4.flex.flex-col.gap-2.mx-4
      .text-md 1 June - 1 September 2024
      .text-2xl Pilot Summer Season
      p First full-scale real life implementations of the educational  potential of Chromatone system and all the apps it provides. We launch from ground up to move and grow along with our first students and team members.
      p Three months of good news and interesting pieces of universal knowledge coming together in courses and projects, being carefully producing here in the Academy. What do mean by carefully? First of all - through open source interactive experiences.
      p Courses include with materials of four kinds: Tutorials, How-To Guides, Explanations and Reference. This documentation system called Diataxis opens up new async personalized education experiences within one simple framework.
      p Pilot Summer Season is where we will be launching all the courses all together, but looking at them as progressive and collaborative, not fixed and prerecorded. In such a way we will go unit by unit through the most awaited modules of the most popular courses. 
      p In three months we plan to get most of the courses structure filled with pilot content. It means that you can find yourself pretty confident in building your path through complex music theory concepts. We give you structured framework to build your own framework by yourself.
      p We have personalized approach for a limited group of students on intensive plan too. If you know where you're at and where you want to get, being it a music composition, a skill acquisition, a function implementation or some other performative actions. Our exprertise will be transformed into personal educational plans and supply of resources and materials for your purpose. Let's go!
  .flex.flex-wrap.gap-8.p-6(style="flex: 1 1 600px")
    NuxtLink.w-full.text-4xl(to="/programs/") Programs 
    ProgramBlock.overflow-clip.rounded-xl(
      style="flex: 1 1 300px"
      v-for="p in programs"
      :p="p")

  //- WaitList.fixed.top-20.right-4(v-if="!user?.email")
</template>

<style scoped lang="postcss"></style>