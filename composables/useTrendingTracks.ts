import { useRandomSelection } from './useRandomSelection';

interface Artist {
  name: string;
}

interface Album {
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
}

export interface TrendingData {
  trending_tracks?: Track[];
}

export function useTrendingTracks(trendingData: Ref<TrendingData | null>) {
  const { selectedItems: selectedTracks } = useRandomSelection(async () => trendingData.value?.trending_tracks || [], 9);

  const getArtistNames = (artists: Artist[]): string => artists.map((artist) => artist.name).join(', ');

  return {
    selectedTracks,
    getArtistNames,
  };
}
