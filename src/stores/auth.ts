import type { ILoginResponse } from "~/types/common";

interface IAuthState {
  token: string | null;
}

const initialState: IAuthState = {
  token: null,
};

export const useAuthStore = defineStore("auth", {
  state() {
    return { token: useCookie("accessToken") || null };
  },

  getters: {
    isAuthenticated: (state) =>
      Boolean(state.token && useCookie("accessToken").value),
  },

  actions: {
    reset() {
      this.$patch(initialState);
    },

    set(token: IAuthState) {
      this.$patch(token);
    },

    async login(payload: { username: string; password: string }) {
      const { data } = await useFetch<ILoginResponse>(
        "https://dummyjson.com/auth/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
      );

      if (data?.value) {
        this.set({ token: data.value.token || null });
        useCookie("accessToken", {
          maxAge: 60 * 24 * 28,
          sameSite: true,
          secure: true,
        }).value = data.value.token;
      }
    },

    logout() {
      this.reset();
      useCookie("accessToken", {
        maxAge: 0,
        sameSite: true,
        secure: true,
      }).value = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
