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
    return { ...initialState, token: useCookie("token") || null };
  },

  getters: {
    isAuthenticated: (state) =>
      Boolean(state.token && useCookie("token").value),
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
      useCookie("token", {
        maxAge: 0,
        sameSite: true,
        secure: true,
      }).value = null;
    },
  },
});

export { useAuthState };
