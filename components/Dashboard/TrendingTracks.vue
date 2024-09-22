<script setup lang="ts">
  import { useTrendingTracks } from '@/composables/useTrendingTracks';
  import { useTrendingData } from '@/composables/useTrendingData';
  import type { TrendingData } from '@/types/trending';
  import { PlayCircle } from 'lucide-vue-next';

  const { trendingData, fetchTrendingData } = useTrendingData();
  const { selectedTracks, getArtistNames } = useTrendingTracks(trendingData as Ref<TrendingData | null>);

  onMounted(async () => {
  await fetchTrendingData();
});
</script>

<template>
  <div v-if="selectedTracks.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    <div v-for="track in selectedTracks" :key="track.id" class="flex items-center bg-zinc-900 p-4 hover:bg-zinc-950 cursor-pointer">
      <div class="flex-grow min-w-0 flex items-center space-x-4">
        <img :src="track.album.images[2].url" :alt="track.name" class="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
        <div class="min-w-0 flex-grow">
          <h3 class="text-white font-semibold truncate">{{ track.name }}</h3>
          <p class="text-gray-400 text-sm truncate">{{ getArtistNames(track.artists) }}</p>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <component :is="PlayCircle" class="w-8 h-8 text-white" />
      </div>
    </div>
  </div>
</template>
