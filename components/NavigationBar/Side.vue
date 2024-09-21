<script setup lang="ts">
  import { Home, List, UserRound, AudioLines, Menu, X } from 'lucide-vue-next';

  const menuItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'My Music', href: '/dashboard/music', icon: AudioLines },
    { name: 'Playlists', href: '/dashboard/playlists', icon: List },
    { name: 'Profile', href: '/dashboard/profile', icon: UserRound },
  ];

  const isMenuOpen = ref(false);

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
</script>

<template>
  <div>
    <!-- Mobile menu button -->
    <button @click="toggleMenu" class="md:hidden z-20 pt-2">
      <component :is="isMenuOpen ? X : Menu" class="w-6 h-6 text-white" />
    </button>

    <!-- Sidebar for desktop -->
    <aside class="bg-zinc-800 text-white w-64 min-h-screen p-4 fixed top-0 left-0 z-10 transform transition-transform duration-200 ease-in-out md:translate-x-0" :class="{ '-translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }">
      <div class="flex items-center justify-between py-5">
        <IconsLogo />
        <button @click="toggleMenu" class="md:hidden z-20">
          <component :is="isMenuOpen ? X : Menu" class="w-8 h-8 text-white" />
        </button>
      </div>
      <nav class="pt-5">
        <ul class="space-y-4">
          <li v-for="item in menuItems" :key="item.name">
            <NuxtLink :to="item.href" @click="isMenuOpen = false" class="text-md flex items-center gap-3 px-3 py-4 rounded hover:bg-green-700 transition-colors">
              <component :is="item.icon" />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div v-if="isMenuOpen" @click="isMenuOpen = false" class="inset-0 bg-black opacity-50 z-5 md:hidden"></div>
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    background-color: #15803d;
  }
</style>
