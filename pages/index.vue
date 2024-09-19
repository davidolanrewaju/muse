<template>
  <div>
    <NavigationBar />
    <main>
      <section class="relative px-32 text-center flex flex-col justify-center items-center min-h-screen bg-[url('/images/hero-pattern.jpg')] bg-cover bg-center">
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        <div class="relative z-10">
          <h1 class="text-7xl font-bold mb-8 text-white">Orchestrate Your Music Universe</h1>
          <p class="text-2xl font-light mb-20 text-white">
            Unleash the full potential of your music experience with Muse, the all-in-one app designed to take your listening journey to the next level. Whether you're crafting the perfect playlist, rediscovering forgotten gems, or diving into the latest hits, Muse gives you the power to manage your
            music effortlessly.
          </p>
          <div class="mx-auto w-4/12 flex items-center justify-center gap-4 border-2 border-green-500 hover:border-transparent hover:bg-green-800 text-white px-8 py-5 rounded-full text-xl font-bold transition">
            <a href="#download" class="uppercase"> Let the Journey Begin! </a>
            <IconsHeadphoneWithMusic class="w-8 h-8" />
          </div>
        </div>
      </section>

      <section id="features" class="bg-zinc-950 p-20 flex flex-col items-center justify-center min-h-screen">
        <h2 class="text-4xl font-bold my-10">Our Features</h2>
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">🎧 Playlist Mastery</h3>
            <p>
              With Muse, you're not just listening—you're curating! Build playlists that fit every mood, moment, and memory. Add or remove tracks with a tap, and organize your playlists exactly how you like. Whether it's for a solo jam session or your next house party, Muse makes playlist management
              seamless and fun!
            </p>
          </div>
          <div class="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">❤️ Your Personal DJ</h3>
            <p>Muse integrates with Spotify to ensure your favorite tunes are just a tap away. Easily add songs to your liked tracks, revisit them when you're in the zone, and remove those that no longer resonate with you. Your musical taste is ever-evolving, and Muse evolves with you.</p>
          </div>
          <div class="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">🤝 Harmonize Socially</h3>
            <p>Music is better with friends! Muse allows you to share your favorite playlists and tracks with your network. Post your latest discoveries, collaborate on playlists, and show the world what you're vibing to. Connect, share, and explore the vast world of music together.</p>
          </div>
          <div class="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">👤 Personalized Dashboard</h3>
            <p>Your music, your way. Muse's personalized dashboard keeps everything you love about music in one place. From trending tracks to suggested playlists based on your listening habits, and stats on your most-played artists—everything is tailored just for you.</p>
          </div>
          <div class="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">🔍 Find the Music You Crave</h3>
            <p>Got a song stuck in your head? Use Muse's smart search to find it in seconds. Search by artist, track, or album and explore the vast world of music. Dive deep into your favorite genres or discover something new—it's all at your fingertips.</p>
          </div>
          <div class="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">▶️ Listen Anytime, Anywhere</h3>
            <p>Control your music right within the app. Muse offers a seamless Spotify playback experience, letting you manage your music without switching between apps. Skip, pause, or repeat your favorite songs with ease, wherever you are.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" class="relative px-32 text-center flex flex-col justify-center items-center min-h-screen bg-[url('/images/pattern.jpg')] bg-cover bg-center">
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 to-black/80"></div>
        <div class="relative z-10">
            <h2 class="text-4xl font-bold mb-16">What Our Users Are Saying</h2>
            <div class="grid md:grid-cols-2 gap-16 text-center">
              <div class="bg-white bg-opacity-10 p-6 rounded-lg">
                <p class="mb-4">"Muse has completely transformed how I experience music. It's like having a personal concert every day!"</p>
                <p class="font-semibold">- Alex, Music Enthusiast</p>
              </div>
              <div class="bg-white bg-opacity-10 p-6 rounded-lg">
                <p class="mb-4">"The playlist creation features are out of this world. I've never felt so in control of my music library."</p>
                <p class="font-semibold">- Sam, Playlist Curator</p>
              </div>
            </div>
        </div>
      </section>

      <!-- <section id="download" class="text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Compose Your Musical Journey?</h2>
        <p class="mb-8">Download Muse now and start your melodic adventure!</p>
        <div class="flex justify-center space-x-4">
          <a href="#" class="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition flex items-center">
            <img src="/api/placeholder/30/30" alt="App Store Icon" class="mr-2" />
            App Store
          </a>
          <a href="#" class="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition flex items-center">
            <img src="/api/placeholder/30/30" alt="Google Play Icon" class="mr-2" />
            Google Play
          </a>
        </div>
      </section> -->
    </main>

    <footer class="px-4 py-3 text-center">
      <p>&copy; 2024 Muse. All rights reserved. Your symphony awaits.</p>
    </footer>
  </div>
</template>
