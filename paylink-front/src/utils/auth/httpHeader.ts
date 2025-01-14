import { GetSession } from './getSession'

export const httpHeaders = async () => {
  const session = await GetSession()
  if (!session) return {}
  return {
    Authorization: `Bearer ${session?.user?.token}`,
  }
}
