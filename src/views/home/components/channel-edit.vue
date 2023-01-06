<template>
  <div class="channel-edit-container">
    <van-cell center :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        @click="isChannelEdit = !isChannelEdit"
      >
        {{ !isChannelEdit ? '编辑' : '完成'}}
      </van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item user-channels"
        :class="{active : index === tabActive}"
        v-for="(channel, index) in userChannels"
        :icon="(isChannelEdit && index !== 0) ? 'clear' : ''"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>

     <van-cell center :border="false">
      <div class="title"  slot="title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item recommand-channels"
        v-for="(channel, index) in recommandChannels"
        :key="index"
        :text="channel.name"
        @click="onChannelAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, delUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    tabActive: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isChannelEdit: false
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  computed: {
    ...mapState(['user']),
    recommandChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => userChannel.id === channel.id)
      })
    }
  },
  mounted () {
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data
    },
    async onChannelAdd (channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.userChannels.push(channel)
      if (this.user) {
        // 存后端
        await addUserChannel(channel)
      } else {
        // 存本地
        setItem('userChannels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      // 编辑状态 删除频道
      if (this.isChannelEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态 跳转
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      if (index <= this.tabActive) {
        // 更新激活频道索引
        this.$emit('update-tab-active', this.tabActive - 1)
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.userChannels.splice(index, 1)

      if (this.user) {
        await delUserChannel(channel.id)
      } else {
        // 存本地
        setItem('userChannels', this.userChannels)
      }
    },
    switchChannel (index) {
      // 关闭探出蹭
      this.$emit('close-channel')
      // 切换频道
      this.$emit('update-tab-active', index)
    }
  }

}
</script>

<style lang="less" scoped>
  .channel-edit-container {
    padding-top: 54px;
    .title {
      color: #333;
      font-size: 16px;
    }
    .edit-btn {
      padding: 0 10px;
    }
    .grid-item {
      width: 80px;
      height: 35px;
      /deep/.van-grid-item__icon {
        position: absolute;
        right: -6px;
        top: -7px;
        font-size: 15px;
        color: #ccc;
        z-index: 100;
      }
      /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
      }
    }
    .active {
      /deep/.van-grid-item__content {
        .van-grid-item__text {
          color: red;
        }
      }
    }

  }
</style>
