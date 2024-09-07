<script setup lang="ts">
const { user } = useUserStore();

const toast = useToast();

const { locale, setLocale } = useI18n();

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
    <br />
    <br />
    <div class="flex gap-5">
      <UButton label="en" @click="setLocale('en')" />
      <UButton label="az" @click="setLocale('az')" />
      <p>{{ $t("welcome") }}</p>
    </div>
  </div>
</template>
