import { getAuthCookies, refreshAccessToken, setAuthCookies } from '~/server/utils/spotify-auth';

const apiBaseUrl = 'https://api.spotify.com/v1';

const getGlobalTopTracks = async (accessToken: string, limit = 20) => {
  const response = await fetch(`${apiBaseUrl}/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?limit=${limit}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
  const data = await response.json();
  return data.items.map((item: any) => item.track);
};

const getGlobalTopArtists = async (accessToken: string, limit = 20) => {
  const response = await fetch(`${apiBaseUrl}/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?limit=${limit}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
  const data = await response.json();
  
  const uniqueArtists = [...new Set(data.items.map((item: any) => item.track.artists[0]))].slice(0, limit);
  
  const artistPromises = uniqueArtists.map(async (artist: any) => {
    const artistResponse = await fetch(`${apiBaseUrl}/artists/${artist.id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!artistResponse.ok) throw createError({ statusCode: artistResponse.status, statusMessage: artistResponse.statusText });
    return artistResponse.json();
  });

  return Promise.all(artistPromises);
};


const getNewReleases = async (accessToken: string, limit = 20) => {
  const response = await fetch(`${apiBaseUrl}/browse/new-releases?limit=${limit}&country=US`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw createError({ statusCode: response.status, statusMessage: response.statusText });
  const data = await response.json();
  return data.albums.items;
};

const getGlobalTrendingContent = async (accessToken: string) => {
  const [tracks, artists, newReleases] = await Promise.all([getGlobalTopTracks(accessToken), getGlobalTopArtists(accessToken), getNewReleases(accessToken)]);

  return {
    trending_tracks: tracks,
    trending_artists: artists,
    trending_albums: newReleases,
  };
};

export default defineEventHandler(async (event) => {
  const { accessToken, refreshToken } = getAuthCookies(event);

  if (!accessToken || !refreshToken) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  try {
    return await getGlobalTrendingContent(accessToken);
  } catch (error: any) {
    if (error.statusCode === 401) {
      try {
        const data = await refreshAccessToken(refreshToken);
        setAuthCookies(event, data);
        return await getGlobalTrendingContent(data.access_token);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        throw createError({ statusCode: 401, message: 'Unable to refresh access token' });
      }
    }
    throw error;
  }
});
