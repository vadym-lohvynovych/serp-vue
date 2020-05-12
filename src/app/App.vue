<template>
  <div class="mx-auto flex flex-wrap">
    <div
      class="sidebar-wrapper w-full lg:w-1/5 xl:w-1/6 absolute lg:relative shadow-xl bg-gray-900"
      :class="{active: isSidebarActive}"
    >
      <Sidebar @toggleSidebarView="toggleSidebarView" :isActive="isSidebarActive" />
    </div>
    <div class="content w-full lg:w-4/5 xl:w-5/6 p-5 xl:p-8">
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
  transition: 0.35s ease-out;
}
.sidebar-wrapper,
.content {
  height: 100vh;
}
.content {
  overflow-y: scroll;
}
@media screen and (max-width: 1023px) {
  .sidebar-wrapper {
    left: -320px;
    width: 320px;
    z-index: 1000;
    .search-type-item {
      margin-right: 60px;
    }
    &.active {
      left: 0;
      .search-type-item {
        margin-right: 0;
      }
    }
  }
}
</style>
