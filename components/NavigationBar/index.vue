<template>
  <div>
    <header class="px-10 py-6 bg-zinc-800 shadow-2xl">
      <nav class="flex justify-between items-center">
        <a href="/" class="logo flex items-center gap-2">
            <IconsHeadphone class="w-8 h-8 text-green-500"/>
            <h1 class="text-3xl font-museoModerno font-bold text-green-500">muse.</h1>
        </a>
        <div class="space-x-8 font-ibmPlex font-light uppercase">
          <a href="#features" class="hover:text-green-500 hover:border-b hover:pb-1 hover:border-green-500 transition">Features</a>
          <a href="#testimonials" class="hover:text-green-500 hover:border-b hover:pb-1 hover:border-green-500 transition">Testimonials</a>
          <a href="/api/auth" class="border-2 text-green-500 border-green-500 hover:border-transparent hover:text-white hover:bg-green-800 px-6 py-2 font-bold rounded-full transition">Sign In</a>
        </div>
      </nav>
    </header>
  </div>
</template>
