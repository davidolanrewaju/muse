import { useRandomSelection } from './useRandomSelection';

interface Artist {
  name: string;
}

interface Image {
  url: string;
}

interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  album_type: string;
  release_date: string;
}

export interface TrendingData {
  trending_albums?: Album[];
}

export function useLatestReleases(trendingData: Ref<TrendingData | null>) {
  const { selectedItems: selectedAlbums } = useRandomSelection(async () => trendingData.value?.trending_albums || [], 9);

  const getArtistNames = (artists: Artist[]): string => artists.map((artist) => artist.name).join(', ');

  return {
    selectedAlbums,
    getArtistNames,
  };
}
