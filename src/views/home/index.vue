<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        class="search-btn"
        icon="search"
        round
        to="/search"
      >搜索
      </van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs
      class="van-tabs-wrap"
      v-model="active"
      sticky
    >
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel" />
      </van-tab>
      <div class="van-tab-placeholder" slot="nav-right"></div>

      <div
        class="wap-nav-wrap"
        slot="nav-right"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <van-popup
      class="channel-edit-popup"
      v-model="isChannelEditShow"
      closeable
      position="top"
      get-container="body"
    >
      <channel-edit
        :tab-active="active"
        :user-channels="channels"
        @close-channel="isChannelEditShow = false"
        @update-tab-active = "active = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      if (this.user) {
        const { data } = await getUserChannels()
        this.channels = data.data
      } else {
        const localChannels = getItem('userChannels')
        if (localChannels) {
          this.channels = localChannels
        } else {
          // 获取用户推荐列表
          const { data } = await getUserChannels()
          this.channels = data.data
        }
      }
    },
    onUpdateTabActive (index) {
      console.log(index)
      this.active = index
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
    .wap-nav-wrap {
      position: fixed;
      right: 0;
      line-height: 44px;
      background-color: #fff;
      width: 33px;
    }
    .van-tab-placeholder {
      width: 30px;
      flex-shrink: 0;
    }
  }
  .channel-edit-popup {
    height: 100%;
  }
</style>>
