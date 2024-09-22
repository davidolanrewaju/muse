<script setup lang="ts">
  import { Plus } from 'lucide-vue-next';

  interface PlayList {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: { total: number };
    description: string;
    public: boolean;
    owner: { display_name: string; id: string };
  }
  interface PlayListData {
    playlists: PlayList[];
    featured_playlists: PlayList[];
  }

  const playListData = ref<PlayListData | null>(null);

  const { data } = useFetch<PlayListData>('/api/spotify/users_playlists');
  playListData.value = data.value;

  const showCreatePlaylistPopup = ref(false);

  const openCreatePlaylistPopup = () => {
    showCreatePlaylistPopup.value = true;
  };

  const closeCreatePlaylistPopup = () => {
    showCreatePlaylistPopup.value = false;
  };

  const handleCreatePlaylist = async (playlistData: object) => {
    try {
      const response = await fetch('/api/spotify/create_playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistData),
      });
      const newPlaylist = await response.json();


      if (playListData.value) {
        playListData.value.playlists.unshift(newPlaylist);
      }

      closeCreatePlaylistPopup();
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }

  };
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
        <div class="pb-4 mb-4 flex items-center justify-between">
          <h2 class="text-xl sm:text-2xl font-semibold text-white">My Playlists</h2>
          <button @click="openCreatePlaylistPopup" class="flex items-center gap-2 py-3 px-6 border sm:border-2 rounded-full font-black font-manrope hover:bg-green-700 hover:border-transparent">
            <component :is="Plus" class="w-4 h-4 md:w-5 md:h-5 text-white" />
            <p>Create PlayList</p>
          </button>
        </div>
        <UserPlayLists :playlists="playListData?.playlists ?? []" />
      </div>

      <div>
        <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4 mt-8">Featured Playlists</h2>
        <UserPlayLists :playlists="playListData?.featured_playlists ?? []" />
      </div>
    </main>

    <UserPlayListsCreatePopUp v-if="showCreatePlaylistPopup" @close="closeCreatePlaylistPopup" @create="handleCreatePlaylist" />
  </div>
</template>
