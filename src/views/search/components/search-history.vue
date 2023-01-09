<template>
  <div class="search-history">
    <van-cell>
      <div slot="title">搜索历史</div>
      <div v-if="isDeleteShow">
        <span
          @click="$emit('update-histories', [])"
        >全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
       <van-icon
          v-else
          name="delete"
          @click="isDeleteShow = true"
        />
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onClickItem(history, index)"
    >
      <van-icon
        name="close"
        v-if="isDeleteShow"
      />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false,
      localSearchHistories: this.searchHistories
    }
  },
  computed: {},
  watch: {
    searchHistories () {
      setItem('userSearchHistories', this.searchHistories)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onClickItem (history, index) {
      // 删除状态
      if (this.isDeleteShow) {
        this.localSearchHistories.splice(index, 1)
        this.$emit('update-histories', this.localSearchHistories)

        // 持久化本地数据
        // setItem('userSearchHistories', this.searchHistories)
        return
      }

      // 非删除状态
      this.$emit('search', history)
    }
  },
  deleteAllSearchHistories () {
    // 持久化本地数据
    // setItem('userSearchHistories', this.searchHistories)
  }
}
</script>

<style lang="less" scoped>

</style>
