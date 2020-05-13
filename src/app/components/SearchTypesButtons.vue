<template>
  <div class="search-type font-hairline mb-4 lg:mb-5">
    <h2 class="text-center my-2 lg:my-5">Categories</h2>

    <div class="flex items-center justify-center lg:block">
      <div
        v-for="type in types"
        :key="type"
        class="text-center lg:text-right flex justify-center lg:justify-end"
      >
        <p
          class="search-type-item mx-1 lg:mx-0 with-transition relative text-right lg:text-xl lg:w-4/5 font-semibold lg:font-bold px-5 lg:my-1 cursor-pointer"
          :class="{active: type === searchType}"
          @click="changeType(type)"
        >{{ type | capitalize }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { searchTypes } from '../../utils/searchTypes';
import { capitalize } from '../helpers';

export default {
  data() {
    const hiddenTypes = ['creators', 'stories'];
    return {
      types: searchTypes.filter(type => !hiddenTypes.includes(type))
    };
  },

  computed: {
    ...mapState('search', ['searchType'])
  },

  methods: {
    ...mapActions('search', ['setSearchType', 'fetchItems']),

    changeType(type) {
      const { searchQuery } = this.$route.query;
      this.setSearchType(type);
      if (searchQuery) {
        this.$router.push({ query: { searchType: type, searchQuery } });
        this.fetchItems({ searchQuery });
      }
    }
  },

  filters: {
    capitalize(val) {
      return capitalize(val);
    }
  }
};
</script>

<style lang="scss" scoped>
$teal: #07bfd2;
$pink: rgb(219, 157, 214);
.search-type-item {
  background: $teal;
  color: #000;
  transition: 0.2s;
  margin-right: -20px;
  &:after {
    position: absolute;
    content: '';
    display: block;
    height: 100px;
    right: -25px;
    top: 0;
    width: 20px;
    height: 20px;
    border: 15px solid transparent;
    border-left: 10px solid $teal;
    transition: 0.2s;
  }
  &:hover,
  &.active {
    background: $pink;
    &::after {
      border-left: 10px solid $pink;
    }
  }
}

@media screen and (max-width: 1023px) {
  .search-type-item {
    margin-right: 0px;
  }
  .search-type-item:after {
    display: none;
  }
}
</style>
