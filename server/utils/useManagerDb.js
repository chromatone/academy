import { createDirectus, rest, staticToken } from '@directus/sdk'

let directus

export function useManagerDirectus() {
  if (!directus) {
    const config = useRuntimeConfig()
    directus = createDirectus('https://db.chromatone.center/').with(rest()).with(staticToken(config.dbManagerKey))
  }
  return directus
}