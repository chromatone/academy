import { createDirectus, rest, staticToken } from "@directus/sdk"

let db

export function usePublicDirectus() {
  const config = useRuntimeConfig()
  if (!db) {
    db = createDirectus(config.public.dbUrl).with(rest()).with(staticToken(config.public.academyKey))
  }
  return db
}