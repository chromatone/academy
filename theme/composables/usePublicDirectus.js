import { createDirectus, rest, staticToken, readItems, readItem } from '@directus/sdk';

let directus

export function usePublicDirectus() {
  if (!directus) {
    console.log('creating directus')
    const config = useRuntimeConfig()
    directus = createDirectus(config.public.dbUrl).with(rest()).with(staticToken(config.public.academyKey));
  }
  return directus
}

export async function usePublicItems(collection, options) {
  let pd = usePublicDirectus()
  const { data } = await useAsyncData(`public-${collection}`, async () => await pd.request(readItems(collection, options)))
  return data
}

export async function usePublicItem(collection, id, options) {
  let pd = usePublicDirectus()
  const { data } = await useAsyncData(`public-${collection}-item`, async () => await pd.request(readItem(collection, id, options)))
  return data
}
