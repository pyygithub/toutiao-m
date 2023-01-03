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
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        type="number"
        maxlength="6"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button size="small" class="login-btn-code">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
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
      }
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const res = await login(this.user)
        console.log(res.data)
        Toast.success('登录成功')
      } catch (err) {
        Toast.fail('登录失败')
      }
    },

    onFailed (errorInfo) {
      Toast({
        message: errorInfo.errors[0].message,
        position: 'top'
      })
    }
  }
}

</script>

<style scoped lang="less">

</style>
