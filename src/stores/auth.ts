import type { ILoginResponse } from "~/types/common";

// Composition API usage (This approach allows us to create local variables and use them, but we can't do that with Options API)
export const useAuthStore = defineStore("auth", () => {
  const cookieToken = useCookie("accessToken");

  const token = ref<string | null>(cookieToken.value || null);

  const isAuthenticated = computed(() =>
    Boolean(token.value && cookieToken.value),
  );

  function reset() {
    token.value = null;
  }

  function set(accessToken: string) {
    token.value = accessToken;
  }

  function logout() {
    reset();
    cookieToken.value = null;
  }

  async function login(payload: { username: string; password: string }) {
    const { status, error, data } = await useFetch<ILoginResponse>(
      "https://dummyjson.com/auth/login",
      {
        method: "POST",
        body: JSON.stringify(payload),
        pick: ["accessToken"],

        onResponse({ response }) {
          set(response._data.accessToken);

          useCookie("accessToken", {
            maxAge: 60 * 24 * 28,
            sameSite: true,
            secure: true,
          }).value = response._data.accessToken;
        },
      },
    );

    return {
      status: status.value,
      error: error.value,
      token: data.value,
    };
  }

  return { token, isAuthenticated, reset, set, logout, login };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
