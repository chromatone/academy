export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { fetchUser, setUser } = useDirectusAuth();
  const user = useDirectusUser();
  if (!user.value) {
    const user = await fetchUser();
    setUser(user.value);
  }
  if (!user.value?.email) {
    return navigateTo("/auth/login");
  }

  // if (user.value.role == "adb23b79-49a5-4873-95fe-503654ccdbc1") {
  //   return navigateTo('/membership/subscribe')
  // }
});
