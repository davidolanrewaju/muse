// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  alias: {
    assets: '/<rootDir>/assets',
  },
  css: ['~/assets/main.css'],
  runtimeConfig:{
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    public: {
      apiBase_url: "https://api.spotify.com/v1"
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
});
