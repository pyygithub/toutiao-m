<template>
  <div class="search-suggention">
    <van-cell
      v-for="(option, index) in searchOptions"
      :key="index"
      @click="$emit('search', option)"
    >
        <div slot="title" v-html="highlight(option)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchOptions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 函数防抖
      handler: debounce(async function () {
        const { data } = await getSearchSuggestion(this.searchText)
        this.searchOptions = data.data
      }, 200),
      // 侦听开始后立即被调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    highlight (option) {
      const highlightStr = `<span style="color: red">${this.searchText}</span>`
      return option.replace(new RegExp(this.searchText, 'gi'), highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
