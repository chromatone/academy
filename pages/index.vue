<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'

const user = useDirectusUser()

const { academy } = await useMeta()

const { data: programs } = await useFetch('/api/list/programs')

</script>

<template lang="pug">
.p-0.flex.flex-wrap 
  .max-w-55ch.p-6.flex.flex-col.gap-8(style="flex: 1 1 300px")

    h1.text-4xl {{ academy?.title }}
    h2.text-lg {{ academy?.description }}
    //- .rounded-2xl.overflow-clip
      LiteYouTubeEmbed(title="Video" 
        :id="academy?.youtube_intro" 
        v-if="academy?.youtube_intro")
    .p-0.flex.flex-col.gap-4
      .text-2xl Membership Features
      ul
        li.list-circle.ml-4.py-1.text-lg(v-for="feature in academy?.features") {{ feature?.title }}
      //- button.p-4.text-2xl.bg-purple.rounded-lg.shadow-lg Buy Academy Membership
      NuxtLink.p-4.bg-purple-500.rounded-xl.shadow-lg.text-xl.text-center(to="membership/subscribe" v-if="!user?.email") Subscribe

  .flex.flex-col.gap-2.p-4(style="flex: 1 1 500px")
    .flex.flex-col.gap-2
      NuxtImg.rounded-xl.w-full(src="a8079849-f231-46ac-ae90-0e7a08e14d3a" width="600")
      .glass.gap-4.p-4.flex.flex-col.gap-2.-mt-50.mx-4
        .text-md.op-90 1 May - 1 June 2024
        .text-2xl Membership Soft Launch
        p Chromatone is being built as an open source app for more than 7 years already and now it's time to break the silence of GitHub repositories and interfaces and go beyound reseach to the proper education territory. Yes, we are starting the Academy to teach Visual Music Language and explore, what benefits it can bring to an interconnected community of students and researchers. 
        //- NuxtLink.button(to="/membership/subscribe/") Subscribe with discounted price

  .flex.flex-col.gap-2.p-4.max-w-65ch(style="flex: 1 1 500px")
    NuxtImg.rounded-xl.w-full(src="3dd2f4c5-8054-4697-ad03-11da325d3ff0.jpg" width="600")
    .glass.gap-4.p-4.flex.flex-col.gap-2.-mt-50.mx-4
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
