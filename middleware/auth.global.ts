// noinspection JSUnusedGlobalSymbols
export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated && to.name !== "auth") {
    return navigateTo("auth");
  }

  if (isAuthenticated && to.name === "auth") {
    return navigateTo("/");
  }
});
