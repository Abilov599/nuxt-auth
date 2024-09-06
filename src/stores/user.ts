interface IUserState {
  // id: number | null;
  username: string | null;
  // email: string | null;
  // firstName: string | null;
  // lastName: string | null;
  // gender: string | null;
  // image: string | null;
}

const initialState: IUserState = {
  username: null,
};

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
      const { data } = await useFetch<IUserState>(
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
