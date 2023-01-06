<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isSearchResultShow = false"
      />
    </form>

    <search-result v-if="isSearchResultShow" />

    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
    />

    <search-history  v-else/>

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'

export default {
  name: '',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isSearchResultShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      console.log('onSearch')
      this.isSearchResultShow = true
    },
    onCancel () {
      console.log('cancel')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
