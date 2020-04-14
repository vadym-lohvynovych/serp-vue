<template>
  <div class="container mx-auto">
    <router-link
      to="/"
      class="inline-block hover:text-indigo-500 text-md py-5 text-left ml-3"
    >SerpApp.</router-link>
    <router-view />
  </div>
</template>

<style scoped>
a {
  transition: 0.2s;
}
</style>
