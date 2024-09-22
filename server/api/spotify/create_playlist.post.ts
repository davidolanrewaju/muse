import { getAuthCookies, refreshAccessToken, setAuthCookies, getSpotifyProfile } from '~/server/utils/spotify-auth';

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBase_url;

const createPlayList = async (accessToken: string, userId: string, playlistName: string, playlistDescription: string, isPublic: boolean) => {
  try {
    const response = await fetch(`${apiBaseUrl}/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playlistName,
        description: playlistDescription,
        public: isPublic,
      }),
    });

    if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
    return await response.json();
  } catch (error) {
    console.error('Error creating playlist:', error);
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

  const body = await readBody(event);
  const { name, description, isPublic } = body;

  try {
    const profile = await getSpotifyProfile(accessToken);
    return await createPlayList(accessToken, profile.id, name, description, isPublic);
  } catch (error: any) {
    if (error.message === 'The access token expired') {
      const data = await refreshAccessToken(refreshToken);
      setAuthCookies(event, data);
      const profile = await getSpotifyProfile(data.access_token);
      return await createPlayList(data.access_token, profile.id, name, description, isPublic);
    }
    throw error;
  }
});
