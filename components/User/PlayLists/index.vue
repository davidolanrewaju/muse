<script setup lang="ts">
  import { EllipsisVertical } from 'lucide-vue-next';
  import { ref } from 'vue';

  interface PlayList {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: { total: number };
    description: string;
    public: boolean;
    owner: { display_name: string; id: string };
  }

  defineProps<{
    playlists: PlayList[];
  }>();

  const showPlaylists = ref(true);
  const activeDropdown = ref<string | null>(null);

  const toggleDropdown = (playlistId: string) => {
    activeDropdown.value = activeDropdown.value === playlistId ? null : playlistId;
  };

  const togglePlaylistVisibility = () => {
    showPlaylists.value = !showPlaylists.value;
  };
</script>

<template>
  <div>
    <button @click="togglePlaylistVisibility" class="mb-4 px-4 py-2 bg-zinc-700 text-white rounded">
      {{ showPlaylists ? 'Hide Playlists' : 'Show Playlists' }}
    </button>

    <div v-if="showPlaylists && playlists && playlists.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div v-for="playlist in playlists" :key="playlist.id" class="flex items-center bg-zinc-900 p-4 hover:bg-zinc-950 cursor-pointer relative">
        <div class="flex-grow min-w-0 flex items-center space-x-4">
          <img :src="playlist.images[0]?.url" :alt="playlist.name" class="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
          <div class="min-w-0 flex-grow">
            <h3 class="text-white font-semibold truncate">{{ playlist.name }}</h3>
          </div>
          <div class="ml-4 flex-shrink-0">
            <component :is="EllipsisVertical" @click.stop="toggleDropdown(playlist.id)" class="w-4 h-4 md:w-5 md:h-5 text-white cursor-pointer" />
          </div>
          <div v-if="activeDropdown === playlist.id" class="absolute z-20 top-14 right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-800 ring-1 ring-black ring-opacity-5">
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-zinc-700" role="menuitem">Add item</a>
              <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-zinc-700" role="menuitem">Edit playlist</a>
              <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-zinc-700" role="menuitem">Delete playlist</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
