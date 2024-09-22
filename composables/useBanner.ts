import { useRandomSelection } from '@/composables/useRandomSelection';
import type { TrendingData, Artist } from '@/types/trending';

export function useBanner(trendingData: Ref<TrendingData | null>) {
  const { selectedItems: selectedArtists } = useRandomSelection(async () => trendingData.value?.trending_artists || [], 4);

  const currentSlide = ref(0);
  const AUTO_SLIDE_INTERVAL = 5000;
  const autoSlideInterval = ref<number | null>(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.value = window.setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.value) {
      clearInterval(autoSlideInterval.value);
      autoSlideInterval.value = null;
    }
  };

  const handleUserInteraction = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % selectedArtists.value.length;
    handleUserInteraction();
  };

  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + selectedArtists.value.length) % selectedArtists.value.length;
    handleUserInteraction();
  };

  const goToSlide = (index: number) => {
    currentSlide.value = index;
    handleUserInteraction();
  };

  return {
    selectedArtists,
    currentSlide,
    startAutoSlide,
    stopAutoSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  };
}
