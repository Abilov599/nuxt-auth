export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated && to.name !== "auth") {
    return navigateTo("auth");
  }

  if (isAuthenticated && to.name === "auth") {
    return navigateTo("/");
  }
});
