<script setup>
  import { ref } from 'vue';
  import { Menu, X } from 'lucide-vue-next';

  const isMenuOpen = ref(false);

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
</script>

<template>
  <header class="px-4 sm:px-6 md:px-10 py-4 sm:py-6 bg-zinc-800 shadow-2xl">
    <nav class="flex justify-between items-center">
      <IconsLogo />

      <!-- Mobile menu button -->
      <button class="md:hidden text-white" @click="toggleMenu">
        <Menu v-if="!isMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>

      <!-- Desktop menu -->
      <div class="hidden md:flex items-center space-x-4 lg:space-x-8 font-ibmPlex font-light uppercase">
        <a href="#features" class="hover:text-green-500 hover:border-b hover:pb-1 hover:border-green-500 transition">Features</a>
        <a href="#testimonials" class="hover:text-green-500 hover:border-b hover:pb-1 hover:border-green-500 transition">Testimonials</a>
        <a href="/api/auth" class="border-2 text-green-500 border-green-500 hover:border-transparent hover:text-white hover:bg-green-800 px-4 lg:px-6 py-2 font-bold rounded-full transition text-sm lg:text-base">Sign In</a>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden mt-4 font-ibmPlex font-light uppercase">
      <a href="#features" class="text-sm sm:text-base block py-2 hover:text-green-500">Features</a>
      <a href="#testimonials" class="text-sm sm:text-base block py-2 hover:text-green-500">Testimonials</a>
      <a href="/api/auth" class="text-sm sm:text-base inline-block mt-2 border sm:border-2 text-green-500 border-green-500 hover:border-transparent hover:text-white hover:bg-green-800 px-4 py-2 font-semibold sm:font-bold rounded-full transition">Sign In</a>
    </div>
  </header>
</template>
