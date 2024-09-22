import type { TrendingData } from '@/types/trending';

const trendingData = ref<TrendingData | null>(null);

export function useTrendingData() {
  const fetchTrendingData = async (): Promise<TrendingData | null> => {
    if (!trendingData.value) {
      try {
        const data = await $fetch<TrendingData>('/api/spotify/trending');
        trendingData.value = data;
      } catch (error) {
        console.error('Error fetching trending data:', error);
        return null;
      }
    }
    return trendingData.value;
  };

  return {
    trendingData,
    fetchTrendingData,
  };
}
