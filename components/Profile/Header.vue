<script setup lang="ts">
  interface SpotifyImage {
    url: string;
    height: number;
    width: number;
  }

  interface SpotifyFollowers {
    href: string;
    total: number;
  }

  interface SpotifyProfile {
    display_name: string;
    images: SpotifyImage[];
    id: string;
    followers: SpotifyFollowers;
  }

  const { data: profile } = await useFetch<SpotifyProfile>('/api/spotify/profile');

  const getInitial = (name: string) => name.charAt(0).toUpperCase();
</script>

<template>
  <div v-if="profile" class="flex items-center space-x-2">
    <div v-if="profile.images && profile.images[0]?.url" class="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
      <img :src="profile.images[0].url" :alt="profile.display_name" class="w-full h-full object-cover" />
    </div>
    <div v-else class="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-extrabold flex-shrink-0">
      {{ getInitial(profile.display_name) }}
    </div>
    <p class="hidden sm:block font-poppins font-semibold truncate">{{ profile.display_name }}</p>
  </div>

  <div v-else class="w-12 h-12 sm:w-15 sm:h-15 text-center bg-black rounded-full shadow-md p-4 sm:p-6">
    <p class="text-lg sm:text-xl">...</p>
  </div>
</template>
