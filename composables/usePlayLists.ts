export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: { total: number };
  description: string;
  public: boolean;
  owner: { display_name: string; id: string };
}

export function usePlaylist() {
  const playListData = ref<{ playlists: Playlist[]; featured_playlists: Playlist[] } | null>(null);
  const showCreatePlaylistPopup = ref(false);

  const fetchPlaylists = async () => {
    const { data } = await useFetch<typeof playListData.value>('/api/spotify/playlists');
    playListData.value = data.value;
  };

  const openCreatePlaylistPopup = () => {
    showCreatePlaylistPopup.value = true;
  };

  const closeCreatePlaylistPopup = () => {
    showCreatePlaylistPopup.value = false;
  };

  const createPlaylist = async (playlistData: object) => {
    try {
      const response = await fetch('/api/spotify/playlists/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistData),
      });
      const newPlaylist = await response.json();

      if (playListData.value) {
        playListData.value.playlists.unshift(newPlaylist);
      }

      closeCreatePlaylistPopup();
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  return {
    playListData,
    showCreatePlaylistPopup,
    fetchPlaylists,
    openCreatePlaylistPopup,
    closeCreatePlaylistPopup,
    createPlaylist,
  };
}
