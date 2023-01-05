<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in articles"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      preTimestamp: null,
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    async onLoad () {
      // 初始化加载数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.preTimestamp || Date.now(),
        with_top: 1
      })
      const { pre_timestamp, results } = data.data
      // 将数据放到 articles数组中
      this.articles.push(...results)

      // 设置本次加载状态结束，它才可以判断是否需要加载下一次
      this.loading = false

      // 如果还有数据，则获取下一页页码
      if (results.length) {
        this.preTimestamp = pre_timestamp
      } else {
        // 没有数据，把加载状态设置为结束，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 1.获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      // 2.把数据加载到列表中
      this.articles.unshift(...results)
      // 3.关闭刷新状态
      this.isRefreshLoading = false
      this.refreshSuccessText = '已更新至最新了'
    }
  }
}
</script>

<style>

</style>
