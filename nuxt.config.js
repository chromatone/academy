import { createDirectus, rest, staticToken, readSingleton, updateSingleton } from "@directus/sdk"
import pack from './package.json'

export default defineNuxtConfig({
  extends: ['./auth', './theme', './membership', './news'],
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
    '@vue-email/nuxt',
    'floating-vue/nuxt',
    'nuxt-cron'
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
  },
  hooks: {
    'build:before': async () => {
      const db = createDirectus(process.env?.NUXT_PUBLIC_DB_URL).with(rest()).with(staticToken(process.env?.NUXT_PUBLIC_ACADEMY_KEY))
      const academy = await db.request(readSingleton('academy', { fields: ['version'] }))
      console.log('version in db: ', academy?.version)
      console.log('version in package.json: ', pack?.version)
      if (pack?.version != academy?.version) {
        await db.request(updateSingleton('academy', {
          version: pack?.version
        }))
        console.log('updated version to: ', pack?.version)
      }
    }
  }
})