import { getAuthCookies } from '~/server/utils/spotify-auth'

export default defineEventHandler((event) => {
  const { accessToken } = getAuthCookies(event)
  return {
    authenticated: !!accessToken
  }
})