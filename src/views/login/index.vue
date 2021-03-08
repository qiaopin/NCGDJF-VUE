<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">河北省农村乱占耕地建房专项整治系统平台</h3>
    </div>

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="phone" />
          <!-- <i class="el-icon-phone"></i> -->
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="请输入注册时的手机号"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 20px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >

      <el-button
        :loading="zc"
        type="primary"
        style="width: 100%; margin-bottom: 30px; margin-left: 0"
        @click.native.prevent="registered = true"
        >注册</el-button
      >

      <div class="tips">
        <span
          style="margin-right: 150px; cursor: pointer"
          @click="showDialog = true"
          >手机端下载</span
        >
        <span style="cursor: pointer" @click="forgetPassword = true">
          忘记密码</span
        >
      </div>
    </el-form>

    <el-dialog class="openLay" title="注册" :visible.sync="registered">
      <registered></registered>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        > -->
      </div>
    </el-dialog>

    <el-dialog class="customWidth" title="下载" :visible.sync="showDialog">
      <showDialog></showDialog>
    </el-dialog>

    <el-dialog class="openLay" title="忘记密码" :visible.sync="forgetPassword">
      <forget-password></forget-password>
    </el-dialog>
  </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
import $ from 'jquery'
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64
import ShowDialog from './components/showDialog'
import ForgetPassword from './components/forgetPassword'
import Registered from './components/registered'

export default {
  name: 'Login',
  components: { ShowDialog, ForgetPassword, Registered },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length != 11) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: 'yyq',
        password: '1',
      },

      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      loading: false,
      zc: false,

      passwordType: 'password',
      redirect: undefined,
      showDialog: false,
      forgetPassword: false,
      registered: false,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      let paramt = {
        phone: this.loginForm.phone,
        // password: this.$md5(this.loginForm.password),
        password: Base64.encode(this.loginForm.password),
      }
      let that = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', paramt)
            .then((res) => {
              // sessionStorage.setItem("token", res.date);
              //vuex中的数据刷新页面会消失
              this.$router.push({ path: this.redirect || '/' })
              // this.$router.push({ path: '/slinge' }){
              // that.getUserInfo()
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
            })
        } else {
          console.log('请填写正确的账号密码')
          return false
        }
      })
    },
    getUserInfo() {
      this.$store
        .dispatch('user/getInfo')
        .then((res) => {
          console.log('登录后获取用户信息成功，跳转到首页')
          this.$router.push({ path: this.redirect || '/' })
        })
        .catch((err) => {
          console.log('获取用户信息失败')
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.customWidth {
  width: 75%;
  margin: 0 auto;
}

.openLay {
  width: 900px;
  margin: 0 auto;

  .FPForm {
    // margin: 20px 50px;

    .el-form-item {
      background-color: rgba(255, 255, 255, 0);
      // color: #999;

      .el-input {
        border: 1px solid #dcdfe6;
        border-radius: 4px;

        input {
          color: #999;
          caret-color: #999;
        }
      }

      .VerificationCode {
        width: 40%;
      }

      .register {
        margin-left: 20px;
        height: 45px;
      }
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url(../../assets/bgc-1.jpg) no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  color: #fff;

  .login-form {
    position: absolute;
    top: 150px;
    right: 260px;
    width: 400px;
    height: 400px;
    max-width: 100%;
    background: url(../../assets/login-box.png) no-repeat;
    background-size: 100%;
    padding: 60px 60px 0;
    margin: 0 auto;
    overflow: hidden;

    .svg-container {
      color: #fff;
    }

    .el-form-item {
      margin-bottom: 15px;

      .show-pwd {
        color: #fff;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    // position: relative;

    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(40, 66, 151, 0.3);
      color: #fff;
      font-size: 26px;
      letter-spacing: 10px;
      font-weight: 500;
      margin: 0;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.alertD {
  text-align: center;
  line-height: 40px;
  font-size: 16px;

  texr-a .content {
    position: absolute;
    background-color: #fff;
    top: 30%;
    left: 30%;
    color: #000;
    padding: 50px;
    z-index: 99;
    line-height: 30px;
    border-radius: 8px;

    .el-icon-close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 25px;
    }
  }
}
</style>
