<template>
  <section class="relative grid h-screen grid-cols-[1fr_6fr] p-1">
    <div class="sticky top-0 p-1">
      <LayoutSidebar />
    </div>
    <div
      class="m-1 overflow-scroll rounded border border-gray-200 p-1 dark:border-gray-800"
    >
      <slot />
    </div>
  </section>
</template>
