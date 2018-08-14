<template>
  <div class="mv-forget">

    <div class="mv-forget_container">
      <!-- logo -->
      <img class="logo" src="../../assets/images/logo.png" alt="" width="180" height="74">

      <el-form label-width="70px">
        <el-form-item label="手机">
          <el-input v-model="phone" placeholder="请输入手机号码" style="width: 400px;"><div slot="prefix" class="u-icon-phone"></div></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入验证码" v-model="captcha" style="width: 268px;"><div slot="prefix" class="u-icon-captcha"></div></el-input>
          <el-button style="width: 118px; margin-left: 10px;" :loading="btnLoading" :disabled="btnDisabled" @click="sendCaptcha">{{ btnText }}</el-button>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="8～16位，需包括字母、数字和特殊字符" style="width: 400px;"><div slot="prefix" class="u-icon-pwd" ></div></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="confirmPassword" placeholder="再次输入登录密码" style="width: 400px;"><div slot="prefix" class="u-icon-pwd" ></div></el-input>
        </el-form-item>
      </el-form>

      <el-button type="custom">确认找回</el-button>

      <div style="text-align: center;">
        <a :href="vRouter.login.path"  class="u-btn-text">想起密码 / 立即登录</a>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      btnLoading: false,
      btnDisabled: false,
      btnText: '获取验证码',
      // data
      phone: '',
      captcha: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    sendCaptcha() {
      this.btnLoading = true
      let t = null
      const v = this
      let count = 60
      // 模拟获取验证码
      setTimeout(() => {
        v.btnLoading = false
        v.btnDisabled = true
      }, 500)
      t = setInterval(() => {
        if (count < 2) {
          v.btnText = '获取验证码'
          v.btnDisabled = false
          clearInterval(t)
          return
        }
        count -= 1
        v.btnText = count + 's'
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.mv-forget {
  &_container {
    width: 500px;
    margin: 0 auto;
    padding-bottom: 84px;
    .logo {
      display: block;
      margin: 0 auto;
      margin-top: 90px;
      margin-bottom: 40px;
    }
    .u-icon-phone {
      @include u-icon($w: 16px, $h: 16px, $imgUrl: '../../assets/images/login/icon-phone.png');
    }
    .u-icon-captcha {
      @include u-icon($w: 16px, $h: 16px, $imgUrl: '../../assets/images/login/icon-captcha.png');
    }
    .u-icon-pwd {
      @include u-icon($w: 16px, $h: 16px, $imgUrl: '../../assets/images/login/icon-pwd.png');
    }
    .el-button--custom {
      width: 400px;
      margin: 8px 0 20px 70px;
      color: #FFFFFF;
      background: #4285F4;
    }
    .u-btn-text {
      @include u-login-a;
    }
  }
}
</style>