import { getAuthCookies, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBase_url;

const getPlaylist = async (accessToken: string, playlistId: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export default defineEventHandler(async (event) => {
  const playlistId = event.context.params?.id;
  if (!playlistId) {
    throw createError({
      statusCode: 400,
      message: 'Playlist ID is required',
    });
  }

  const { accessToken, refreshToken } = getAuthCookies(event);

  if (!accessToken || !refreshToken) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    return await getPlaylist(accessToken, playlistId);
  } catch (error: any) {
    if (error.message === 'The access token expired') {
      const data = await refreshAccessToken(refreshToken);
      setAuthCookies(event, data);
      return await getPlaylist(data.access_token, playlistId);
    }
    throw error;
  }
});
