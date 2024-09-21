<script setup lang="ts">
  import { DotIcon } from 'lucide-vue-next';

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

  interface TrendingData {
    trending_albums?: Album[];
  }

  const { data: trending } = useFetch<TrendingData>('/api/spotify/trending');

  const selectedAlbums = ref<Album[]>([]);
  let intervalId: number;

  const pickRandomAlbums = () => {
    if (trending.value?.trending_albums && trending.value.trending_albums.length >= 8) {
      const uniqueAlbums = Array.from(new Set(trending.value.trending_albums.map((album: Album) => JSON.stringify(album)))).map((albumString) => JSON.parse(albumString as string) as Album);
      selectedAlbums.value = uniqueAlbums.sort(() => 0.5 - Math.random()).slice(0, 9);
    }
  };

  watch(
    () => trending.value,
    (newValue: TrendingData | null) => {
      if (newValue) {
        pickRandomAlbums();
      }
    }
  );

  onMounted(() => {
    if (trending.value) {
      pickRandomAlbums();
    }
    intervalId = window.setInterval(pickRandomAlbums, 2 * 60 * 60 * 1000);
  });

  onUnmounted(() => {
    window.clearInterval(intervalId);
  });

  const getArtistNames = (artists: Artist[]): string => artists.map((artist) => artist.name).join(', ');
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
