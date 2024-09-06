<script setup lang="ts">
const authStore = useAuthStore();
const { user } = authStore;

const toast = useToast();

useSeoMeta({
  title: "CRM",
});
</script>

<template>
  <div>
    <UButton
      label="Show toast"
      @click="toast.add({ title: user.email ?? '' })"
    />
  </div>
</template>
