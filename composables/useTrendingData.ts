import { ref } from 'vue';
import type { TrendingData } from '@/composables/useTrendingTracks';

const trendingData: Ref<TrendingData | null> = ref(null);

export function useTrendingData() {
  const fetchTrendingData = async (): Promise<TrendingData | null> => {
    if (!trendingData.value) {
      const { data } = await useFetch<TrendingData>('/api/spotify/trending');
      trendingData.value = data.value;
    }
    return trendingData.value;
  };

  return {
    trendingData,
    fetchTrendingData,
  };
}
