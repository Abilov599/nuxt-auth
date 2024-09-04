<script setup lang="ts">
const authStore = useAuthStore();
const { user } = authStore;
</script>

<template>
  <Head><Title>CRM</Title></Head>
  <div>{{ user.email }}</div>
</template>
