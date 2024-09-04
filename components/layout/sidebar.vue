<script setup lang="ts">
import { useAuthState } from "~/stores/auth";

const loggedUser = useAuthState();

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      shortcuts: ["D"],
      disabled: true,
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      shortcuts: ["⌘", "D"],
    },
  ],
  [
    {
      label: "Log out",
      icon: "i-heroicons-arrow-right-circle-20-solid",
      click: () => {
        loggedUser.logout();
        navigateTo("/auth");
      },
    },
  ],
];

const links = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Vertical Navigation",
    icon: "i-heroicons-chart-bar",
    to: "/auth",
  },
];
</script>

<template>
  <aside
    class="flex h-full flex-col justify-between rounded border border-gray-200 dark:border-gray-800"
  >
    <div class="p-1">
      <UDropdown
        class="mb-1 w-full"
        :items="items"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="white"
          class="w-full justify-between"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        >
          <span class="flex gap-2">
            <NuxtImg
              class="size-5 rounded-full"
              src="https://avatars.githubusercontent.com/u/739984?v=4"
            />
            {{ loggedUser.username }}</span
          ></UButton
        >
      </UDropdown>
      <UVerticalNavigation :links="links" />
    </div>
    <div>
      <UDivider />
      <div class="flex justify-center p-1"><ThemeSwitcher /></div>
    </div>
  </aside>
</template>
