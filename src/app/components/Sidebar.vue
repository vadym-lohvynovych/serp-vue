<template>
  <div class="sidebar relative">
    <div
      class="toggle absolute visible lg:hidden p-3 rounded bg-black"
      :class="{active: isActive}"
      @click="$emit('toggleSidebarView')"
    >|||</div>
    <router-link
      to="/"
      class="block text-center hover:text-indigo-500 text-2xl md:text-4-xl py-6 px-3 text-left"
    >
      <span class="block">Serp</span>
      <span class="block">App.</span>
    </router-link>

    <SearchTypesButtons />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SearchTypesButtons from './SearchTypesButtons.vue';
import { searchTypes } from '../../utils/searchTypes';

export default {
  props: {
    isActive: Boolean
  },

  components: {
    SearchTypesButtons
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  right: -50px;
  top: 20px;
  transition: 0.35s ease-out;
  &.active {
    right: 20px;
  }
}
</style>
