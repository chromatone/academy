<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'

definePageMeta({ middleware: ["auth"] })

const route = useRoute()

const config = useRuntimeConfig()

definePageMeta({ middleware: ["auth"] })

const { getItemById } = useDirectusItems()
const { getThumbnail: img } = useDirectusFiles();

const { data: events, error } = await useAsyncData('artifact-' + route.params?.slug, async () => await getItemById({
  collection: 'artifacts',
  id: route.params?.slug,
  params: {
    filter: {
      slug: {
        _eq: route.params?.slug
      }
    },
    fields: ['*', 'files.directus_files_id.title', 'files.directus_files_id.id', 'files.directus_files_id.type', 'project.title', 'project.slug', 'project.program.title', 'project.program.slug', 'project.program.color', 'place.title', 'place.url']
  }
}))

const p = computed(() => events.value)

useHead({
  title: p.value?.title,
  titleTemplate: '%s event'
})

</script>

<template lang='pug'>
.px-4.flex.flex-wrap.gap-4.items-start 


  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    NuxtImg.w-full.rounded-xl.shadow-lg(
      v-if="p?.cover"
      :src="p?.cover"
      width="600"
      )

    NuxtLink.glass.p-2.text-lg.flex.gap-2.flex-wrap(
      :to="`/programs/${p?.project?.program?.slug}/`") {{ p?.project?.program?.title }} 
      .flex-1
      .op-50 program

    NuxtLink.glass.p-2.text-lg.flex.gap-2.flex-wrap(:to="`/projects/${p?.project?.slug}/`") {{ p?.project.title }}
      .flex-1
      .op-50 project

    .glass.p-4.flex-col.flex.gap-4
      .flex.gap-2.flex-wrap.items-center
        .text-2xl {{ p?.title }}
        .flex-auto
        NuxtLink.op-50(to="/artifacts/") artifact

      .text-lg {{ p?.description }}

    .glass.p-4.flex.flex-col.bg-light-300.dark-bg-dark-300.gap-2(v-if="p?.link || p?.github_repo")
      .flex.items-center.gap-2(v-if="p?.link")
        .i-la-link
        NuxtLink.text-truncate(:to="p.link" target="_blank") {{ p.link.split('https://')[1] || p.link }}
      .flex.items-center.gap-2(v-if="p?.github_repo")
        .i-la-github
        NuxtLink.text-truncate.max-w-80(:to="p.github_repo" target="_blank") {{ p.github_repo.split('https://github.com/')[1] || p.github_repo }}


    .glass.p-4.w-full(v-if="p?.files")
      .text-lg Files
      a.p-2.shadow.flex.flex-wrap.gap-2.bg-light-300.bg-op-30.rounded-xl.relative.items-center(
        :href="`${config.public.dbUrl}/assets/${file.directus_files_id?.id}?download`"
        target="_blank" 
        :download="file?.directus_files_id?.title"
        v-for="file in p?.files" :key="file") 
        .i-la-file-download
        .p-0 {{ file.directus_files_id?.title }}
        .absolute.right-2.op-40  {{ file.directus_files_id?.type }}


  .max-w-55ch.flex.flex-col.gap-4(style="flex: 1 1 300px")

    LiteYouTubeEmbed(
      title="Video" 
      :id="p?.youtube_video" 
      v-if="p?.youtube_video")

    .glass.px-4

      EventSchedule(:schedule="p?.schedule" v-if="p?.schedule")

      MDC.prose(:value="p?.content || ''" tag="article")

    LiteYouTubeEmbed(
      title="Video" 
      :id="p?.live_stream" 
      v-if="p?.live_stream")

</template>