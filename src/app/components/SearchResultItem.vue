<template>
  <div class="w-1/2 sm:w-1/3 md:w-1/4 px-4 py-5">
    <div
      class="search-result-item relative rounded"
      :class="{ 'opacity-0': item.visibility === 'hidden' }"
    >
      <div class="object-cover object-center">
        <img
          class="img mx-auto cursor-pointer w-full lazy"
          :src="placeholder"
          :data-src="path"
          alt="search-image"
        />
      </div>
      <h2
        class="title overflow-hidden rounded py-3 lg:py-5 px-1 font-bold text-sm lg:text-md text-center cursor-pointer absolute w-full left-0 bottom-0 bg-gray-600"
      >
        <span class="hover-bg absolute"></span>
        <span class="relative">{{ item.title }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import placeholder from '../images/placeholder.png';

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
      return `${this.item.thumbnail.path}/portrait_uncanny.${this.item.thumbnail.extension}`;
    }
  },

  methods: mapActions('search', ['makeItemVisible']),

  mounted() {
    this.makeItemVisible(this.item.index);
  }
};
</script>

<style lang="scss" scoped>
.title {
  background: linear-gradient(to right bottom, #85c4e3 0%, #9792e4 100%);
  color: #fff;
  .hover-bg {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right bottom, #ffd1d1, #ff6f6f);
    top: 0;
    left: 0;
    opacity: 0;
  }
}
.title,
.hover-bg,
img {
  transition: transform 0.2s ease-in-out, filter 0.3s ease-in;
  &.lazy {
    filter: blur(5px);
  }
}
.search-result-item {
  overflow: hidden;
  transition: 0.5s;
  &:hover {
    .title {
      color: #012e94;
      .hover-bg {
        opacity: 0.8;
      }
    }
    img {
      transform: scale(1.1);
    }
  }
}
</style>
