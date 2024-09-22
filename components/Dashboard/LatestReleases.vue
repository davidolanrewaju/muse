<script setup lang="ts">
  import { useLatestReleases } from '@/composables/useLatestReleases';
  import { useTrendingData } from '@/composables/useTrendingData';
  import { DotIcon } from 'lucide-vue-next';
  import type { TrendingData } from '@/types/trending';

  const { trendingData, fetchTrendingData } = useTrendingData();
  const { selectedAlbums, getArtistNames } = useLatestReleases(trendingData as Ref<TrendingData | null>);

  onMounted(async () => {
    await fetchTrendingData();
  });
</script>

<template>
  <div v-if="selectedAlbums.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    <div v-for="album in selectedAlbums" :key="album.id" class="flex items-center space-x-4 bg-zinc-900 p-4 hover:bg-zinc-950 cursor-pointer">
      <img :src="album.images[2].url" :alt="album.name" class="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
      <div class="flex-grow min-w-0">
        <h3 class="text-white font-semibold truncate">{{ album.name }}</h3>
        <p class="text-gray-400 text-sm truncate">{{ getArtistNames(album.artists) }}</p>
        <div class="flex items-center text-xs uppercase text-gray-500 mt-1">
          <p class="truncate">{{ album.release_date }}</p>
          <component :is="DotIcon" class="w-4 h-4 mx-1 flex-shrink-0" />
          <p class="truncate">{{ album.album_type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
