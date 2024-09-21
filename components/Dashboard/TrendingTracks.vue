<script setup lang="ts">
  import { PlayCircle } from 'lucide-vue-next';

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

  interface TrendingData {
    trending_tracks?: Track[];
  }

  const { data: trending } = useFetch<TrendingData>('/api/spotify/trending');

  const selectedTracks = ref<Track[]>([]);
  let intervalId: number;

  const pickRandomTracks = () => {
    if (trending.value?.trending_tracks && trending.value.trending_tracks.length >= 8) {
      const uniqueTracks = Array.from(new Set(trending.value.trending_tracks.map((track: Track) => JSON.stringify(track)))).map((trackString) => JSON.parse(trackString as string) as Track);
      selectedTracks.value = uniqueTracks.sort(() => 0.5 - Math.random()).slice(0, 9);
    }
  };

  watch(
    () => trending.value,
    (newValue: TrendingData | null) => {
      if (newValue) {
        pickRandomTracks();
      }
    }
  );

  onMounted(() => {
    if (trending.value) {
      pickRandomTracks();
    }
    intervalId = window.setInterval(pickRandomTracks, 2 * 60 * 60 * 1000);
  });

  onUnmounted(() => {
    window.clearInterval(intervalId);
  });

  const getArtistNames = (artists: Artist[]): string => artists.map((artist) => artist.name).join(', ');
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
