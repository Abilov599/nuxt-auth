<!--suppress CssUnusedSymbol -->
<script lang="ts" setup>
const authStore = useAuthStore();
await authStore.getMe();
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<!--<style scoped>-->
<!--.layout-enter-active,-->
<!--.layout-leave-active {-->
<!--  transition: all 0.4s;-->
<!--}-->
<!--.layout-enter-from,-->
<!--.layout-leave-to {-->
<!--  filter: grayscale(1);-->
<!--}-->

<!--.page-enter-active,-->
<!--.page-leave-active {-->
<!--  transition: all 0.4s;-->
<!--}-->
<!--.page-enter-from,-->
<!--.page-leave-to {-->
<!--  opacity: 0;-->
<!--  filter: blur(1rem);-->
<!--}-->
<!--</style>-->
