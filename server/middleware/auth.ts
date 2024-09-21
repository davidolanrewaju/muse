import { getAuthCookies, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

export default defineEventHandler(async (event) => {
  const { accessToken, refreshToken } = getAuthCookies(event);

  if (!accessToken && !refreshToken) {
    return;
  }

  if (!accessToken && refreshToken) {
    try {
      const data = await refreshAccessToken(refreshToken);
      setAuthCookies(event, data);
    } catch (error) {
      console.error('Error refreshing token:', error);

      // Clear both cookies
      deleteCookie(event, 'accessToken');
      deleteCookie(event, 'refreshToken');

      // Only redirect if it's not an API route
      const url = getRequestURL(event);
      if (!url.pathname.startsWith('/api/')) {
        return sendRedirect(event, '/');
      }
    }
  }
});
