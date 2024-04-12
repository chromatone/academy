let i = 0

export async function useMeta() {

  const { data: academy } = await useFetch('/api/get/academy')

  return { academy }
}

export const useShowPrice = () => useState('show-price', () => true)