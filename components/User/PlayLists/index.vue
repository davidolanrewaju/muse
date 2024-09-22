<script setup lang="ts">
import { EllipsisVertical } from 'lucide-vue-next'
import { ref } from 'vue'
import type { Playlist } from '@/composables/usePlayLists';

defineProps<{
  playlists: Playlist[]
}>()

const activeDropdown = ref<string | null>(null)

const toggleDropdown = (playlistId: string) => {
  activeDropdown.value = activeDropdown.value === playlistId ? null : playlistId
}
</script>

<template>
  <div>
    <div v-if="playlists && playlists.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div v-for="playlist in playlists" :key="playlist.id" class="flex items-center bg-zinc-900 p-4 hover:bg-zinc-950 cursor-pointer relative">
        <div class="flex-grow min-w-0 flex items-center space-x-4">
          <img :src="playlist.images && playlist.images.length > 0 ? playlist.images[0].url : '/images/playlist_default.jpg'" :alt="playlist.name" class="w-16 h-16 object-cover rounded flex-shrink-0" loading="lazy" />
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-if="totalPages > 1" class="mt-4 flex justify-center items-center space-x-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-zinc-700 text-white rounded disabled:opacity-50">
        Previous
      </button>
      <span class="text-white">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-zinc-700 text-white rounded disabled:opacity-50">
        Next
      </button>
    </div> -->
  </div>
</template>
