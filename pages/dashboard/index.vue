<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-zinc-950">
    <NavigationBarSide class="hidden md:block"/>
    <main class="flex-grow py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-10 md:ml-64">
      <div class="flex flex-row items-center gap-4 sm:gap-8 sm:justify-between mb-6 space-y-0">
        <NavigationBarSide class="md:hidden"/>
        <SearchBar class="w-full sm:w-2/3 md:w-1/2" />
        <ProfileHeader class="w-auto" />
      </div>
      <DashboardBanner class="mt-10 sm:mt-12 md:mt-16 lg:mt-20" />
      <div class="my-10 sm:my-16 md:my-20">
        <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">Latest Releases</h2>
        <DashboardLatestReleases />
      </div>
      <div>
        <h2 class="pb-4 text-xl sm:text-2xl font-semibold text-white mb-4">Trending Tracks</h2>
        <DashboardTrendingTracks />
      </div>
    </main>
  </div>
</template>
