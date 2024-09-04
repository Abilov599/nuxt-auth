<script lang="ts" setup>
import { useAuthState } from "~/stores/auth";
import type { ILoginResponse } from "~/types/common";

const authState = useAuthState();

const { data, status, error } = await useFetch<ILoginResponse>(
  "https://dummyjson.com/auth/me",
  {
    headers: { Authorization: `Bearer ${useCookie("token").value}` },
  },
);

if (data?.value) {
  authState.set(data.value);
}
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
