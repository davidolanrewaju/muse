// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  alias: {
    assets: '/<rootDir>/assets',
  },
  css: ['~/assets/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
});
