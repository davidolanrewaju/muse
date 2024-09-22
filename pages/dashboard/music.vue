<script setup lang="ts">
  import { useMusicData } from '@/composables/useMusicLists';
  import { usePagination } from '@/composables/usePagination';

  const { musicData, fetchTopTracks, fetchTracks } = useMusicData();
  const { currentPage, items: displayedTracks, nextPage, previousPage, canGoNext, canGoPrevious } = usePagination(fetchTracks);

  fetchTopTracks();
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
        <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">Quick Picks</h2>
          <UserTrackLists :tracks="musicData?.top_tracks ?? []" />
      </div>

      <div class="mb-10">
        <div class="flex justify-between items-center mb-4">
          <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">Favourites</h2>
        </div>
        <UserTrackLists :tracks="displayedTracks" />
        <Pagination :current-page="currentPage" :can-go-previous="canGoPrevious" :can-go-next="canGoNext" @previous="previousPage" @next="nextPage" />
      </div>
    </main>
  </div>
</template>
