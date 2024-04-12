// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "One Ollama Chat",
    },
  },
  modules: ['@nuxt/ui'],
  ssr: false,
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
});
