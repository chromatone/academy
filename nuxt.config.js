export default defineNuxtConfig({
  extends: ['./auth', './theme', './membership'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  site: {
    url: 'https://academy.chromatone.center'
  },
  css: [
    '@unocss/reset/tailwind.css',
    'notivue/notifications.css',
    'notivue/animations.css'
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  notivue: {
    position: 'top-right'
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
    emailHook: '',
    emailFrom: '',
    emailSmtpHost: '',
    emailSmtpPort: '',
    emailSmtpSecure: '',
    emailSmtpUser: '',
    emailSmtpPassword: '',
    public: {
      appDomain: '',
      dbUrl: '',
      dbToken: '',
      academyKey: '',
      umamiId: '',
      umamiUrl: '',
      subscriptionsOpen: '',
    }
  },
  modules: [
    'nuxt-auth-utils',
    "@unocss/nuxt",
    "nuxt-directus",
    "@nuxtjs/sitemap",
    '@nuxtjs/mdc',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    'notivue/nuxt',
    '@vue-email/nuxt'
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
  vueEmail: {
    baseUrl: 'https://academy.chromatone.center/',
    autoImport: true,
  }
})