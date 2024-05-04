export default defineNuxtRouteMiddleware((to, from) => {
  useNuxtApp().hook("page:finish", () => {
    if (history.state.scroll) {
      setTimeout(() => window.scrollTo(history.state.scroll), 20);
    } else {
      setTimeout(() => window.scrollTo(0, 0), 20);
    }
  });
})
