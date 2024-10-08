import type { IGetMeResponse } from "~/types/common";
import type { Nullable } from "~/types/utils";

interface IUserState extends Nullable<IGetMeResponse> {}

const initialState: IUserState = {
  id: null,
  firstName: null,
  lastName: null,
  maidenName: null,
  age: null,
  gender: null,
  email: null,
  phone: null,
  username: null,
  password: null,
  birthDate: null,
  image: null,
  bloodGroup: null,
  height: null,
  weight: null,
  eyeColor: null,
  hair: null,
  ip: null,
  address: null,
  macAddress: null,
  university: null,
  bank: null,
  company: null,
  ein: null,
  ssn: null,
  userAgent: null,
  crypto: null,
  role: null,
};

// Options API usage (In my opinion this approach gives better DX, but is not flexible as Composition API)
export const useUserStore = defineStore("user", {
  state: () => initialState,

  getters: {
    user: (state) => state,
  },

  actions: {
    reset() {
      this.$patch(initialState);
    },

    set(user: IUserState) {
      this.$patch(user);
    },

    async getUser() {
      const { status, error, data, refresh } = await useFetch<IUserState>(
        "https://dummyjson.com/auth/me",
        {
          // on request interceptor
          onRequest({ request, options }) {
            options.headers = (options.headers as Record<string, string>) || {};
            options.headers.Authorization = `Bearer ${useCookie("accessToken").value}`;
          },

          // // fetch options
          // headers: {
          //   Authorization: `Bearer ${useCookie("accessToken").value}`,
          // },
        },
      );

      if (data?.value) {
        this.set(data.value);
      }

      return {
        status: status.value,
        error: error.value,
        user: data.value,
        refresh,
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
