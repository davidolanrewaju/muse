import { ref, computed } from 'vue';

export function usePagination<T>(fetchItems: (page: number, itemsPerPage: number) => Promise<T[]>, itemsPerPage: number = 18) {
  const currentPage = ref(1);
  const items = ref<T[]>([]);
  const isLoading = ref(false);

  const fetchPage = async (page: number) => {
    isLoading.value = true;
    items.value = await fetchItems(page, itemsPerPage);
    isLoading.value = false;
  };

  const nextPage = async () => {
    currentPage.value++;
    await fetchPage(currentPage.value);
  };

  const previousPage = async () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      await fetchPage(currentPage.value);
    }
  };

  const canGoNext = computed(() => items.value.length === itemsPerPage);
  const canGoPrevious = computed(() => currentPage.value > 1);

  fetchPage(currentPage.value);

  return {
    currentPage,
    items,
    isLoading,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
  };
}
