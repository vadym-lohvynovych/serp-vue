<template>
  <div>
    <h2 class="text-center text-xl my-5 font-hairline">Here you can find some comics!</h2>

    <SearchBar />

    <Loader v-if="isLoading" />

    <div
      v-else-if="searchResult && searchResult.length"
      class="search-result-items flex flex-wrap py-8"
    >
      <SearchResultItem v-for="searchItem in searchResult" :key="searchItem.id" :item="searchItem" />
    </div>

    <p v-else-if="searchResult" class="text-center font-hairline my-8">Cant find :(</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchBar from "../components/SearchBar.vue";
import Loader from "../components/Loader.vue";
import SearchResultItem from "../components/SearchResultItem.vue";

export default {
  computed: {
    ...mapGetters(["searchResult", "isLoading"]),
    title() {
      return this.$route.query.title;
    }
  },

  methods: {
    ...mapActions(["fetchComics", "fetchRandomCharacters"]),

    lazyLoad() {
      let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
      let active = false;
      if (active === false) {
        active = true;
        setTimeout(() => {
          lazyImages.forEach(function(lazyImage) {
            if (
              lazyImage.getBoundingClientRect().top <= window.innerHeight &&
              lazyImage.getBoundingClientRect().bottom >= 0 &&
              getComputedStyle(lazyImage).display !== "none"
            ) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");
              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                try {
                  window.removeEventListener("scroll", this.lazyLoad);
                } catch (e) {
                  console.log("lazy errors");
                }
              }
            }
          });
          active = false;
        }, 200);
      }
    }
  },

  watch: {
    searchResult(value) {
      if (value.length) {
        setTimeout(() => {
          this.lazyLoad();
        }, 0);
      }
    }
  },

  mounted() {
    if (this.title) {
      this.fetchComics(this.title);
    } else {
      this.fetchRandomCharacters();
    }

    this.lazyLoad();
    window.addEventListener("scroll", this.lazyLoad);
  },

  components: {
    SearchBar,
    Loader,
    SearchResultItem
  }
};
</script>


<style lang="scss">
body {
  min-height: 100vh;
  background: linear-gradient(to right bottom, #323d42 0%, #191e24 100%);
  color: #fff;
}
</style>
