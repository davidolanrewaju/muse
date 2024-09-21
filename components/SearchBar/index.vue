<script setup lang="ts">
  import { Search } from 'lucide-vue-next';
</script>

<template>
  <div class="flex items-center max-w-xl border sm:border-2 border-zinc-500 pl-3 sm:pl-5 rounded-full">
    <component :is="Search" class="w-4 h-4 mr-2" />
    <input type="text" class="text-sm sm:text-base w-full outline-none border-0 bg-transparent py-1 rounded-e-full" placeholder="Search..." />
  </div>
</template>
