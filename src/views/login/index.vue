<template>
  <div class="login-container">
    <!-- 顶部导航 -->
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <van-form class="app-login-form"
        ref="loginForm"
        :show-error="false"
        :show-error-message="false"
        validate-first
        @submit="onLogin"
        @failed="onFailed">
      <van-field
        v-model="user.mobile"
        type="tel"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        type="number"
        maxlength="6"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            second :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"/>
          <van-button
            v-else
            size="small"
            class="login-btn-code"
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13521866142',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入合法手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功')

        // 将token数据存储到 Vuex 容器
        this.$store.commit('setUser', data.data)

        // 跳转会原来页面 todo
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },

    onFailed (errorInfo) {
      this.$toast({
        message: errorInfo.errors[0].message,
        position: 'top'
      })
    },
    async onSendSms () {
      try {
        // 验证手机号
        await this.$refs.loginForm.validate('mobile')
        this.isSendSmsLoading = true
        // 验证通过 -> 请求发送验证码
        await sendSms(this.user.mobile)
        this.isSendSmsLoading = false
        // 显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        this.isSendSmsLoading = false
        // 验证失败
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }
    }
  }
}

</script>

<style scoped lang="less">
  .login-btn-wrap {
    margin: 30px;
  }
</style>
