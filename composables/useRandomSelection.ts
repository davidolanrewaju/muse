import { ref, watch, onMounted, onUnmounted } from 'vue';

export function useRandomSelection<T>(fetchData: () => Promise<T[]>, count: number) {
  const selectedItems = ref<T[]>([]);
  let intervalId: number;

  const pickRandomItems = async () => {
    if (fetchData && (await fetchData()).length >= count) {
      const uniqueItems = Array.from(new Set((await fetchData()).map((item: T) => JSON.stringify(item)))).map((itemString) => JSON.parse(itemString as string) as T);
      selectedItems.value = uniqueItems.sort(() => 0.5 - Math.random()).slice(0, count);
    }
  };

  watch(
    () => fetchData(),
    (newValue: Promise<T[]>) => {
      newValue.then((data) => {
        if (data && data.length >= count) {
          pickRandomItems();
        }
      });
    }
  );

  onMounted(async () => {
    if (await fetchData()) {
      pickRandomItems();
    }
    intervalId = window.setInterval(pickRandomItems, 2 * 60 * 60 * 1000);
  });

  onUnmounted(() => {
    window.clearInterval(intervalId);
  });

  return { selectedItems };
}
