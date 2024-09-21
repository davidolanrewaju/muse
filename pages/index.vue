<template>
  <div>
    <NavigationBar />
    <main>
      <section class="relative px-4 sm:px-8 md:px-16 lg:px-32 text-center flex flex-col justify-center items-center min-h-screen bg-[url('/images/hero-pattern.jpg')] bg-cover bg-center">
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        <div class="relative z-10">
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 text-white">Orchestrate Your Music Universe</h1>
          <p class="text-lg sm:text-xl md:text-2xl font-light mb-8 sm:mb-12 md:mb-20 text-white">
            Unleash the full potential of your music experience with Muse, the all-in-one app designed to take your listening journey to the next level. Whether you're crafting the perfect playlist, rediscovering forgotten gems, or diving into the latest hits, Muse gives you the power to manage your
            music effortlessly.
          </p>
          <div class="mx-auto w-full sm:w-8/12 md:w-6/12 lg:w-4/12 flex items-center justify-center gap-4 border-2 border-green-500 hover:border-transparent hover:bg-green-800 text-white px-4 sm:px-8 py-3 sm:py-5 rounded-full text-sm sm:text-xl font-bold transition">
            <a href="/api/auth" class="uppercase"> Let the Journey Begin! </a>
            <IconsHeadphoneWithMusic class="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
      </section>

      <section id="features" class="bg-zinc-950 p-6 sm:p-10 md:p-20 flex flex-col items-center justify-center min-h-screen">
        <h2 class="text-3xl sm:text-4xl font-bold my-6 sm:my-10">Our Features</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16">
          <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">🎧 Playlist Mastery</h3>
            <p class="text-sm sm:text-base">
              With Muse, you're not just listening—you're curating! Build playlists that fit every mood, moment, and memory. Add or remove tracks with a tap, and organize your playlists exactly how you like. Whether it's for a solo jam session or your next house party, Muse makes playlist management
              seamless and fun!
            </p>
          </div>
          <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">❤️ Your Personal DJ</h3>
            <p class="text-sm sm:text-base">
              Muse integrates with Spotify to ensure your favorite tunes are just a tap away. Easily add songs to your liked tracks, revisit them when you're in the zone, and remove those that no longer resonate with you. Your musical taste is ever-evolving, and Muse evolves with you.
            </p>
          </div>
          <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">🤝 Harmonize Socially</h3>
            <p class="text-sm sm:text-base">
              Music is better with friends! Muse allows you to share your favorite playlists and tracks with your network. Post your latest discoveries, collaborate on playlists, and show the world what you're vibing to. Connect, share, and explore the vast world of music together.
            </p>
          </div>
          <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">👤 Personalized Dashboard</h3>
            <p class="text-sm sm:text-base">
              Your music, your way. Muse's personalized dashboard keeps everything you love about music in one place. From trending tracks to suggested playlists based on your listening habits, and stats on your most-played artists—everything is tailored just for you.
            </p>
          </div>
          <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">🔍 Find the Music You Crave</h3>
            <p class="text-sm sm:text-base">Got a song stuck in your head? Use Muse's smart search to find it in seconds. Search by artist, track, or album and explore the vast world of music. Dive deep into your favorite genres or discover something new—it's all at your fingertips.</p>
          </div>
          <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
            <h3 class="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">▶️ Listen Anytime, Anywhere</h3>
            <p class="text-sm sm:text-base">Control your music right within the app. Muse offers a seamless Spotify playback experience, letting you manage your music without switching between apps. Skip, pause, or repeat your favorite songs with ease, wherever you are.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" class="relative px-4 sm:px-8 md:px-16 lg:px-32 text-center flex flex-col justify-center items-center min-h-screen bg-[url('/images/pattern.jpg')] bg-cover bg-center">
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/80"></div>
        <div class="relative z-10 w-full">
          <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-16">What Our Users Are Saying</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 text-center">
            <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
              <p class="mb-4 text-sm sm:text-base">"Muse has completely transformed how I experience music. It's like having a personal concert every day!"</p>
              <p class="font-semibold text-sm sm:text-base">- Alex, Music Enthusiast</p>
            </div>
            <div class="bg-white bg-opacity-10 p-4 sm:p-6 rounded-lg">
              <p class="mb-4 text-sm sm:text-base">"The playlist creation features are out of this world. I've never felt so in control of my music library."</p>
              <p class="font-semibold text-sm sm:text-base">- Sam, Playlist Curator</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="px-4 py-3 text-center text-sm sm:text-base">
      <p>&copy; 2024 Muse. All rights reserved. Your symphony awaits.</p>
    </footer>
  </div>
</template>
