<template>
  <div class="w-1/2 sm:w-1/3 md:w-1/4 px-3 xl:px-8 mb-5">
    <div
      class="search-result-item with-transition relative rounded hover:text-pink-500"
      :class="{ 'opacity-0': item.visibility === 'hidden' }"
      @click="goToItemPage"
    >
      <div class="object-cover object-center">
        <div class="image-box with-transition">
          <img
            class="img with-transition mx-auto cursor-pointer w-full"
            data-lazy
            :src="placeholder"
            :data-src="path"
            alt="search-image"
          />
        </div>
        <h2
          class="title overflow-hidden rounded py-3 lg:py-5 px-1 font-bold text-sm md:text-md lg:text-xl text-center cursor-pointer w-full"
        >{{ item.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import placeholder from '../images/placeholder.png';
import { changeItemRoute, getPathFromThumbnail } from '../helpers';

export default {
  props: {
    item: Object
  },

  data() {
    return {
      placeholder
    };
  },

  computed: {
    path() {
      return getPathFromThumbnail(this.item.thumbnail);
    }
  },

  methods: {
    ...mapActions('search', ['makeItemVisible', 'setSearchType']),

    goToItemPage() {
      changeItemRoute(this.item.resourceURI, this.$route, this.$router);
    }
  },

  mounted() {
    this.makeItemVisible(this.item.index);
  }
};
</script>

<style lang="scss" scoped>
img {
  transition: transform 0.2s ease-in-out, filter 0.3s ease-in;
  &[data-lazy] {
    filter: blur(5px);
  }
}
.search-result-item {
  .image-box {
    overflow: hidden;
    box-shadow: 0 0 5px #000;
  }
  &:hover {
    .image-box {
      box-shadow: 0 0 15px #000;
    }
    img {
      transform: scale(1.04);
    }
  }
}
</style>
