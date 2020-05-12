<template>
  <div class="mx-auto flex flex-wrap">
    <div
      class="sidebar-wrapper sticky top-0 w-full lg:w-3/12 xl:w-1/5 relative shadow-xl bg-gray-900 lg:px-5"
      :class="{active: isSidebarActive}"
    >
      <Sidebar @toggleSidebarView="toggleSidebarView" :isActive="isSidebarActive" />
    </div>
    <div class="content w-full lg:w-9/12 xl:w-4/5 p-4 xl:p-8">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
export default {
  components: {
    Sidebar
  },

  data() {
    return {
      isSidebarActive: false
    };
  },

  methods: {
    toggleSidebarView() {
      this.isSidebarActive = !this.isSidebarActive;
    }
  }
};
</script>

<style lang="scss">
a,
.with-transition {
  transition: 0.2s;
}

.sidebar-wrapper {
  height: 100vh;
}

@media screen and (max-width: 1023px) {
  .sidebar-wrapper,
  .content {
    height: auto;
    overflow: auto;
  }
}
</style>
