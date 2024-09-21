import { getAuthCookies, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBase_url;
const TRACKS_LIMIT = 18;

const getUsersTracks = async (accessToken: string, offset = 0, limit = TRACKS_LIMIT) => {
  try {
    const response = await fetch(`${apiBaseUrl}/me/tracks?offset=${offset}&limit=${limit}`, {
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
    return data.items.map((item: any) => item.track);
  } catch (error) {
    console.error('Error fetching saved tracks:', error);
    throw error;
  }
};

const getUsersTopTracks = async (accessToken: string, offset = 0, limit = 9) => {
  try {
    const response = await fetch(`${apiBaseUrl}/me/top/tracks?offset=${offset}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
    const data = await response.json();
    return data.items.map((item: any) => item);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error;
  }
};

const getTracks = async (accessToken: string, offset: number, limit: number) => {
  const [top_tracks, tracks] = await Promise.all([getUsersTopTracks(accessToken, limit), getUsersTracks(accessToken, offset, limit)]);

  return {
    top_tracks,
    tracks,
  };
};

export default defineEventHandler(async (event) => {
  const { accessToken, refreshToken } = getAuthCookies(event);
  const query = getQuery(event);
  const offset = Number(query.offset) || 0;
  const limit = Number(query.limit) || TRACKS_LIMIT;

  if (!accessToken || !refreshToken) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    return await getTracks(accessToken, offset, limit);
  } catch (error: any) {
    if (error.statusCode === 401) {
      try {
        const data = await refreshAccessToken(refreshToken);
        setAuthCookies(event, data);
        return await getTracks(data.access_token, offset, limit);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        throw createError({
          statusCode: 401,
          message: 'Unable to refresh access token',
        });
      }
    }
    console.error('Unexpected error:', error);
    throw error;
  }
});
