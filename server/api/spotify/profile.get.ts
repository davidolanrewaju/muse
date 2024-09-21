import { getAuthCookies, getSpotifyProfile, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

export default defineEventHandler(async (event) => {
  const { accessToken, refreshToken } = getAuthCookies(event);

  if (!accessToken || !refreshToken) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    return await getSpotifyProfile(accessToken);
  } catch (error: any) {
    if (error.message === 'The access token expired') {
      const data = await refreshAccessToken(refreshToken);
      setAuthCookies(event, data);
      return await getSpotifyProfile(data.access_token);
    }
    throw error;
  }
});