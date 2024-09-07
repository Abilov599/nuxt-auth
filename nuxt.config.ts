// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "./src",
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  // app: {
  //   pageTransition: { name: "page", mode: "out-in" },
  //   layoutTransition: { name: "layout", mode: "out-in" },
  // },
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "dayjs-nuxt",
  ],
});
