<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const items = [
  {
    key: "login",
    label: "Login",
    description: "Enter your credentials to access your account.",
  },
  {
    key: "register",
    label: "Register",
    description: "Enter your credentials to create your account",
  },
];

const selectedTab = computed({
  get() {
    const index = items.findIndex((item) => item.key === route.query.tab);
    if (index === -1) return 0;

    return index;
  },
  set(value) {
    router.replace({
      query: { tab: items[value].key },
    });
  },
});

useSeoMeta({
  title: "Auth",
});

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <UTabs
      v-model="selectedTab"
      :items="items"
      :default-index="0"
      class="relative w-96 space-y-2"
    >
      <!--suppress VueUnrecognizedSlot -->
      <template #item="{ item }">
        <UCard>
          <template #header>
            <p
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ item.label }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ item.description }}
            </p>
          </template>

          <div v-if="item.key === 'login'" class="space-y-3">
            <AuthFormLogin />
          </div>
          <div v-else-if="item.key === 'register'" class="space-y-3">
            <AuthFormRegister />
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
