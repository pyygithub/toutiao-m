<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell class="van-multi-ellipsis--l2" v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      requried: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      pageSize: 20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1.加载数据
      const { data } = await getSearchResults({
        page: this.page,
        pageSize: this.pageSize,
        q: this.searchText
      })
      console.log(data)
      // 2.将数据存到列表中
      const { results } = data.data
      this.list.push(...results)

      // 3.关闭本次 loading
      this.loading = false

      // 4.判读是否还有数据
      if (results.length) {
        this.page++
      } else {
        // 没有数据则把 finished 设置为true
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
