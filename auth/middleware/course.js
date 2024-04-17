export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { fetchUser, setUser } = useDirectusAuth();
  const user = useDirectusUser();

  if (!user.value) {
    const us = await fetchUser();
    setUser(us.value);
  }

  const { getItemById } = useDirectusItems()

  const member = await getItemById({
    collection: 'members',
    id: user?.value?.member,
    params: {
      fields: ['student.courses.courses_slug']
    }
  })

  const isStudent = !!member?.student?.[0]?.courses?.find(c => c?.courses_slug == to?.params?.course)

  if (!isStudent) {
    return navigateTo(`/courses/${to?.params?.course}/apply/`)
  }

});
