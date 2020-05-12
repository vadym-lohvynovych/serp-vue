<template>
  <ErrorBoundary :error="error">
    <div class="item-box w-full flex flex-wrap">
      <div class="item-image-box w-full md:w-1/4 px-2 md:px-0">
        <img class="img w-full mx-auto cursor-pointer" :src="img" alt="image" />
        <p
          v-if="currentItem && currentItem.description"
          class="p-2 font-hairline"
        >{{ currentItem.description }}</p>
      </div>
      <div class="w-full md:w-3/4 px-3 md:pl-8 md:pr-0">
        <div v-if="isLoading">
          <div class="loader head-loader w-1/3 rounded bg-infinite-300 mt-5 md:mt-0"></div>
          <div class="loader"></div>
          <div class="loader"></div>
          <div class="loader"></div>
        </div>

        <div v-else-if="currentItem" class="text-center md:text-left py-5 md:py-0">
          <h1 class="text-2xl">{{ currentItem.title }}</h1>
          <div class="my-4">
            <a
              v-if="detailsLink"
              :href="detailsLink"
              target="_blank"
              class="bg-indigo-600 px-5 py-1 hover:bg-indigo-700 rounded"
            >More Details</a>
          </div>

          <AdditionalItems
            v-for="(itemName, index) in existingAdditionalItems"
            :key="index"
            :items="currentItem[itemName].items"
            :header="itemName"
          />
        </div>
      </div>
    </div>
  </ErrorBoundary>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AdditionalItems from '../components/AdditionalItems.vue';
import ErrorBoundary from '../components/ErrorBoundary.vue';
import getPathFromThumbnail from '../helpers/getPathFromThumbnail';
import placeholder from '../images/placeholder.png';
import { searchTypes } from '../../utils/searchTypes';

export default {
  data() {
    return {
      img: placeholder,
      searchTypes
    };
  },

  methods: {
    ...mapActions('search', ['getItem']),

    fetchItem() {
      const { id, type: itemType } = this.routeInfo;
      this.getItem({ id, itemType });
    }
  },

  computed: {
    ...mapState('search', ['currentItem', 'isLoading', 'error']),

    detailsLink() {
      const detail = this.currentItem?.urls?.find(url => url.type === 'detail');
      return detail?.url;
    },

    routeInfo() {
      return this.$route.params;
    },

    existingAdditionalItems() {
      let existingAdditionalItems = [];

      this.currentItem &&
        Object.keys(this.currentItem).forEach(key => {
          if (
            this.searchTypes.includes(key) &&
            this.currentItem[key]?.items?.length
          ) {
            existingAdditionalItems.push(key);
          }
        });

      return existingAdditionalItems;
    }
  },

  watch: {
    currentItem(value) {
      if (value) {
        this.img = this.currentItem.thumbnail
          ? getPathFromThumbnail(this.currentItem.thumbnail)
          : this.img;
      }
    },

    routeInfo(value) {
      this.img = placeholder;
      this.fetchItem();
    }
  },

  mounted() {
    this.fetchItem();
  },

  updated() {
    document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
  },

  components: {
    AdditionalItems,
    ErrorBoundary
  }
};
</script>


<style lang="scss" scoped>
.loader {
  position: relative;
  overflow: hidden;
  height: 100px;
  margin-bottom: 20px;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(135deg, #152840, #673030);
    animation: bgMove 3s ease-in-out infinite;
  }
}
@keyframes bgMove {
  from {
    left: -100%;
  }
  50% {
    left: 0;
  }
  to {
    left: -100%;
  }
}
.head-loader {
  height: 30px;
}
</style>
