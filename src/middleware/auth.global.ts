// noinspection JSUnusedGlobalSymbols
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated && to.name !== "auth") {
    return navigateTo("/auth");
  }

  if (isAuthenticated && to.name === "auth") {
    return navigateTo("/");
  }
});
