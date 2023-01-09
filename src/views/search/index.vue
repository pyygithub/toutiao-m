<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch($event, searchText)"
        @cancel="$router.back()"
        @focus="isSearchResultShow = false"
      />
    </form>

    <search-result
      v-if="isSearchResultShow"
      :search-text="searchText"
    />

    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    />

    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
    />

  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { getUserSearchHistories } from '@/api/search'

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
      isSearchResultShow: false,
      searchHistories: getItem('userSearchHistories') || []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadUserSearchHistories()
  },
  mounted () {},
  methods: {
    onSearch (searchText) {
      // 将输入框的值设置为要搜索的文本
      this.searchText = searchText

      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项上传
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索历史记录放在数组顶部
      if (searchText.trim()) {
        this.searchHistories.unshift(searchText)
      }

      // 保存到本地
      setItem('userSearchHistories', this.searchHistories)

      // 展示搜索结果
      this.isSearchResultShow = true
    },
    onCancel () {
      console.log('cancel')
    },
    async loadUserSearchHistories () {
      let searchHistories = getItem('userSearchHistories') || []
      if (this.user) {
        const { data } = await getUserSearchHistories()
        searchHistories = [...new Set([...searchHistories, ...data.data])]
      }
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style lang="less" scoped>

</style>
