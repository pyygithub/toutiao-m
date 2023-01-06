<template>
  <div class="search-suggention">
    <van-cell v-for="(option, index) in searchOptions" :key="index">
      <div slot="title">{{option}}</div>
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
      handler: debounce(async function () {
        const { data } = await getSearchSuggestion(this.searchText)
        this.searchOptions = data.data
      }, 100),
      // 侦听开始后立即被调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
