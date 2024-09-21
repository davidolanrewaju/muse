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

  defineProps<{
    tracks: Track[];
  }>();

  const getArtistNames = (artists: Artist[]): string => artists.map((artist) => artist.name).join(', ');
</script>

<template>
  <div v-if="tracks && tracks.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    <div v-for="track in tracks" :key="track.id" class="flex items-center bg-zinc-900 p-4 hover:bg-zinc-950 cursor-pointer">
      <div class="flex-grow min-w-0 flex items-center space-x-4">
        <img :src="track.album.images[2]?.url" :alt="track.name" class="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
        <div class="min-w-0 flex-grow">
          <h3 class="text-white font-semibold truncate">{{ track.name }}</h3>
          <p class="text-gray-400 text-sm truncate">{{ getArtistNames(track.artists) }}</p>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <PlayCircle class="w-8 h-8 text-white" />
      </div>
    </div>
  </div>
</template>
