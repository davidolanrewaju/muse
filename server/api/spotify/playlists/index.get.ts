import { getAuthCookies, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBase_url;
const TRACKS_LIMIT = 18;

const getUsersPlayLists = async (accessToken: string, offset = 0, limit = TRACKS_LIMIT) => {
  try {
    const response = await fetch(`${apiBaseUrl}/me/playlists?offset=${offset}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
    const data = await response.json();
    return data.items.map((item: object) => item);
  } catch (error) {
    console.error('Error fetching saved featured_playlists:', error);
    throw error;
  }
};

const getFeaturedPlayLists = async (accessToken: string, offset = 0, limit = TRACKS_LIMIT) => {
  try {
    const response = await fetch(`${apiBaseUrl}/browse/featured-playlists?offset=${offset}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
    const data = await response.json();
    return data.playlists.items.map((item: object) => item);
  } catch (error) {
    console.error('Error fetching featured playlists:', error);
    throw error;
  }
};

const getPlayLists = async (accessToken: string, offset: number, limit: number) => {
  const [playlists, featured_playlists] = await Promise.all([getUsersPlayLists(accessToken, offset, limit), getFeaturedPlayLists(accessToken, offset, limit)]);

  return {
    playlists,
    featured_playlists,
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
    return await getPlayLists(accessToken, offset, limit);
  } catch (error: any) {
    if (error.statusCode === 401) {
      try {
        const data = await refreshAccessToken(refreshToken);
        setAuthCookies(event, data);
        return await getPlayLists(data.access_token, offset, limit);
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
