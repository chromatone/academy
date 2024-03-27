let i = 0

export async function useMeta() {

  const { getSingletonItem } = useDirectusItems()

  const { data: academy } = await useAsyncData('academy-meta', async () => {
    console.log('loading ' + i++)
    return await getSingletonItem({ collection: 'academy' })
  })

  return { academy }
}

export const useShowPrice = () => useState('show-price', () => true)