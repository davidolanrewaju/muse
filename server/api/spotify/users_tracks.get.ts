import { getAuthCookies, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = 'https://api.spotify.com/v1';

const getSpotifySavedTracks = async (accessToken: string, limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${apiBaseUrl}/me/tracks?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching saved tracks:', error);
    throw error;
  }
};

export default defineEventHandler(async (event) => {
  const { accessToken, refreshToken } = getAuthCookies(event);

  if (!accessToken || !refreshToken) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    const query = getQuery(event);
    const limit = Number(query.limit) || 20;
    const offset = Number(query.offset) || 0;

    return await getSpotifySavedTracks(accessToken, limit, offset);
  } catch (error: any) {
    if (error.statusCode === 401) {
      try {
        const data = await refreshAccessToken(refreshToken);
        setAuthCookies(event, data);
        const query = getQuery(event);
        const limit = Number(query.limit) || 20;
        const offset = Number(query.offset) || 0;
        return await getSpotifySavedTracks(data.access_token, limit, offset);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        throw createError({
          statusCode: 401,
          message: 'Unable to refresh access token',
        });
      }
    }
    throw error;
  }
});
