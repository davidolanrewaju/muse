<script setup lang="ts">
  import { CircleArrowLeftIcon, PlayCircle } from 'lucide-vue-next';
  import { usePlayList } from '@/composables/usePlayList';

  const route = useRoute();
  const playlistId = route.params.id as string;

  const { playlist, error, isLoading } = usePlayList(playlistId);
</script>

<template>
  <div class="max-w-full flex flex-col md:flex-row min-h-screen bg-zinc-950">
    <NavigationBarSide class="hidden md:block" />
    <main class="flex-grow py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-10 md:ml-64">
      <div class="flex flex-row items-center gap-4 sm:gap-8 sm:justify-between mb-6 space-y-0">
        <NavigationBarSide class="md:hidden" />
        <SearchBar class="w-full sm:w-2/3 md:w-1/2" />
        <ProfileHeader class="w-auto" />
      </div>

      <div class="my-10">
        <component :is="CircleArrowLeftIcon" class="w-10 h-10 text-white" />
      </div>

      <div v-if="isLoading">Loading playlist...</div>
      <div v-else-if="error">Error loading playlist: {{ error.message }}</div>
      <div v-else-if="playlist" class="text-white">
        <div class="flex items-center space-x-6 mb-6 bg-zinc-900 py-4 px-8 rounded-xl">
          <img v-if="playlist.images && playlist.images.length > 0" :src="playlist.images[0].url" :alt="playlist.name" class="w-28 h-28 object-cover rounded-lg shadow-lg" />
          <div>
            <h1 class="text-4xl font-bold mb-2">{{ playlist.name }}</h1>
            <p class="text-zinc-400 font-manrope">{{ playlist.description }}</p>
            <p class="mt-2">Owner: {{ playlist.owner.display_name }}</p>
            <p>Tracks: {{ playlist.tracks.total }}</p>
          </div>
        </div>

        <h2 class="mt-14 font-manrope text-2xl font-black mb-4 uppercase border-b pb-2">Tracks</h2>
        <ul>
          <div v-for="(item, index) in playlist.tracks.items" :key="index" class="max-w-full mb-4 p-4 bg-zinc-800 flex items-center gap-20 md:justify-between">
            <div class="flex-grow mr-4 min-w-0">
              <p class="text-lg font-bold truncate">{{ item.track.name }}</p>
              <p class="w-86 truncate font-light">{{ item.track.artists.map((a) => a.name).join(', ') }}</p>
            </div>
            <component :is="PlayCircle" class="w-8 h-8 text-white flex-shrink-0" />
          </div>
        </ul>
      </div>
      <div v-else>No playlist data available</div>
    </main>
  </div>
</template>
