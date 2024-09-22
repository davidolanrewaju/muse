import { ref } from 'vue';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
}

interface MusicData {
  top_tracks: Track[];
  tracks: Track[];
}

export function useMusicData() {
  const musicData = ref<MusicData | null>(null);

  const fetchTopTracks = async () => {
    const data = await $fetch<MusicData>('/api/spotify/users_tracks?limit=10');
    musicData.value = {
      top_tracks: data.top_tracks,
      tracks: musicData.value?.tracks || [],
    };
  };

  const fetchTracks = async (page: number, itemsPerPage: number) => {
    const offset = (page - 1) * itemsPerPage;
    const data = await $fetch<MusicData>(`/api/spotify/users_tracks?offset=${offset}&limit=${itemsPerPage}`);
    return data.tracks;
  };

  return {
    musicData,
    fetchTopTracks,
    fetchTracks,
  };
}
