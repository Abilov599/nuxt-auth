import type { Nullable } from "~/types/utils";
import type { ILoginResponse } from "~/types/common";

interface IAuthState extends Nullable<ILoginResponse> {}

const initialState: IAuthState = {
  token: null,
  refreshToken: null,
};

// Composition API usage (This approach allows us to create local variables and use them, but we can't do that with Options API)
export const useAuthStore = defineStore("auth", () => {
  const cookieToken = useCookie("accessToken");

  const tokens = ref<IAuthState>({
    ...initialState,
    token: cookieToken.value || null,
  });

  const isAuthenticated = computed(() =>
    Boolean(tokens.value.token && cookieToken.value),
  );

  function reset() {
    tokens.value = initialState;
  }

  function set(payload: IAuthState) {
    tokens.value = payload;
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
        pick: ["token", "refreshToken"],

        onResponse({ response }) {
          set({
            token: response._data.token,
            refreshToken: response._data.refreshToken,
          });

          useCookie("accessToken", {
            maxAge: 60 * 24 * 28,
            sameSite: true,
            secure: true,
          }).value = response._data.token;
        },
      },
    );

    return {
      status: status.value,
      error: error.value,
      tokens: data.value,
    };
  }

  return { tokens, isAuthenticated, reset, set, logout, login };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
