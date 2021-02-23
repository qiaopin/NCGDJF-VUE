<template>
  <el-form :model="form" class="FPForm">
    <el-form-item label="手机号" :label-width="formLabelWidth">
      <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" :label-width="formLabelWidth">
      <el-input
        type="password"
        v-model="form.newPassword"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" :label-width="formLabelWidth">
      <el-input
        type="password"
        v-model="form.ConfirmPassword"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" :label-width="formLabelWidth">
      <el-input
        class="VerificationCode"
        v-model="form.VerificationCode"
        autocomplete="off"
      ></el-input>
      <!-- <el-button :loading="register" type="success" class="register">{{
            send
          }}</el-button> -->

      <el-button
        :loading="register"
        type="success"
        class="register"
        v-show="verShow"
        @click="handleClick()"
        >点击获取验证码</el-button
      >
      <el-button
        :loading="register"
        type="success"
        class="register"
        v-show="!verShow"
        ><span>{{ timer }}</span
        >秒后重新获取</el-button
      >
    </el-form-item>
    <el-form-item class="dialog-footer">
      <el-button
        style="margin: 0 auto"
        type="primary"
        @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </el-form-item>
  </el-form>
  <!-- <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogFormVisible = false"
      >确 定</el-button>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      form: {
        phoneNumber: '',
        newPassword: '',
        ConfirmPassword: '',
      },
      formLabelWidth: '120px',
      forgetformLabelWidth: '60px',
      register: false,
      send: '发送(60s)',
      verShow: true,
      timer: 60,
    }
  },
  methods: {
    handleClick() {
      this.verShow = false
      var auth_timer = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          this.verShow = true
          clearInterval(auth_timer)
        }
      }, 1000)
    },
  },
}
</script>