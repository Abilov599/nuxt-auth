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
  i18n: {
    lazy: true,
    strategy: "no_prefix",
    langDir: "locales",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US", file: "en.json" },
      { code: "az", language: "az-Az", file: "az.json" },
    ],
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
    "nuxt-typed-router",
  ],
});
