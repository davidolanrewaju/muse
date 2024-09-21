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
        <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">Top Favourites</h2>
        <ClientOnly>
          <UserTrackLists :tracks="musicData?.top_tracks ?? []" />
        </ClientOnly>
      </div>

      <div class="mb-10">
        <div class="flex justify-between items-center mb-4">
          <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">Favourites</h2>
          <div class="flex items-center space-x-4">
            <button @click="previousPage" :disabled="currentPage === 1" class="flex justify-center items-center text-white border border-white w-8 h-8 rounded-full disabled:opacity-50">
              <ChevronLeft class="w-6 h-6" />
            </button>
            <span class="text-white">Page {{ currentPage }}</span>
            <button @click="nextPage" :disabled="displayedTracks.length < itemsPerPage" class="flex justify-center items-center text-white border border-white w-8 h-8 rounded-full disabled:opacity-50">
              <ChevronRight class="w-6 h-6" />
            </button>
          </div>
        </div>
        <ClientOnly>
          <UserTrackLists :tracks="displayedTracks" />
        </ClientOnly>
      </div>
    </main>
  </div>
</template>
