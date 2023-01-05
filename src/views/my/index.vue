<template>
  <div class="my-container">
   <van-cell-group v-if="user" class="my-info">
      <!-- 用户基本信息 -->
      <van-cell class="base-info" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />

        <div
          class="name"
          slot="title"
        >{{currentUser.nick_name}}</div>

        <van-button
          class="update-btn"
          slot="right-icon"
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>

      <!-- 用户数据 -->
      <van-grid :border="false" class="data-info">
        <van-grid-item>
          <div slot="text" class="data-info-item">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="data-info-item">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="data-info-item">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text" class="data-info-item">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div v-else class="not-login" >
       <div class="mobile" @click="login">
        <i class="toutiao toutiao-shouji"/>
       </div>
       <div class="text">登录/注册</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <van-cell class="mb-4" title="消息通知" is-link to="" />
    <van-cell title="小七同学" is-link to="" />
    <van-cell
      v-if="user"
      class="logout mb-4"
      title="退出登录"
      @click="logout"
    />
  </div>
</template>

<script>
import { getCurrentUser } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    logout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
          // 清除登录状态
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    }
  }
}
</script>

<style scoped lang="less">
  .my-container {
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .mb-4 {
      margin-top: 4px;
    }
    .my-info {
      background:  linear-gradient(rgba(40,140,234,0.9), rgba(40,140,234, 0.9)), url('./banner.png') no-repeat ;
      background-size: cover;
      .base-info {
        background-color: unset;
        box-sizing: border-box;
        height: 115px;
        padding-top: 38px;
        padding-bottom: 11px;
        .avatar {
          height: 66px;
          width: 66px;
          border: 1px solid #fff;
          box-sizing: border-box;
          margin-right: 11px;
        }
        .name {
          color: #fff;
          font-size: 15px;
        }
        .update-btn {
          height: 20px;
          font-size: 10px;
        }
      }
    }

    .not-login {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 180px;
      width: 100%;
      background:  linear-gradient(rgba(40,140,234,0.9), rgba(40,140,234, 0.9)), url('./banner.png') no-repeat ;
      background-size: cover;
      .mobile {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        width: 60px;
        background-color: #fff;
        border-radius: 50%;
        .toutiao-shouji{
          color: #2185ff;
          font-weight: bold;
        }
      }
      .text {
        margin-top: 10px;
        color: #fff;
        font-size: 20px;
      }
    }

    .data-info {
      .data-info-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 65px;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 10px;
        }
      }
    }
    /deep/.nav-grid {
      background-color: #fff;
      .nav-grid-item {
        height: 70px;
        .toutiao {
          font-size: 22px;
        }
        .toutiao-shoucang {
          color: #eb5253;
        }
        .toutiao-lishi {
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .logout {
      text-align: center;
      color: #d86262;
    }
  }
</style>
