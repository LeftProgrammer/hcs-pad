<template>
  <view class="login-page">
    <view class="login-main">
      <!-- <image class="login-logo" src="/static/logo2x2.png" alt=""></image> -->
      <view class="login-title">
        欢迎使用智慧展厅系统
      </view>
      <view class="login-form">
        <uv-form labelPosition="top" :model="form" :rules="rules" ref="form">
          <uv-form-item label="账号" prop="username" borderBottom :labelWidth="100">
            <uv-input v-model="form.username" clearable placeholder="输入用户名" border="none">
            </uv-input>
          </uv-form-item>
          <uv-form-item label="密码" prop="password" borderBottom :labelWidth="100">
            <uv-input v-model="form.password" clearable :password="showPassword" placeholder="请输入密码" border="none">
              <template v-slot:suffix>
                <uv-icon :name="showPassword ? 'eye-fill' : 'eye'" size="24" :class="[!showPassword ? 'uni-eye-active' : '']" @click="showPassword = !showPassword"></uv-icon>
              </template>
            </uv-input>
          </uv-form-item>
          <view class="login-remember-pwd">
            <checkbox-group @change="change">
                <checkbox value="isSave" :checked="isSavePsd" /><text>记住密码</text>
            </checkbox-group>
          </view>
        </uv-form>
      </view>
      <uv-button class="login-btn" type="primary" @click="handleLogin" text="登 录"></uv-button>
    </view>
    
    <!-- #ifdef APP-PLUS -->
    <view class="login-footer">
      <view class="version">
        当前版本：{{ nowVersion }}
      </view>
    </view>
    <!-- #endif -->
  </view>
</template>

<script>
import store from '@/store/index.js'

export default {
  data() {
    return {
      nowVersion: '',
      isSavePsd: false,
      form: {
        username: '',
        password: '',
      },
      showPassword: true,
      rules: {
        'username': [
              { type: 'string', required: true, message: '请输入用户名', trigger: ['blur', 'change']}
          ],
        'password': [
              { type: 'string', required: true, message: '密码由数字、字母和特殊符号组成，长度8-16位', trigger: ['blur', 'change']},
              // { min: 8, max: 16, message: '密码由数字、字母和特殊符号组成，长度8-16位', trigger: ['blur', 'change'] },
              // { pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,16}$/ , message: '密码由数字、字母和特殊符号组成，长度8-16位', trigger: ['blur', 'change']}
          ],
      },
    }
  },
  computed: {
    userStore() {
      return store.useUserStore() || {}
    }
  },
  onLoad() {
    console.error('login-onLoad===>')
    // #ifdef APP-PLUS
    this.checkIsSupportSoterAuthentication()
    // #endif

    if (this.userStore?.password) {
      this.isSavePsd = true
      this.form.username = this.userStore?.username
      this.form.password = this.userStore?.password
    } else {
      this.isSavePsd = false
      this.form.username = ''
      this.form.password = ''
    }
  },
  methods: {
    // 记住密码
    change(e) {
      this.isSavePsd = e.detail.value.length > 0
    },
    async handleLogin() {
      if (!this.form.username) {
        this.$toast('请输入用户名', { type: 'error' })
        return
      }
      if (!this.form.password) {
        await this.$toast('请输入用户名', { type: 'error' })
        return
      }
      // 加密测试
      // this.form.password = this.$rsaFunc.rsaEncode(this.form.password)
      // console.log('this.form.password====>', this.form.password)

      await this.userStore.login(this.form)

      if (this.isSavePsd) {
        this.userStore.setUserInfo(this.form)
      } else {
        this.userStore.setUserInfo({username: '', password: ''})
      }
      const redirect = this.$Route.query.redirect
      if (redirect) {
        this.$Router.replaceAll(JSON.parse(redirect))
      }
      else {
        this.$Router.replaceAll('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  padding: 35.45rpx 20rpx;
  font-size: 12rpx;
  font-family: HarmonyOS Sans SC;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #0C0C0C;

  .login-main {
    .login-logo {
      width: 27.25rpx;
      height: 27.25rpx;
    }

    .login-title {
      font-size: 18rpx;
      line-height: 22rpx;
      margin-top: 11.5rpx;
    }

    .login-form {
      margin-top: 20rpx;
      ::v-deep .uv-form-item__body__left__content__label {
        font-size: 12rpx;
        line-height: 22rpx;
      }

      .login-remember-pwd {
        display: flex;
        justify-content: flex-end;
        margin-top: 18rpx;
        
      }
    }

    .login-btn {
      margin-top: 40rpx;
      ::v-deep .uv-button__text {
        font-size: 12rpx!important;
      }
    }
    .from-footer {
      height: 32rpx;
      margin-top: 75rpx;
      display: flex;
      justify-content: center;

      .from-footer-login2 {
        height: 32rpx;
        line-height: 30rpx;
        width: 200px;
        border-radius: 16rpx;
        background-color: transparent;
        border: solid 1px #e5e5e5;
        margin: 0 10rpx;

        &::after {
          display: none;
        }
      }
    }
  }

  .login-footer {
    .version {}
  }
}
</style>
