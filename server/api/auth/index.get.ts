import { buildSpotifyAuthUrl, getToken, setAuthCookies, getSpotifyProfile } from '~/server/utils/spotify-auth';

export default defineEventHandler(async (event) => {
  const code = (getQuery(event).code as string) || null;

  if (!code) {
    const spotifyAuthUrl = buildSpotifyAuthUrl();
    return sendRedirect(event, spotifyAuthUrl);
  }

  try {
    const data = await getToken(code);
    setAuthCookies(event, data);

    await getSpotifyProfile(data.access_token);
    return sendRedirect(event, '/dashboard');
  } catch (error) {
    console.error('Error during authentication:', error);
    return sendRedirect(event, '/');
  }
});
