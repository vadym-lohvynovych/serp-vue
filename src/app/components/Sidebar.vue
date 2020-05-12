<template>
  <div class="sidebar relative">
    <router-link
      to="/"
      class="block text-center hover:text-indigo-500 text-md lg:text-2xl md:text-4-xl py-3 lg:py-5 px-3 text-left"
    >
      <span class="inline lg:block">Serp</span>
      <span class="inline lg:block">App.</span>
    </router-link>

    <SearchBar @callback="$emit('toggleSidebarView')" />

    <SearchTypesButtons />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SearchTypesButtons from './SearchTypesButtons.vue';
import SearchBar from './SearchBar.vue';
import { searchTypes } from '../../utils/searchTypes';

export default {
  props: {
    isActive: Boolean
  },

  components: {
    SearchTypesButtons,
    SearchBar
  }
};
</script>

<style lang="scss" scoped>
</style>
