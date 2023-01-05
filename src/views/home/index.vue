<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        round
      >搜索
      </van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"/>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'

export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
    .app-nav-bar {
      /deep/ .van-nav-bar__title {
        max-width: none;
      }
      .search-btn {
        background-color: #55a8ff;
        border: none;
        width: 277px;
        height: 32px;
        color: #fff;
      }
    }
  }
</style>>
