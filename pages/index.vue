<script setup lang="ts">
const authStore = useAuthStore();
const { user } = authStore;

useSeoMeta({
  title: "CRM",
});
</script>

<template>
  <div>{{ user.email }}</div>
</template>
