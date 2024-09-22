<script setup lang="ts">
import { X } from 'lucide-vue-next';

const emit = defineEmits(['close', 'create']);

const playlistName = ref('');
const playlistDescription = ref('');
const isPublic = ref(true);

const createPlaylist = () => {
  emit('create', {
    name: playlistName.value,
    description: playlistDescription.value,
    public: isPublic.value,
  });
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-zinc-900 p-6 rounded-lg w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-white">Create New Playlist</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white">
          <X class="w-6 h-6" />
        </button>
      </div>
      <form @submit.prevent="createPlaylist" class="space-y-4">
        <div>
          <label for="playlist-name" class="block text-sm font-medium text-gray-300 mb-1">Playlist Name</label>
          <input
            id="playlist-name"
            v-model="playlistName"
            type="text"
            required
            class="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>
        <div>
          <label for="playlist-description" class="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            id="playlist-description"
            v-model="playlistDescription"
            rows="3"
            class="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <div class="flex items-center">
          <input
            id="is-public"
            v-model="isPublic"
            type="checkbox"
            class="w-4 h-4 text-green-600 bg-zinc-800 border-gray-300 rounded focus:ring-green-500"
          >
          <label for="is-public" class="ml-2 text-sm font-medium text-gray-300">Make playlist public</label>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Create Playlist
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
