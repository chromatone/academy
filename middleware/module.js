export default defineNuxtRouteMiddleware(async (to, _from) => {

  const user = useDirectusUser();

  const { getItemById } = useDirectusItems()

  const member = await getItemById({
    collection: 'members',
    id: user?.value?.member,
    params: {
      fields: ['student.modules.modules_id.*']
    }
  })

  const isStudent = !!member?.student?.[0]?.modules?.find(c => c?.modules_id == to?.params?.module)

  if (!isStudent) {
    return navigateTo(`/courses/${to?.params?.course}/${to?.params?.module}/start/`)
  }

});
