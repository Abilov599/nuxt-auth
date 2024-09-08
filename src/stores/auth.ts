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
    const { data } = await useFetch<ILoginResponse>(
      "https://dummyjson.com/auth/login",
      {
        method: "POST",
        body: JSON.stringify(payload),
        pick: ["token", "refreshToken"],
      },
    );

    if (data?.value) {
      set({
        token: data.value.token,
        refreshToken: data.value.refreshToken,
      });
      useCookie("accessToken", {
        maxAge: 60 * 24 * 28,
        sameSite: true,
        secure: true,
      }).value = data.value.token;
    }
  }

  return { tokens, isAuthenticated, reset, set, logout, login };
});

// Options API usage (In my opinion this approach gives better DX, but is not flexible as Composition API)
// export const useAuthStore = defineStore("auth", {
//   state: (): IAuthState => ({
//     ...initialState,
//     token: useCookie("accessToken").value,
//   }),
//
//   getters: {
//     isAuthenticated: (state) =>
//       Boolean(state.token && useCookie("accessToken").value),
//   },
//
//   actions: {
//     reset() {
//       this.$patch(initialState);
//     },
//
//     set(payload: IAuthState) {
//       this.$patch(payload);
//     },
//
//     logout() {
//       this.reset();
//       useCookie("accessToken").value = null;
//     },
//
//     async login(payload: { username: string; password: string }) {
//       const { data } = await useFetch<ILoginResponse>(
//         "https://dummyjson.com/auth/login",
//         {
//           method: "POST",
//           body: JSON.stringify(payload),
//         },
//       );
//
//       if (data?.value) {
//         this.set({
//           token: data.value.token,
//           refreshToken: data.value.refreshToken,
//         });
//         useCookie("accessToken", {
//           maxAge: 60 * 24 * 28,
//           sameSite: true,
//           secure: true,
//         }).value = data.value.token;
//       }
//     },
//   },
// });

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
