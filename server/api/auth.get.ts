import { setCookie } from 'h3';

const runtimeConfig = useRuntimeConfig();
const clientId = runtimeConfig.client_id;
const clientSecret = runtimeConfig.client_secret;
const redirectUri = 'http://localhost:3000/api/auth';
const authApiBase = 'https://accounts.spotify.com/authorize';
const tokenApiBase = 'https://accounts.spotify.com/api/token';
const scope = [
  'user-read-email',
  'user-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
].join(' ');

const buildSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
  });
  return `${authApiBase}?${params.toString()}`;
};

const getToken = async (code: string) => {
  try {
    const response = await fetch(tokenApiBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default defineEventHandler(async (event) => {
  const code = (getQuery(event).code as string) || null;

  if (!code) {
    const spotifyAuthUrl = buildSpotifyAuthUrl();
    return sendRedirect(event, spotifyAuthUrl);
  }

  try {
    const data = await getToken(code);

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const expiresIn = data.expires_in;

    setCookie(event, 'accessToken', accessToken, {
      httpOnly: true,
      maxAge: expiresIn,
      path: '/',
      sameSite: 'lax',
    });

    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });

    return sendRedirect(event, '/dashboard');
  } catch (error) {
    console.error('Error during token exchange:', error);
    return sendRedirect(event, '/error');
  }
});
