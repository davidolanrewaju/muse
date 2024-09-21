<script setup lang="ts">
  import { Headphones, UserRoundPlus } from 'lucide-vue-next';
  interface Artist {
    id: string;
    name: string;
    followers: { href: string | null; total: number };
    images: { url: string }[];
  }

  interface TrendingData {
    trending_artists: Artist[];
  }

  const { data: trending } = useFetch<TrendingData>('/api/spotify/trending');
  const selectedArtists = ref<Artist[]>([]);
  let intervalId: number;

  const currentSlide = ref(0);
  const AUTO_SLIDE_INTERVAL = 5000;
  const autoSlideInterval = ref<number | null>(null);

  const pickRandomArtists = () => {
    if (trending.value?.trending_artists && trending.value.trending_artists.length >= 4) {
      const uniqueArtists = Array.from(new Set(trending.value.trending_artists.map((artist: Artist) => JSON.stringify(artist)))).map((artistString) => JSON.parse(artistString as string) as Artist);
      selectedArtists.value = uniqueArtists.sort(() => 0.5 - Math.random()).slice(0, 4);
    }
  };

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

  watch(
    () => trending.value,
    (newValue: TrendingData | null) => {
      if (newValue) {
        pickRandomArtists();
      }
    }
  );

  onMounted(() => {
    if (trending.value) {
      pickRandomArtists();
    }
    intervalId = window.setInterval(pickRandomArtists, 2 * 60 * 60 * 1000);
    startAutoSlide();
  });

  onUnmounted(() => {
    window.clearInterval(intervalId);
    stopAutoSlide();
  });
</script>

<template>
  <div class="banner">
    <h2 class="text-xl md:text-2xl font-bold mb-4">Trending Artists</h2>
    <div class="relative">
      <div class="overflow-hidden">
        <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="artist in selectedArtists" :key="artist.id" class="w-full flex-shrink-0">
            <div class="relative bg-black w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
              <div class="artist-card w-full h-full bg-no-repeat bg-cover bg-center" :style="{ backgroundImage: `url(${artist.images[0]?.url || ''})` }">
                <div class="absolute inset-0 bg-black bg-opacity-75"></div>
                <div class="absolute inset-0 flex items-center px-4 md:pl-12">
                  <div>
                    <div class="flex items-center gap-3">
                      <img class="w-4 md:w-6 h-4 md:h-6" src="@/assets/icons/verified.svg" alt="verified" />
                      <p class="text-sm md:text-base">Verified Artist</p>
                    </div>
                    <p class="pt-4 md:pt-6 text-white font-poppins font-semibold text-2xl sm:text-3xl md:text-5xl">
                      {{ artist.name }}
                    </p>
                    <div class="pb-6 md:pb-10">
                      <p class="text-xs sm:text-sm md:text-base">{{ artist.followers.total }} Monthly Listeners</p>
                    </div>
                    <div class="btns flex items-center gap-2 md:gap-4">
                      <a class="flex items-center justify-center gap-2 md:gap-3 border-2 border-green-600 hover:border-transparent hover:bg-green-900 px-4 md:px-10 py-2 rounded-full font-manrope font-semibold sm:font-bold text-xs sm:text-sm md:text-base" href="">
                        <component :is="Headphones" class="w-4 h-4 md:w-5 md:h-5" />
                        Listen
                      </a>
                      <a class="flex items-center justify-center gap-2 md:gap-3 bg-green-500 hover:bg-green-900 px-4 md:px-10 py-2 rounded-full font-manrope font-semibold sm:font-bold text-xs sm:text-sm md:text-base" href="">
                        <component :is="UserRoundPlus" class="w-4 h-4 md:w-5 md:h-5" />
                        Follow
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation dots -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button v-for="(_, index) in selectedArtists" :key="index" @click="goToSlide(index)" class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-200 ease-in-out" :class="currentSlide === index ? 'bg-white' : 'bg-gray-400'"></button>
      </div>
    </div>
  </div>
</template>
