<template>
  <div class="sidebar relative">
    <div
      class="toggle absolute visible lg:hidden rounded bg-black rounded-full flex items-center justify-center"
      :class="{active: isActive}"
      @click="$emit('toggleSidebarView')"
    >
      <span></span>
      <span class="my-1"></span>
      <span></span>
    </div>
    <router-link
      to="/"
      class="block text-center hover:text-indigo-500 text-2xl md:text-4-xl py-6 px-3 text-left"
    >
      <span class="block">Serp</span>
      <span class="block">App.</span>
    </router-link>

    <SearchBar />

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
.toggle {
  right: -60px;
  top: 20px;
  width: 40px;
  height: 40px;
  flex-direction: column;
  transition: 0.35s ease-out;
  &.active {
    right: 20px;
    transform: rotate(180deg);
    span:nth-child(2) {
      width: 5px;
    }
  }

  span {
    width: 16px;
    height: 2px;
    background: #fff;
  }
}
</style>
