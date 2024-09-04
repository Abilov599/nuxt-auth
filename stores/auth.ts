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

const useAuthState = defineStore("auth", {
  state() {
    return { ...initialState, token: useCookie("accessToken") || null };
  },

  getters: {
    isAuthenticated: (state) =>
      Boolean(state.token && useCookie("accessToken").value),
  },

  actions: {
    reset() {
      this.$patch(initialState);
    },

    set(user: ILoginResponse) {
      this.$patch(user);
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

export { useAuthState };
