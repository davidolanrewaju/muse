import { useRandomSelection } from '@/composables/useRandomSelection';
import type { TrendingData, Album, Artist } from '@/types/trending';

export function useLatestReleases(trendingData: Ref<TrendingData | null>) {
  const { selectedItems: selectedAlbums } = useRandomSelection(async () => trendingData.value?.trending_albums || [], 9);

  const getArtistNames = (artists: Artist[]): string => artists.map((artist) => artist.name).join(', ');

  return {
    selectedAlbums,
    getArtistNames,
  };
}
