export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  site: {
    url: 'https://academy.chromatone.center'
  },
  css: ['@unocss/reset/tailwind.css'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  directus: {
    autoRefresh: true,
    devtools: true,
    url: process.env?.NUXT_PUBLIC_DB_URL,
    token: process.env?.NUXT_PUBLIC_ACADEMY_KEY
  },
  runtimeConfig: {
    dbManagerKey: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    apiToken: '',
    public: {
      appDomain: '',
      dbUrl: '',
      dbToken: '',
      academyKey: '',
      umamiId: '',
      umamiUrl: ''
    }
  },
  modules: [
    "@unocss/nuxt",
    "nuxt-directus",
    "@nuxtjs/sitemap",
    '@nuxtjs/mdc',
    '@nuxt/image',
    '@nuxtjs/color-mode',
  ],
  routeRules: {
    '/': { prerender: true },
  },
  colorMode: {
    classSuffix: ''
  },
  image: {
    provider: 'directus',
    format: ['webp'],
    domains: [process.env?.NUXT_PUBLIC_DB_DOMAIN],
    directus: {
      baseURL: `${process.env?.NUXT_PUBLIC_DB_URL}/assets/`,
      modifiers: {
        withoutEnlargement: 'true'
      }
    }
  },
  experimental: {
    sharedPrerenderData: true
  },
})