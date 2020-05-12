<template>
  <div class="search-type font-hairline my-8">
    <h2 class="text-center my-5">What are you looking for?</h2>

    <div v-for="type in types" :key="type" class="text-right flex justify-start sm:justify-end">
      <p
        class="search-type-item with-transition relative text-right text-xl w-2/3 font-bold px-5 my-1 cursor-pointer"
        :class="{active: type === searchType}"
        @click="setSearchType(type)"
      >{{ type | capitalize }}</p>
      <br />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { searchTypes } from '../../utils/searchTypes';
import capitalize from '../helpers/capitalize';

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
    ...mapActions('search', ['setSearchType'])
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
</style>
