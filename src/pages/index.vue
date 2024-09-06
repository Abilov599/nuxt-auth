<script setup lang="ts">
const { user } = useUserStore();

const toast = useToast();

useSeoMeta({
  title: "CRM",
});
</script>

<template>
  <div>
    <UButton
      label="Show toast"
      @click="toast.add({ title: user.username ?? 'No data' })"
    />
  </div>
</template>
