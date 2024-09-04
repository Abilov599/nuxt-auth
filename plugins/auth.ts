import { useAuthState } from "~/stores/auth";
import type { ILoginResponse } from "~/types/common";

export default defineNuxtPlugin(() => {
  const authState = useAuthState();
  const { data, status, error } = useFetch<ILoginResponse>(
    "https://dummyjson.com/auth/me",
    {
      headers: { Authorization: `Bearer ${useCookie("token").value}` },
    },
  );

  if (data?.value) {
    authState.set(data.value);
  }
});
