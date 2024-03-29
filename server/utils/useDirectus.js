import { createDirectus, rest, staticToken } from '@directus/sdk'

let directus

export function useDirectus() {
  if (!directus) {
    const config = useRuntimeConfig()
    directus = createDirectus(config.public.dbUrl).with(rest()).with(staticToken(config.dbManagerKey))
  }
  return directus
}

