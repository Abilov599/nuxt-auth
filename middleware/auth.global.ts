// noinspection JSUnusedGlobalSymbols
export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated && to.name !== "auth") {
    return navigateTo("auth");
  }

  if (isAuthenticated && to.name === "auth") {
    return navigateTo("/");
  }
});
