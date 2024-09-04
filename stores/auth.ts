import type { ILoginResponse, Nullable } from "~/types/common";

interface IAuthState extends Nullable<ILoginResponse> {}

const initialState: IAuthState = {
  id: null,
  email: null,
  username: null,
  lastName: null,
  firstName: null,
  image: null,
  gender: null,
  token: null,
  refreshToken: null,
};

export const useAuthStore = defineStore("auth", {
  state() {
    return { ...initialState, token: useCookie("accessToken") || null };
  },

  getters: {
    isAuthenticated: (state) =>
      Boolean(state.token && useCookie("accessToken").value),

    user: (state) => state,
  },

  actions: {
    reset() {
      this.$patch(initialState);
    },

    set(user: ILoginResponse) {
      this.$patch(user);
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
        this.set(data.value);
        useCookie("accessToken", {
          maxAge: 60 * 24 * 28,
          sameSite: true,
          secure: true,
        }).value = data.value.token;
      }
    },

    async getMe() {
      const { data } = await useFetch<ILoginResponse>(
        "https://dummyjson.com/auth/me",
        {
          headers: {
            Authorization: `Bearer ${useCookie("accessToken").value}`,
          },
        },
      );

      if (data?.value) {
        this.set(data.value);
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
