<script setup>
definePageMeta({ middleware: ["auth"] })

const { academy } = await useMeta()

const user = useDirectusUser();
const { logout } = useDirectusAuth();

watch(user, us => !us?.email ? navigateTo('/auth/login') : '')

const onSubmit = async () => { await logout(); await navigateTo('/auth/login') };

const { getItemById, updateItem } = useDirectusItems()

const member = await getItemById({
  collection: 'members',
  id: user.value?.member?.[0],
  params: {
    fields: [
      '*', 'role', 'active',
      'subscriptions.current_period_end',
      'subscriptions.status',
      'subscriptions.plan.title',
      'student.courses.*',
      'student.courses.courses_slug.slug',
      'student.courses.courses_slug.title',
      'team.*'
    ],
    deep: {
      student: {
        courses: {
          _sort: '-start_date'
        },
      },
      subscriptions: {
        _sort: 'start_date',
        _filter: {
          status: {
            _eq: 'active'
          }
        }
      }
    }
  },
})

</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.mx-4.items-start
  .glass.p-4.flex.flex-col.gap-4.justify-center(style="flex: 1 1 200px")
    .flex.flex-wrap.gap-2
      .text-4xl {{ user?.first_name }} 
      .text-4xl {{ user?.last_name }}
    .font-mono  {{ user?.email }}
    .absolute.right-4.flex.gap-2
      NuxtLink.flex.gap-2.items-center.block.rounded-xl.flex-1.p-2.border-1.shadow-lg(to="/me/account/")
        .i-la-cog
        .p-0 Account
    .flex.gap-2.items-center.flex-wrap.text-sm.uppercase
      .op-90 {{ member?.role }}
      .op-50(v-for="sub in member?.subscriptions" :key="sub") {{ sub?.plan?.title }}
      .flex-1 
      .op-40 @{{ member?.discord_username }}

  .p-2.flex.flex-col.gap-4.flex-1(v-if="!user?.member?.[0]")
    .p-2 No membership yet.
    NuxtLink.flex-1.text-xl.bg-purple-500.p-4.rounded-xl.shadow(to="/membership/subscribe/") Subscribe for membership

  .flex.flex-col.gap-4(style="flex: 1 1 200px")
    .glass.p-4
      .text-2xl Student
    .glass.p-4.flex
      .text-xl Courses
      .flex-1 
      .p-0 {{ member?.student?.[0]?.courses?.length }}
    NuxtLink.p-4.flex.flex-col.gap-2.glass(
      v-for="c in member?.student?.[0]?.courses"
      :to="`/courses/${c.courses_slug.slug}/`"
      ) 
      .text-xl {{ c.courses_slug?.title }}
      .text-xs START:  {{ c?.start_date.slice(0,10) }}
      .text-xs FROM: {{ c?.prior_experience }}
      .text-xs TO: {{ c?.motivation }}


  .flex.flex-col.gap-4(
    v-if="member?.team?.length>0"
    style="flex: 1 1 200px")

    .glass.p-4.flex.flex-col.gap-2
      .text-2xl Author

    template(v-for="team in member?.team")
      template(v-for="t in ['programs', 'projects','courses','modules']")
        .glass.p-4(v-if="team?.[t]?.length>0")
          .font-mono.capitalize {{ t }}: {{ team?.[t]?.length }}

  pre {{ member }}
</template>