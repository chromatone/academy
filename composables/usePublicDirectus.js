import { createDirectus, rest, staticToken } from '@directus/sdk';

export function usePublicDirectus() {
  const config = useRuntimeConfig()

  const directus = createDirectus(config.public.dbUrl).with(rest()).with(staticToken(config.public.academyKey));

  return directus
}