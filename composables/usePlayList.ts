import type { Playlist } from '@/types/playlist';

export const usePlayList = (playlistId: string) => {
  const playlist = ref<Playlist | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(true);

  watchEffect(async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`/api/spotify/playlists/${playlistId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch playlist');
      }
      playlist.value = (await response.json()) as Playlist;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('An unknown error occurred');
    } finally {
      isLoading.value = false;
    }
  });

  return {
    playlist,
    error,
    isLoading,
  };
};
