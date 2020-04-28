<template>
  <div class="container mx-auto">
    <router-link
      to="/"
      class="inline-block hover:text-indigo-500 text-2xl py-6 text-left ml-3"
    >SerpApp.</router-link>
    <router-view />
  </div>
</template>

<style>
a {
  transition: 0.2s;
}
</style>
