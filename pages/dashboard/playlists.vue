<script setup lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

  interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
  }

  interface MusicData {
    top_tracks: Track[];
    tracks: Track[];
  }

  const musicData = ref<MusicData | null>(null);
  const currentPage = ref(1);
  const itemsPerPage = 18;

  const fetchMusicData = async (page = 1) => {
    const offset = (page - 1) * itemsPerPage;
    const data = await $fetch<MusicData>(`/api/spotify/users_tracks?offset=${offset}&limit=${itemsPerPage}`);
    if (page === 1) {
      musicData.value = data;
      console.log(musicData.value);
    } else {
      musicData.value = {
        top_tracks: musicData.value?.top_tracks || [],
        tracks: data.tracks,
      };
    }
  };

  const nextPage = async () => {
    currentPage.value++;
    await fetchMusicData(currentPage.value);
  };

  const previousPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      await fetchMusicData(currentPage.value);
    }
  };

  const displayedTracks = computed(() => musicData.value?.tracks || []);

  fetchMusicData();
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-zinc-950">
    <NavigationBarSide class="hidden md:block" />
    <main class="flex-grow py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-10 md:ml-64">
      <div class="flex flex-row items-center gap-4 sm:gap-8 sm:justify-between mb-6 space-y-0">
        <NavigationBarSide class="md:hidden" />
        <SearchBar class="w-full sm:w-2/3 md:w-1/2" />
        <ProfileHeader class="w-auto" />
      </div>
      <div class="my-20">
        <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">My Playlist</h2>
      </div>
    </main>
  </div>
</template>
