import { H3Event } from 'h3';

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

export const buildSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
  });
  return `${authApiBase}?${params.toString()}`;
};

export const getToken = async (code: string) => {
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

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(tokenApiBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_description || data.error);
    }

    return data;
  } catch (error) {
    console.error('Error in refreshAccessToken:', error);
    throw error;
  }
};

export const getSpotifyProfile = async (accessToken: string) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const setAuthCookies = (event: H3Event, data: any) => {
  setCookie(event, 'accessToken', data.access_token, {
    httpOnly: true,
    maxAge: data.expires_in,
    path: '/',
    sameSite: 'lax',
  });

  if (data.refresh_token) {
    setCookie(event, 'refreshToken', data.refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }
};

export const getAuthCookies = (event: H3Event) => {
  const accessToken = getCookie(event, 'accessToken');
  const refreshToken = getCookie(event, 'refreshToken');
  return { accessToken, refreshToken };
};
