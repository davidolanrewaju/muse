<script setup lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

  defineProps<{
    currentPage: number;
    canGoPrevious: boolean;
    canGoNext: boolean;
  }>();

  defineEmits<{
    (e: 'previous'): void;
    (e: 'next'): void;
  }>();
</script>

<template>
  <div class="my-10 flex items-center justify-center space-x-4">
    <button @click="$emit('previous')" :disabled="!canGoPrevious" class="flex justify-center items-center text-white border border-white w-8 h-8 rounded-full disabled:opacity-50">
      <ChevronLeft class="w-6 h-6" />
    </button>
    <span class="text-white">Page {{ currentPage }}</span>
    <button @click="$emit('next')" :disabled="!canGoNext" class="flex justify-center items-center text-white border border-white w-8 h-8 rounded-full disabled:opacity-50">
      <ChevronRight class="w-6 h-6" />
    </button>
  </div>
</template>
